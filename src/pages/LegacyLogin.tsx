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
    <div className="page">
      <form className="auth-box" onSubmit={submit}>
        <h1>기존 계정 로그인</h1>
        <p className="muted">기존 아이디·비밀번호로 로그인합니다. (신규 가입은 카카오)</p>

        <div>
          <div className="field-label">어느 서비스 계정인가요?</div>
          <div className="row">
            {SERVICES.map((s) => (
              <label key={s.key} className="row" style={{ gap: 4 }}>
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
          placeholder="아이디(닉네임)"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          autoFocus
          autoComplete="username"
          maxLength={40}
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />
        {err && <div className="auth-err">{err}</div>}
        <button className="btn primary block" disabled={busy || !canSubmit} type="submit">
          {busy ? '로그인 중…' : '로그인'}
        </button>
        <Link className="linklike center" to="/login">
          ← 카카오 로그인으로
        </Link>
      </form>
    </div>
  );
}
