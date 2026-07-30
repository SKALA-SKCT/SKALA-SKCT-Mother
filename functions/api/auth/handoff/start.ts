import { signSession, type SessionClaims } from '../../../../shared/auth';
import { safeRedirect } from '../../../../shared/edge';

export async function onRequestGet(context: any): Promise<Response> {
  const { request, env } = context;
  const claims: SessionClaims | null = context.data?.claims ?? null;
  if (!claims) {
    const origin = new URL(request.url).origin;
    return Response.redirect(`${origin}/login`, 302);
  }

  const url = new URL(request.url);
  const origin = url.origin;
  const redirectTo = safeRedirect(url.searchParams.get('redirect'), env, origin);
  const token = await signSession(claims, env.SESSION_SECRET, 120);
  const dest = new URL(redirectTo);
  dest.searchParams.set('sso', token);

  return Response.redirect(dest.toString(), 302);
}
