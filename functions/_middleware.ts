// 인증 게이트. /api/* 중 로그인 필수 엔드포인트(me·link)를 보호하고,
// 세션 쿠키에서 클레임을 도출해 context.data.claims로 전달한다.
// OAuth·레거시 로그인·로그아웃은 미인증 접근 허용. 정적 자산/SPA는 통과.
import { readSessionToken, verifySession } from '../shared/auth';

function json401(): Response {
  return new Response(JSON.stringify({ error: '로그인이 필요합니다.' }), {
    status: 401,
    headers: { 'content-type': 'application/json; charset=utf-8' },
  });
}

// 미인증 허용(로그인 전에 호출되는) 경로.
const OPEN = ['/api/auth/kakao/', '/api/auth/legacy-login', '/api/auth/logout'];

export async function onRequest(context: any): Promise<Response> {
  const { request, env, next } = context;
  const url = new URL(request.url);

  if (url.pathname.startsWith('/api/')) {
    const claims = env.SESSION_SECRET
      ? await verifySession(readSessionToken(request.headers.get('Cookie')), env.SESSION_SECRET)
      : null;
    context.data.claims = claims;

    const open = OPEN.some((p) => url.pathname === p || url.pathname.startsWith(p));
    if (!open && !claims) return json401();
  }

  return next();
}
