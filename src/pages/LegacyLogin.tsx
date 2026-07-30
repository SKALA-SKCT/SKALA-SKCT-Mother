import { useState, type FormEvent } from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../auth';
import AuthShell from '../components/AuthShell';
import { goAfterLogin, isAbsolute } from '../nav';
import {
  AUTH_BOX,
  AUTH_ERR,
  AUTH_INPUT,
  BTN_BLOCK,
  BTN_PRIMARY,
  FIELD,
  FIELD_LABEL,
  SEGMENT,
  SEGMENT_INPUT,
  SEGMENTED,
} from '../authStyles';

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
    <AuthShell
      title="기존 계정 로그인"
      lede="기존 아이디와 비밀번호로 로그인합니다. 신규 가입은 카카오로 진행해 주세요."
      backTo="/login"
      backLabel="카카오 로그인으로"
    >
      <form className={AUTH_BOX} onSubmit={submit}>
        <div className={FIELD}>
          <div className={FIELD_LABEL}>서비스 계정</div>
          <div className={SEGMENTED}>
            {SERVICES.map((s) => (
              <label key={s.key} className={SEGMENT}>
                <input
                  className={SEGMENT_INPUT}
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

        <label className={FIELD}>
          <span className={FIELD_LABEL}>아이디</span>
          <input
            className={AUTH_INPUT}
            placeholder="아이디를 입력하세요"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            autoFocus
            autoComplete="username"
            maxLength={40}
          />
        </label>
        <label className={FIELD}>
          <span className={FIELD_LABEL}>비밀번호</span>
          <input
            className={AUTH_INPUT}
            type="password"
            placeholder="비밀번호를 입력하세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
        </label>
        {err && <div className={AUTH_ERR}>{err}</div>}
        <button
          className={`${BTN_PRIMARY} ${BTN_BLOCK}`}
          disabled={busy || !canSubmit}
          type="submit"
        >
          {busy ? '로그인 중…' : '로그인'}
        </button>
      </form>
    </AuthShell>
  );
}
