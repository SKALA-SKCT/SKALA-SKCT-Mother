import { useState, type FormEvent } from 'react';

// 카카오 계정에 기존(레거시) skct/skala 계정을 1회 검증 후 연결하는 폼.
// 설정(Settings)과 가입 직후 통합 마법사(LinkWizard)에서 공용으로 쓴다.
export default function LinkForm({
  service,
  label,
  title,
  body,
  done,
  disabled = false,
  onDone,
}: {
  service: 'skct' | 'skala';
  label?: string;
  title: string;
  body?: string;
  done: boolean;
  disabled?: boolean;
  onDone: () => Promise<void> | void;
}) {
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const [ok, setOk] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setErr('');
    setOk('');
    setBusy(true);
    try {
      const r = await fetch('/api/auth/link', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ service, nickname: nickname.trim(), password }),
      });
      const d = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(d?.error || '연결에 실패했어요.');
      setOk('연결되었습니다.');
      setNickname('');
      setPassword('');
      await onDone();
      window.alert('기존 계정 연결이 완료되었습니다.');
    } catch (ex) {
      const message = ex instanceof Error ? ex.message : String(ex);
      setErr(message);
      window.alert(message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <form className={`welcome-panel${done ? ' is-connected' : ''}`} onSubmit={submit}>
      <div className="welcome-panel-top">
        <span>{label ?? (service === 'skct' ? '실전 모의고사' : '모의고사 문제 연습')}</span>
        <small>{done ? '연결 완료' : '미연결'}</small>
      </div>
      <h2>{title}</h2>
      <p>{body ?? (service === 'skct' ? '기존 도메인 : skala-skct.vercel.app/' : '기존 도메인 : skala-skct.pages.dev/')}</p>
      <div className="welcome-fields">
        <input
          placeholder="기존 아이디"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          autoComplete="off"
          disabled={done || disabled || busy}
        />
        <input
          type="password"
          placeholder="기존 비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="off"
          disabled={done || disabled || busy}
        />
      </div>
      {err && <div className="auth-err">{err}</div>}
      {ok && <div className="auth-ok">{ok}</div>}
      <button
        className={`btn block welcome-connect${busy ? ' is-loading' : ''}`}
        disabled={done || disabled || busy || !nickname.trim() || !password}
        type="submit"
      >
        {busy ? <span className="welcome-loading" aria-label="연결 중" /> : done ? '연결 완료' : '연결하기'}
      </button>
    </form>
  );
}
