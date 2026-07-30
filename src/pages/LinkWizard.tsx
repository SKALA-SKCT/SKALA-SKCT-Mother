import { Navigate, useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../auth';
import LinkForm from '../components/LinkForm';
import BrandMark from '../components/BrandMark';
import DesktopOnly from '../landing/DesktopOnly';
import { isAbsolute } from '../nav';
import {
  BTN_PRIMARY,
  WELCOME_ACTIONS,
  WELCOME_BADGE,
  WELCOME_CARD,
  WELCOME_CHECK,
  WELCOME_CHECK_INPUT,
  WELCOME_COPY,
  WELCOME_COPY_P,
  WELCOME_COPY_ROW,
  WELCOME_GRID,
  WELCOME_H1,
  WELCOME_HEAD,
  WELCOME_KICKER,
  WELCOME_SHELL,
} from '../authStyles';

// 카카오 가입 직후 1회 표시되는 통합 마법사. 기존 skct/skala 계정을 연결(링크)하면
// 통합 계정 하나로 기존 기록을 그대로 이어 쓴다. 건너뛰어도 됨(나중에 /settings에서 가능).
export default function LinkWizard() {
  const { user, loading, refresh } = useAuth();
  const [sp] = useSearchParams();
  const next = sp.get('next') || '/';
  const [noAccount, setNoAccount] = useState(false);

  // `.page` / `.muted` are not defined in the stylesheet; these stay unstyled.
  if (loading)
    return (
      <div>
        <p>불러오는 중…</p>
      </div>
    );
  if (!user) {
    const back = '/welcome' + (next !== '/' ? `?next=${encodeURIComponent(next)}` : '');
    return <Navigate to={`/login?redirect=${encodeURIComponent(back)}`} replace />;
  }

  const goNext = () => {
    if (isAbsolute(next)) window.location.href = next;
    else window.location.assign(next);
  };

  const hasLinkedAccount = !!user.skctUserId || !!user.skalaHandle;
  const canStart = noAccount || hasLinkedAccount;

  return (
    <>
      <main className={WELCOME_SHELL}>
        <section className={WELCOME_CARD} aria-label="카카오 첫 로그인 후 기존 계정 연결">
          <div className={WELCOME_HEAD}>
            <BrandMark height={26} />
            <span className={WELCOME_BADGE}>첫 카카오 로그인</span>
          </div>

          <div className={WELCOME_COPY}>
            <p className={WELCOME_KICKER}>환영합니다, {user.nick}님</p>
            <h1 className={WELCOME_H1}>기존 학습 기록을 이어서 사용할까요?</h1>
            <div className={WELCOME_COPY_ROW}>
              <p className={WELCOME_COPY_P}>기존 서비스 계정이 있다면 처음 한 번만 인증해 연결해주세요!</p>
              <label className={WELCOME_CHECK}>
                <input
                  className={WELCOME_CHECK_INPUT}
                  type="checkbox"
                  checked={noAccount}
                  onChange={(event) => setNoAccount(event.target.checked)}
                />
                <span>기존 계정이 없어요</span>
              </label>
            </div>
          </div>

          {user.isKakao ? (
            <div className={WELCOME_GRID}>
              <LinkForm
                service="skct"
                label="실전 모의고사"
                title="실전 모의고사 기존 계정 연결"
                body="기존 도메인 : skala-skct.vercel.app/"
                done={!!user.skctUserId}
                disabled={noAccount}
                onDone={refresh}
              />
              <LinkForm
                service="skala"
                label="모의고사 문제 연습"
                title="모의고사 문제 연습 기존 계정 연결"
                body="기존 도메인 : skala-skct.pages.dev/"
                done={!!user.skalaHandle}
                disabled={noAccount}
                onDone={refresh}
              />
            </div>
          ) : (
            /* `.muted` was never defined in the stylesheet, so this text is
               unstyled — kept as-is rather than silently restyled. */
            <p>카카오로 로그인한 계정에서만 기존 계정을 통합할 수 있어요.</p>
          )}

          <div className={WELCOME_ACTIONS}>
            <button className={BTN_PRIMARY} onClick={goNext} disabled={!canStart}>
              완료하고 시작하기
            </button>
          </div>
        </section>
      </main>
      <DesktopOnly />
    </>
  );
}
