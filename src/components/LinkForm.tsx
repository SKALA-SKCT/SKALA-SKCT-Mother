import { useState, type FormEvent } from 'react';

// 카카오 계정에 기존(레거시) skct/skala 계정을 1회 검증 후 연결하는 폼.
// 설정(Settings)과 가입 직후 통합 마법사(LinkWizard)에서 공용으로 쓴다.
export default function LinkForm({
  service,
  title,
  done,
  onDone,
}: {
  service: 'skct' | 'skala';
  title: string;
  done: boolean;
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
    } catch (ex) {
      setErr(ex instanceof Error ? ex.message : String(ex));
    } finally {
      setBusy(false);
    }
  };

  return (
    <form className="auth-box" style={{ maxWidth: 'none', marginTop: 12 }} onSubmit={submit}>
      <div className="row" style={{ justifyContent: 'space-between' }}>
        <strong>{title}</strong>
        {done && <span className="auth-ok">연결됨</span>}
      </div>
      <input
        placeholder="기존 아이디"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        autoComplete="off"
      />
      <input
        type="password"
        placeholder="기존 비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoComplete="off"
      />
      {err && <div className="auth-err">{err}</div>}
      {ok && <div className="auth-ok">{ok}</div>}
      <button className="btn primary" disabled={busy || !nickname.trim() || !password} type="submit">
        {busy ? '연결 중…' : '가져와서 연결'}
      </button>
    </form>
  );
}
