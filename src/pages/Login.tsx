import { useEffect } from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../auth';
import AuthShell from '../components/AuthShell';
import { isAbsolute } from '../nav';

export default function Login() {
  const { user, loading } = useAuth();
  const [sp] = useSearchParams();
  const redirect = sp.get('redirect') || '/';
  const err = sp.get('e');

  // 이미 로그인 상태 + 자식 앱으로 돌아가야 하면 전체 이동.
  useEffect(() => {
    if (!loading && user && isAbsolute(redirect)) window.location.replace(redirect);
  }, [loading, user, redirect]);

  if (!loading && user && !isAbsolute(redirect)) return <Navigate to={redirect} replace />;
  if (!loading && user && isAbsolute(redirect))
    return (
      <div className="auth-shell">
        <p className="muted">이동 중…</p>
      </div>
    );

  const kakaoHref = `/api/auth/kakao/start?redirect=${encodeURIComponent(redirect)}`;
  return (
    <AuthShell
      centered
      title={'간편하게 로그인하고\nSKCT 학습을 시작해보세요.'}
      helpContent={
        <div className="auth-help">
          <button type="button" aria-label="기존 회원 안내" aria-describedby="legacy-account-help">
            ?
          </button>
          <div className="auth-help-tooltip" id="legacy-account-help" role="tooltip">
            <strong>기존 회원이신가요?</strong>
            <p>
              카카오 로그인 후 기존 계정을
              <br />
              처음 한 번만 인증해 연결하면,
              <br />
              이전 학습 기록을 그대로 이어서 사용할 수 있어요.
            </p>
          </div>
        </div>
      }
    >
      <div className="auth-box">
        {err && <div className="auth-err">{err}</div>}
        <a className="btn kakao block" href={kakaoHref}>
          <KakaoIcon />
          카카오 로그인
        </a>
      </div>
    </AuthShell>
  );
}

function KakaoIcon() {
  return (
    <svg width="18" height="17" viewBox="0 0 18 17" aria-hidden="true">
      <path
        fill="currentColor"
        d="M9 0C4.03 0 0 3.13 0 6.99c0 2.5 1.68 4.69 4.2 5.92-.18.64-.67 2.4-.77 2.78-.12.46.17.46.36.33.15-.1 2.35-1.58 3.3-2.22.62.09 1.26.14 1.91.14 4.97 0 9-3.13 9-6.95C18 3.13 13.97 0 9 0Z"
      />
    </svg>
  );
}
