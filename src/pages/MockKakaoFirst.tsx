import { useState } from 'react';
import DesktopOnly from '../landing/DesktopOnly';
import BrandMark from '../components/BrandMark';

const previewUser = {
  nick: '카카오 테스트',
};

export default function MockKakaoFirst() {
  const [mockState, setMockState] = useState({
    skct: { connected: false },
    practice: { connected: false },
  });
  const [noAccount, setNoAccount] = useState(false);
  const canStart = noAccount || mockState.skct.connected || mockState.practice.connected;

  return (
    <>
      <main className="welcome-preview-shell">
        <section className="welcome-preview-card" aria-label="카카오 첫 로그인 후 기존 계정 연결 목업">
          <div className="welcome-preview-head">
            <BrandMark height={26} />
            <span className="welcome-preview-badge">첫 카카오 로그인</span>
          </div>

          <div className="welcome-preview-copy">
            <p className="welcome-preview-kicker">환영합니다, {previewUser.nick}님</p>
            <h1>기존 학습 기록을 이어서 사용할까요?</h1>
            <div className="welcome-preview-copy-row">
              <p>기존 서비스 계정이 있다면 처음 한 번만 인증해 연결해주세요!</p>
              <label className="welcome-preview-check">
                <input
                  type="checkbox"
                  checked={noAccount}
                  onChange={(event) => {
                    setNoAccount(event.target.checked);
                    if (event.target.checked)
                      setMockState({ skct: { connected: false }, practice: { connected: false } });
                  }}
                />
                <span>기존 계정이 없어요</span>
              </label>
            </div>
          </div>

          <div className="welcome-preview-grid">
            <PreviewLinkPanel
              label="실전 모의고사"
              title="실전 모의고사 기존 계정 연결"
              body="기존 도메인 : skala-skct.vercel.app/"
              connected={mockState.skct.connected}
              noAccount={noAccount}
              onConnect={() =>
                setMockState((current) => ({ ...current, skct: { connected: true } }))
              }
            />
            <PreviewLinkPanel
              label="모의고사 문제 연습"
              title="모의고사 문제 연습 기존 계정 연결"
              body="기존 도메인 : skala-skct.pages.dev/"
              connected={mockState.practice.connected}
              noAccount={noAccount}
              onConnect={() =>
                setMockState((current) => ({ ...current, practice: { connected: true } }))
              }
            />
          </div>

          <div className="welcome-preview-actions">
            <button className="btn primary" type="button" disabled={!canStart}>
              완료하고 시작하기
            </button>
          </div>
        </section>
      </main>
      <DesktopOnly />
    </>
  );
}

function PreviewLinkPanel({
  label,
  title,
  body,
  connected,
  noAccount,
  onConnect,
}: {
  label: string;
  title: string;
  body: string;
  connected: boolean;
  noAccount: boolean;
  onConnect: () => void;
}) {
  const disabled = connected || noAccount;
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);

  const handleConnect = () => {
    setBusy(true);
    window.setTimeout(() => {
      setBusy(false);
      if (!nickname.trim() || !password) {
        window.alert('기존 아이디와 비밀번호를 입력해주세요.');
        return;
      }
      onConnect();
      window.alert('기존 계정 연결이 완료되었습니다.');
    }, 700);
  };

  return (
    <article className={`welcome-preview-panel${connected ? ' is-connected' : ''}`}>
      <div className="welcome-preview-panel-top">
        <span>{label}</span>
        <small>{connected ? '연결 완료' : '미연결'}</small>
      </div>
      <h2>{title}</h2>
      <p>{body}</p>
      <div className="welcome-preview-fields">
        <input
          placeholder="기존 아이디"
          autoComplete="off"
          value={nickname}
          disabled={disabled || busy}
          onChange={(event) => setNickname(event.target.value)}
        />
        <input
          type="password"
          placeholder="기존 비밀번호"
          autoComplete="off"
          value={password}
          disabled={disabled || busy}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      <button
        className={`btn block welcome-preview-connect${busy ? ' is-loading' : ''}`}
        type="button"
        onClick={handleConnect}
        disabled={disabled || busy}
      >
        {busy ? (
          <span className="welcome-preview-loading" aria-label="연결 중" />
        ) : connected ? (
          '연결 완료'
        ) : (
          '연결하기'
        )}
      </button>
    </article>
  );
}
