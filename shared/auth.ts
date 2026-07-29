// 마더(관문) 인증 핵심 헬퍼(순수, 엣지/Node 공용). Web Crypto(crypto.subtle)만 사용.
// - 공유 세션 = HS256 JWT (마더가 서명, skct/skala가 검증). 의존성 없음.
// - 레거시 skala 비번 검증용 PBKDF2(연습앱 shared/auth.ts와 동일 파라미터).

const enc = new TextEncoder();
const dec = new TextDecoder();

// Web Crypto 인자 캐스팅(TS 5.7+의 Uint8Array<ArrayBufferLike> 제네릭 이슈 회피, 런타임 무해).
const bs = (b: Uint8Array): BufferSource => b as unknown as BufferSource;

/* ── base64url ─────────────────────────────────────────────── */
function bytesToB64url(bytes: Uint8Array): string {
  let bin = '';
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}
function b64urlToBytes(s: string): Uint8Array {
  let t = s.replace(/-/g, '+').replace(/_/g, '/');
  const pad = t.length % 4 ? 4 - (t.length % 4) : 0;
  t += '='.repeat(pad);
  const bin = atob(t);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}
const strToB64url = (s: string) => bytesToB64url(enc.encode(s));
const b64urlToStr = (s: string) => dec.decode(b64urlToBytes(s));

/* ── 공유 세션 JWT (HS256) ─────────────────────────────────── */
export const SESSION_COOKIE_NAME = 'skct_session';
const DEFAULT_MAX_AGE = 60 * 60 * 24 * 30; // 30일

export interface SessionClaims {
  // 통합 식별자: `kakao:<id>` | `skct:<userId>` | `skala:<nick>`
  sub: string;
  nick: string;
  skctUserId?: number; // 연결된 skct(Postgres) users.id
  skalaHandle?: string; // 연결된 skala(KV) 닉네임(핸들)
  admin?: boolean;
  iat?: number;
  exp?: number;
}

async function hmacKey(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey('raw', bs(enc.encode(secret)), { name: 'HMAC', hash: 'SHA-256' }, false, [
    'sign',
    'verify',
  ]);
}

export async function signSession(
  claims: SessionClaims,
  secret: string,
  maxAgeSec: number = DEFAULT_MAX_AGE,
): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const payload: SessionClaims = { ...claims, iat: now, exp: now + maxAgeSec };
  const signingInput =
    strToB64url(JSON.stringify({ alg: 'HS256', typ: 'JWT' })) + '.' + strToB64url(JSON.stringify(payload));
  const sig = new Uint8Array(await crypto.subtle.sign('HMAC', await hmacKey(secret), bs(enc.encode(signingInput))));
  return signingInput + '.' + bytesToB64url(sig);
}

export async function verifySession(token: string | null, secret: string): Promise<SessionClaims | null> {
  if (!token) return null;
  const parts = token.split('.');
  if (parts.length !== 3) return null;
  const [h, p, s] = parts;
  // 헤더 alg 고정 확인(alg confusion 방지)
  try {
    const hdr = JSON.parse(b64urlToStr(h));
    if (hdr?.alg !== 'HS256') return null;
  } catch {
    return null;
  }
  let ok = false;
  try {
    ok = await crypto.subtle.verify('HMAC', await hmacKey(secret), bs(b64urlToBytes(s)), bs(enc.encode(h + '.' + p)));
  } catch {
    return null;
  }
  if (!ok) return null;
  let payload: SessionClaims;
  try {
    payload = JSON.parse(b64urlToStr(p));
  } catch {
    return null;
  }
  if (typeof payload.exp === 'number' && payload.exp < Math.floor(Date.now() / 1000)) return null;
  return payload;
}

/* ── 쿠키 헬퍼 (Domain 스코프로 서브도메인 공유) ───────────── */
export interface CookieOpts {
  domain?: string; // 예: ".example.com" / 로컬 ".skct.local"
  secure?: boolean; // https 여부
  maxAge?: number;
}
export function sessionCookie(token: string, opts: CookieOpts = {}): string {
  const domain = opts.domain ? ` Domain=${opts.domain};` : '';
  const secure = opts.secure ? ' Secure;' : '';
  const maxAge = opts.maxAge ?? DEFAULT_MAX_AGE;
  return `${SESSION_COOKIE_NAME}=${token}; Path=/;${domain} HttpOnly;${secure} SameSite=Lax; Max-Age=${maxAge}`;
}
export function clearSessionCookie(opts: CookieOpts = {}): string {
  const domain = opts.domain ? ` Domain=${opts.domain};` : '';
  const secure = opts.secure ? ' Secure;' : '';
  return `${SESSION_COOKIE_NAME}=; Path=/;${domain} HttpOnly;${secure} SameSite=Lax; Max-Age=0`;
}
export function readCookie(cookieHeader: string | null, name: string): string | null {
  if (!cookieHeader) return null;
  for (const part of cookieHeader.split(';')) {
    const i = part.indexOf('=');
    if (i !== -1 && part.slice(0, i).trim() === name) return part.slice(i + 1).trim();
  }
  return null;
}
export const readSessionToken = (cookieHeader: string | null) => readCookie(cookieHeader, SESSION_COOKIE_NAME);

/* ── 랜덤 토큰 (OAuth state 등) ────────────────────────────── */
function toHex(buf: ArrayBufferLike): string {
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('');
}
export function randomToken(bytes = 24): string {
  return toHex(crypto.getRandomValues(new Uint8Array(bytes)).buffer);
}

/* ── 레거시 skala 비번 검증(PBKDF2-SHA256) ─────────────────── */
// 연습앱 shared/auth.ts 와 동일 파라미터여야 기존 해시를 검증할 수 있다.
function fromHex(hex: string): Uint8Array {
  const a = new Uint8Array(hex.length / 2);
  for (let i = 0; i < a.length; i++) a[i] = parseInt(hex.slice(i * 2, i * 2 + 2), 16);
  return a;
}
async function pbkdf2(password: string, salt: Uint8Array, iter: number): Promise<string> {
  const key = await crypto.subtle.importKey('raw', bs(enc.encode(password)), 'PBKDF2', false, ['deriveBits']);
  const bits = await crypto.subtle.deriveBits(
    { name: 'PBKDF2', salt: bs(salt), iterations: iter, hash: 'SHA-256' },
    key,
    256,
  );
  return toHex(bits);
}
export interface PwRecord {
  salt: string;
  hash: string;
  iter: number;
}
export async function verifyPassword(password: string, rec: PwRecord | undefined | null): Promise<boolean> {
  if (!rec?.salt || !rec?.hash || !rec?.iter) return false;
  const hash = await pbkdf2(password, fromHex(rec.salt), rec.iter);
  if (hash.length !== rec.hash.length) return false;
  let diff = 0;
  for (let i = 0; i < hash.length; i++) diff |= hash.charCodeAt(i) ^ rec.hash.charCodeAt(i);
  return diff === 0;
}

export function normalizeNick(n: string): string {
  return n.trim().toLowerCase();
}
