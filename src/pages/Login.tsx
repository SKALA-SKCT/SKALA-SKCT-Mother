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
      <div className="flex min-h-dvh flex-col items-center justify-center p-6">
        <p className="text-muted">이동 중…</p>
      </div>
    );

  const kakaoHref = `/api/auth/kakao/start?redirect=${encodeURIComponent(redirect)}`;
  const legacyHref = redirect !== '/' ? `/login/legacy?redirect=${encodeURIComponent(redirect)}` : '/login/legacy';

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center p-6">
      <div className="flex w-full max-w-[380px] flex-col gap-3 rounded-[10px] border border-border bg-surface p-7 shadow-soft">
        <h1 className="m-0 text-[1.35rem] font-bold">로그인</h1>
        <p className="text-muted">카카오로 간편하게 시작하세요. 신규 가입도 카카오로 진행됩니다.</p>
        {err && <div className="text-[0.88rem] text-danger">{err}</div>}
        <a
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-transparent bg-kakao px-3.5 py-2.5 text-base font-semibold text-kakaoText no-underline hover:brightness-[0.98]"
          href={kakaoHref}
        >
          카카오로 로그인
        </a>
        <div className="my-1 flex items-center gap-2.5 text-[0.82rem] text-muted before:h-px before:flex-1 before:bg-border before:content-[''] after:h-px after:flex-1 after:bg-border after:content-['']">
          또는
        </div>
        <Link
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-border bg-surface2 px-3.5 py-2.5 text-base font-semibold text-text no-underline hover:brightness-[0.98]"
          to={legacyHref}
        >
          기존 계정으로 로그인
        </Link>
        <Link className="text-center text-primary no-underline" to="/">
          ← 홈으로
        </Link>
      </div>
    </div>
  );
}
