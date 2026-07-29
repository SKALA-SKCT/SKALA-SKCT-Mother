import { useEffect } from 'react';
import { Link, Navigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../auth';
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
      <div className="page">
        <p className="muted">이동 중…</p>
      </div>
    );

  const kakaoHref = `/api/auth/kakao/start?redirect=${encodeURIComponent(redirect)}`;
  const legacyHref = redirect !== '/' ? `/login/legacy?redirect=${encodeURIComponent(redirect)}` : '/login/legacy';

  return (
    <div className="page">
      <div className="auth-box">
        <h1>로그인</h1>
        <p className="muted">카카오로 간편하게 시작하세요. 신규 가입도 카카오로 진행됩니다.</p>
        {err && <div className="auth-err">{err}</div>}
        <a className="btn kakao block" href={kakaoHref}>
          카카오로 로그인
        </a>
        <div className="divider">또는</div>
        <Link className="btn block" to={legacyHref}>
          기존 계정으로 로그인
        </Link>
        <Link className="linklike center" to="/">
          ← 홈으로
        </Link>
      </div>
    </div>
  );
}
