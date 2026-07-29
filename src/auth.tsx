import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

export interface Me {
  sub: string;
  nick: string;
  skctUserId: number | null;
  skalaHandle: string | null;
  admin: boolean;
  isKakao: boolean;
}

interface AuthCtx {
  user: Me | null;
  loading: boolean;
  refresh: () => Promise<void>;
  legacyLogin: (nickname: string, password: string, service: 'auto' | 'skct' | 'skala') => Promise<void>;
  logout: () => Promise<void>;
}

const Ctx = createContext<AuthCtx | null>(null);

export function useAuth(): AuthCtx {
  const c = useContext(Ctx);
  if (!c) throw new Error('useAuth must be used within AuthProvider');
  return c;
}

async function postJson(url: string, body: unknown): Promise<any> {
  const r = await fetch(url, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
  });
  const text = await r.text();
  let data: any = {};
  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    /* non-JSON */
  }
  if (!r.ok) throw new Error(data?.error || `요청 실패 (${r.status})`);
  return data;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Me | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    try {
      const r = await fetch('/api/auth/me');
      setUser(r.ok ? await r.json() : null);
    } catch {
      setUser(null);
    }
  };

  useEffect(() => {
    refresh().finally(() => setLoading(false));
  }, []);

  const legacyLogin = async (nickname: string, password: string, service: 'auto' | 'skct' | 'skala') => {
    await postJson('/api/auth/legacy-login', { nickname, password, service });
    await refresh();
  };

  const logout = async () => {
    try {
      await postJson('/api/auth/logout', {});
    } catch {
      /* 무시 */
    }
    setUser(null);
  };

  return <Ctx.Provider value={{ user, loading, refresh, legacyLogin, logout }}>{children}</Ctx.Provider>;
}
