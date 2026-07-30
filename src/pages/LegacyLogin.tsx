import { useState, type FormEvent } from 'react';
import { Link, Navigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../auth';
import { goAfterLogin, isAbsolute } from '../nav';

const SERVICES = [
  { key: 'auto', label: '자동' },
  { key: 'skct', label: '모의고사' },
  { key: 'skala', label: '연습앱' },
] as const;

export default function LegacyLogin() {
  const { user, loading, legacyLogin } = useAuth();
  const [sp] = useSearchParams();
  const redirect = sp.get('redirect') || '/';

  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [service, setService] = useState<'auto' | 'skct' | 'skala'>('auto');
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);

  if (!loading && user) {
    if (isAbsolute(redirect)) {
      window.location.replace(redirect);
      return null;
    }
    return <Navigate to={redirect} replace />;
  }

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setErr('');
    setBusy(true);
    try {
      await legacyLogin(nickname.trim(), password, service);
      goAfterLogin(redirect);
    } catch (ex) {
      setErr(ex instanceof Error ? ex.message : String(ex));
    } finally {
      setBusy(false);
    }
  };

  const canSubmit = nickname.trim() && password;

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center p-6">
      <form
        className="flex w-full max-w-[380px] flex-col gap-3 rounded-[10px] border border-border bg-surface p-7 shadow-soft"
        onSubmit={submit}
      >
        <h1 className="m-0 text-[1.35rem] font-bold">기존 계정 로그인</h1>
        <p className="text-muted">기존 아이디·비밀번호로 로그인합니다. (신규 가입은 카카오)</p>

        <div>
          <div className="mb-1 text-[0.85rem] text-muted">어느 서비스 계정인가요?</div>
          <div className="flex items-center gap-2">
            {SERVICES.map((s) => (
              <label key={s.key} className="flex items-center gap-1">
                <input
                  type="radio"
                  name="service"
                  checked={service === s.key}
                  onChange={() => setService(s.key)}
                />
                <span>{s.label}</span>
              </label>
            ))}
          </div>
        </div>

        <input
          className="w-full rounded-lg border border-border bg-surface2 px-3 py-[11px] text-[0.98rem] text-text outline-primary"
          placeholder="아이디(닉네임)"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          autoFocus
          autoComplete="username"
          maxLength={40}
        />
        <input
          className="w-full rounded-lg border border-border bg-surface2 px-3 py-[11px] text-[0.98rem] text-text outline-primary"
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />
        {err && <div className="text-[0.88rem] text-danger">{err}</div>}
        <button
          className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-transparent bg-primary px-3.5 py-2.5 text-base font-semibold text-white hover:brightness-[0.98] disabled:cursor-not-allowed disabled:opacity-55"
          disabled={busy || !canSubmit}
          type="submit"
        >
          {busy ? '로그인 중…' : '로그인'}
        </button>
        <Link className="text-center text-primary no-underline" to="/login">
          ← 카카오 로그인으로
        </Link>
      </form>
    </div>
  );
}
