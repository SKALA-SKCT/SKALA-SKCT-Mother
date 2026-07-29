// 기존(레거시) 계정 로그인. skct=Vercel 위임(bcrypt), skala=KV PBKDF2. 카카오 아님.
import { sessionCookie, signSession, type SessionClaims } from '../../../shared/auth';
import { cookieOptsFrom, json, verifySkalaLegacy, verifySkctLegacy } from '../../../shared/edge';

export async function onRequestPost(context: any): Promise<Response> {
  const { request, env } = context;
  if (!env.SESSION_SECRET) return json({ error: '서버 세션 설정이 없습니다.' }, 500);

  const b: any = await request.json().catch(() => ({}));
  const nickname = String(b?.nickname ?? '').trim();
  const password = String(b?.password ?? '');
  const service = String(b?.service ?? 'auto'); // 'skct' | 'skala' | 'auto'
  if (!nickname || !password) return json({ error: '아이디와 비밀번호를 입력해주세요.' }, 400);

  let claims: SessionClaims | null = null;

  if (service === 'skct' || service === 'auto') {
    const r = await verifySkctLegacy(nickname, password, env);
    if (r) claims = { sub: 'skct:' + r.skctUserId, nick: r.nick, skctUserId: r.skctUserId, admin: r.isAdmin };
  }
  if (!claims && (service === 'skala' || service === 'auto')) {
    const r = await verifySkalaLegacy(nickname, password, env);
    if (r) claims = { sub: 'skala:' + r.skalaHandle, nick: r.nick, skalaHandle: r.skalaHandle, admin: r.isAdmin };
  }

  if (!claims) return json({ error: '아이디 또는 비밀번호가 올바르지 않습니다.' }, 401);

  const token = await signSession(claims, env.SESSION_SECRET);
  return json({ ok: true, nick: claims.nick }, 200, {
    'set-cookie': sessionCookie(token, cookieOptsFrom(env, request)),
  });
}
