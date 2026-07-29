// 현재 로그인 유저. _middleware가 context.data.claims를 세팅한다(없으면 401 처리됨).
import { json } from '../../../shared/edge';
import type { SessionClaims } from '../../../shared/auth';

export async function onRequestGet(context: any): Promise<Response> {
  const claims: SessionClaims | null = context.data?.claims ?? null;
  if (!claims) return json({ error: 'unauthorized' }, 401);
  return json({
    sub: claims.sub,
    nick: claims.nick,
    skctUserId: claims.skctUserId ?? null,
    skalaHandle: claims.skalaHandle ?? null,
    admin: !!claims.admin,
    isKakao: claims.sub.startsWith('kakao:'),
  });
}
