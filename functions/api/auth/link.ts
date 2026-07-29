// 설정: 현재(카카오) 계정에 기존 skct/skala 계정을 1회 검증 후 연결.
// → 계정 레코드에 skctUserId/skalaHandle 부착하고 세션을 재발급(클레임 갱신).
import { sessionCookie, signSession, type SessionClaims } from '../../../shared/auth';
import { cookieOptsFrom, json, verifySkalaLegacy, verifySkctLegacy } from '../../../shared/edge';

export async function onRequestPost(context: any): Promise<Response> {
  const { request, env } = context;
  const claims: SessionClaims | null = context.data?.claims ?? null;
  if (!claims) return json({ error: '로그인이 필요합니다.' }, 401);
  if (!claims.sub.startsWith('kakao:') || !env.AUTH_KV) {
    return json({ error: '카카오로 로그인한 계정에서만 기존 계정을 연결할 수 있어요.' }, 400);
  }

  const b: any = await request.json().catch(() => ({}));
  const nickname = String(b?.nickname ?? '').trim();
  const password = String(b?.password ?? '');
  const service = String(b?.service ?? '');
  if (!nickname || !password || (service !== 'skct' && service !== 'skala')) {
    return json({ error: '입력을 확인해주세요.' }, 400);
  }

  const patch: Partial<SessionClaims> = {};
  if (service === 'skct') {
    const r = await verifySkctLegacy(nickname, password, env);
    if (!r) return json({ error: '기존 모의고사 계정 인증에 실패했어요.' }, 401);
    patch.skctUserId = r.skctUserId;
  } else {
    const r = await verifySkalaLegacy(nickname, password, env);
    if (!r) return json({ error: '기존 연습앱 계정 인증에 실패했어요.' }, 401);
    patch.skalaHandle = r.skalaHandle;
  }

  // 계정 레코드 갱신
  const key = 'acct:kakao:' + claims.sub.slice('kakao:'.length);
  const acct: any = (await env.AUTH_KV.get(key, 'json')) || {
    unifiedId: claims.sub,
    nick: claims.nick,
    kakaoId: claims.sub.slice('kakao:'.length),
  };
  Object.assign(acct, patch);
  await env.AUTH_KV.put(key, JSON.stringify(acct));

  // 새 클레임으로 세션 재발급(iat/exp는 sign에서 재설정)
  const next: SessionClaims = {
    sub: claims.sub,
    nick: claims.nick,
    skctUserId: acct.skctUserId,
    skalaHandle: acct.skalaHandle,
    admin: claims.admin,
  };
  const token = await signSession(next, env.SESSION_SECRET);
  return json({ ok: true, skctUserId: acct.skctUserId, skalaHandle: acct.skalaHandle }, 200, {
    'set-cookie': sessionCookie(token, cookieOptsFrom(env, request)),
  });
}
