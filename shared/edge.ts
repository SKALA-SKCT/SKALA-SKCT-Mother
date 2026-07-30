// Pages Functions 공용 헬퍼: JSON 응답, 세션 쿠키 발급, 오픈리다이렉트 방지, 레거시 검증.
import {
  normalizeNick,
  sessionCookie,
  signSession,
  verifyPassword,
  type CookieOpts,
  type SessionClaims,
} from './auth';

export function json(o: unknown, status = 200, extra: Record<string, string> = {}): Response {
  return new Response(JSON.stringify(o), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', ...extra },
  });
}

export function cookieOptsFrom(env: any, request: Request): CookieOpts {
  return {
    domain: env.SESSION_COOKIE_DOMAIN || undefined,
    secure: new URL(request.url).protocol === 'https:',
  };
}

export async function issueSessionCookie(claims: SessionClaims, env: any, request: Request): Promise<string> {
  const token = await signSession(claims, env.SESSION_SECRET);
  return sessionCookie(token, cookieOptsFrom(env, request));
}

// 오픈 리다이렉트 방지: 상대경로거나, 호스트가 공유 쿠키 도메인 하위일 때만 허용.
export function safeRedirect(to: string | null, env: any, origin: string): string {
  if (!to) return origin + '/';
  if (to.startsWith('/')) return origin + to;
  try {
    const u = new URL(to);
    const dom = String(env.SESSION_COOKIE_DOMAIN || '').replace(/^\./, '');
    if (dom && (u.hostname === dom || u.hostname.endsWith('.' + dom))) return u.toString();
    const allowed = [
      env.MOCK_URL,
      env.VITE_MOCK_URL,
      env.PRACTICE_URL,
      env.VITE_PRACTICE_URL,
      'https://www.mock.skala-skct.com',
      'https://mock.skala-skct.com',
      'https://skala-skct.vercel.app',
    ].filter(Boolean);
    if (allowed.some((value) => new URL(String(value)).origin === u.origin)) return u.toString();
  } catch {
    /* ignore */
  }
  return origin + '/';
}

export interface LegacyResult {
  skctUserId?: number;
  skalaHandle?: string;
  nick: string;
  isAdmin: boolean;
}

// 기존 skct(모의고사) 계정 검증 → Vercel의 legacy-verify에 위임(bcrypt는 Node에서).
export async function verifySkctLegacy(nickname: string, password: string, env: any): Promise<LegacyResult | null> {
  const url = env.SKCT_LEGACY_VERIFY_URL;
  const secret = env.SKCT_LEGACY_VERIFY_SECRET;
  if (!url || !secret) return null;
  try {
    const r = await fetch(url, {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-legacy-secret': secret },
      body: JSON.stringify({ nickname, password }),
    });
    if (!r.ok) return null;
    const d: any = await r.json();
    if (!d?.ok) return null;
    return { skctUserId: Number(d.skctUserId), nick: String(d.nick ?? nickname), isAdmin: !!d.isAdmin };
  } catch {
    return null;
  }
}

// 기존 skala(연습앱) 계정 검증 → 연습앱 KV(usr:*)에서 PBKDF2 대조.
export async function verifySkalaLegacy(nickname: string, password: string, env: any): Promise<LegacyResult | null> {
  const kv = env.SKCT_KV;
  if (!kv) return null;
  const rec: any = await kv.get('usr:' + normalizeNick(nickname), 'json');
  if (!rec) return null;
  if (!(await verifyPassword(password, rec.pw))) return null;
  const isAdmin = !!env.SKALA_ADMIN_NICK && rec.nickname === env.SKALA_ADMIN_NICK;
  return { skalaHandle: rec.nickname, nick: rec.nickname, isAdmin };
}
