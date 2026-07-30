import { Link } from 'react-router-dom';
import { useAuth } from '../auth';
import { MOCK_URL, PRACTICE_URL } from '../config';

export default function Landing() {
  const { user, loading, logout } = useAuth();
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center p-6">
      <div className="mx-auto w-full max-w-[920px]">
        <div className="flex items-center justify-between gap-2">
          <h1 className="m-0 text-4xl font-bold">SKCT · SKALA</h1>
          <div className="flex items-center gap-2">
            {loading ? null : user ? (
              <>
                <span className="text-muted">{user.nick}님</span>
                <Link
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-surface2 px-3.5 py-2.5 text-base font-semibold text-text no-underline hover:brightness-[0.98]"
                  to="/settings"
                >
                  설정
                </Link>
                <button
                  className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-border bg-surface2 px-3.5 py-2.5 text-base font-semibold text-text hover:brightness-[0.98]"
                  onClick={logout}
                >
                  로그아웃
                </button>
              </>
            ) : (
              <Link
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-transparent bg-primary px-3.5 py-2.5 text-base font-semibold text-white no-underline hover:brightness-[0.98]"
                to="/login"
              >
                로그인
              </Link>
            )}
          </div>
        </div>

        <p className="text-muted">SKALA 구성원을 위한 SKCT 도구 모음. 하나의 로그인으로 모두 사용하세요.</p>

        <div className="mt-6 grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-4">
          <a
            className="block rounded-[10px] border border-border bg-surface p-[22px] text-inherit no-underline shadow-soft transition hover:-translate-y-0.5 hover:border-primary"
            href={MOCK_URL}
          >
            <h3 className="mb-1.5 mt-0 text-xl font-bold">SKCT 모의고사</h3>
            <p className="m-0 text-[0.92rem] text-muted">회차별 모의고사 응시와 결과·비교 분석.</p>
          </a>
          <a
            className="block rounded-[10px] border border-border bg-surface p-[22px] text-inherit no-underline shadow-soft transition hover:-translate-y-0.5 hover:border-primary"
            href={PRACTICE_URL}
          >
            <h3 className="mb-1.5 mt-0 text-xl font-bold">SKCT 연습 도구</h3>
            <p className="m-0 text-[0.92rem] text-muted">문항별 시간 측정과 오답 패턴 분석.</p>
          </a>
        </div>
      </div>
    </div>
  );
}
