// 카카오 콜백: state 검증 → 토큰 교환 → 프로필 조회 → AUTH_KV 계정 find-or-create → 공유 JWT 발급.
import { readCookie, sessionCookie, signSession, type SessionClaims } from '../../../../shared/auth';
import { cookieOptsFrom, safeRedirect } from '../../../../shared/edge';

function fail(origin: string, msg: string): Response {
  return Response.redirect(`${origin}/login?e=${encodeURIComponent(msg)}`, 302);
}

export async function onRequestGet(context: any): Promise<Response> {
  const { request, env } = context;
  const url = new URL(request.url);
  const origin = url.origin;

  if (!env.SESSION_SECRET) return new Response('서버 세션 설정(SESSION_SECRET) 누락', { status: 500 });

  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  const cookieHeader = request.headers.get('Cookie');
  const savedState = readCookie(cookieHeader, 'kakao_state');
  const redirectTo = decodeURIComponent(readCookie(cookieHeader, 'kakao_redirect') || '/');

  if (!code || !state || !savedState || state !== savedState) {
    return fail(origin, '로그인 검증에 실패했어요. 다시 시도해주세요.');
  }

  // 1) code → access_token
  const body = new URLSearchParams({
    grant_type: 'authorization_code',
    client_id: env.KAKAO_CLIENT_ID,
    redirect_uri: env.KAKAO_REDIRECT_URI,
    code,
  });
  if (env.KAKAO_CLIENT_SECRET) body.set('client_secret', env.KAKAO_CLIENT_SECRET);

  const tokenRes = await fetch('https://kauth.kakao.com/oauth/token', {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded;charset=utf-8' },
    body,
  });
  if (!tokenRes.ok) return fail(origin, '카카오 토큰 교환에 실패했어요.');
  const tok: any = await tokenRes.json();

  // 2) access_token → 프로필
  const meRes = await fetch('https://kapi.kakao.com/v2/user/me', {
    headers: { Authorization: `Bearer ${tok.access_token}` },
  });
  if (!meRes.ok) return fail(origin, '카카오 사용자 조회에 실패했어요.');
  const me: any = await meRes.json();

  const kakaoId = String(me.id);
  const nickname =
    me?.kakao_account?.profile?.nickname || me?.properties?.nickname || `kakao_${kakaoId.slice(-6)}`;

  // 3) AUTH_KV 계정 find-or-create
  const kv = env.AUTH_KV;
  const key = 'acct:kakao:' + kakaoId;
  let acct: any = kv ? await kv.get(key, 'json') : null;
  const isNew = !acct; // 첫 카카오 가입 → 통합 마법사로 유도
  if (!acct) {
    acct = { unifiedId: 'kakao:' + kakaoId, kakaoId, nick: nickname, createdAt: new Date().toISOString() };
    if (kv) await kv.put(key, JSON.stringify(acct));
  }

  const claims: SessionClaims = {
    sub: acct.unifiedId,
    nick: acct.nick,
    skctUserId: acct.skctUserId,
    skalaHandle: acct.skalaHandle,
    admin: acct.isAdmin,
  };
  const token = await signSession(claims, env.SESSION_SECRET);

  const headers = new Headers();
  headers.append('set-cookie', sessionCookie(token, cookieOptsFrom(env, request)));
  headers.append('set-cookie', 'kakao_state=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0');
  headers.append('set-cookie', 'kakao_redirect=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0');
  // 신규 가입이면 기존 계정 통합 마법사(/welcome)를 먼저 거친 뒤 원래 목적지로.
  const dest = safeRedirect(redirectTo, env, origin);
  headers.set('location', isNew ? `${origin}/welcome?next=${encodeURIComponent(dest)}` : dest);
  return new Response(null, { status: 302, headers });
}
