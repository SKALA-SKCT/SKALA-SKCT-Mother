// 카카오 로그인 시작: state(CSRF) + 로그인 후 돌아갈 곳을 쿠키에 심고 카카오 authorize로 리다이렉트.
import { randomToken } from '../../../../shared/auth';

export async function onRequestGet(context: any): Promise<Response> {
  const { request, env } = context;
  const clientId = env.KAKAO_CLIENT_ID;
  const redirectUri = env.KAKAO_REDIRECT_URI;
  if (!clientId || !redirectUri) {
    return new Response('카카오 설정(KAKAO_CLIENT_ID / KAKAO_REDIRECT_URI)이 없습니다.', { status: 500 });
  }

  const url = new URL(request.url);
  const redirectTo = url.searchParams.get('redirect') || '/';
  const state = randomToken(16);

  const authorize = new URL('https://kauth.kakao.com/oauth/authorize');
  authorize.searchParams.set('client_id', clientId);
  authorize.searchParams.set('redirect_uri', redirectUri);
  authorize.searchParams.set('response_type', 'code');
  authorize.searchParams.set('state', state);
  authorize.searchParams.set('scope', 'profile_nickname');

  const secure = url.protocol === 'https:' ? ' Secure;' : '';
  const base = `Path=/; HttpOnly;${secure} SameSite=Lax; Max-Age=600`;
  const headers = new Headers();
  headers.append('set-cookie', `kakao_state=${state}; ${base}`);
  headers.append('set-cookie', `kakao_redirect=${encodeURIComponent(redirectTo)}; ${base}`);
  headers.set('location', authorize.toString());
  return new Response(null, { status: 302, headers });
}
