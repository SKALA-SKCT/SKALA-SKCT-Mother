// 로그아웃: 공유 세션 쿠키(Domain 스코프)를 클리어. 세 서브도메인 모두 무효화됨.
import { clearSessionCookie } from '../../../shared/auth';
import { cookieOptsFrom, json } from '../../../shared/edge';

export async function onRequestPost(context: any): Promise<Response> {
  const { request, env } = context;
  return json({ ok: true }, 200, { 'set-cookie': clearSessionCookie(cookieOptsFrom(env, request)) });
}
