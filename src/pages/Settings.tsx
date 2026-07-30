import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../auth';
import { MOCK_URL, PRACTICE_URL } from '../config';
import LinkForm from '../components/LinkForm';

export default function Settings() {
  const { user, loading, logout, refresh } = useAuth();

  if (loading)
    return (
      <div className="flex min-h-dvh flex-col items-center justify-center p-6">
        <p className="text-muted">불러오는 중…</p>
      </div>
    );
  if (!user) return <Navigate to="/login?redirect=/settings" replace />;

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center p-6">
      <div className="mx-auto w-full max-w-[560px]">
        <div className="flex items-center justify-between gap-2">
          <h1 className="m-0 text-4xl font-bold">설정</h1>
          <Link
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-surface2 px-3.5 py-2.5 text-base font-semibold text-text no-underline hover:brightness-[0.98]"
            to="/"
          >
            ← 홈
          </Link>
        </div>

        <div className="mt-3 flex w-full flex-col gap-3 rounded-[10px] border border-border bg-surface p-7 shadow-soft">
          <div>
            <strong>{user.nick}</strong>{' '}
            <span className="text-muted">({user.isKakao ? '카카오 계정' : '기존 계정'})</span>
          </div>
          <div className="text-muted">
            모의고사 연결: {user.skctUserId ? `#${user.skctUserId}` : '미연결'} · 연습앱 연결:{' '}
            {user.skalaHandle ?? '미연결'}
          </div>
        </div>

        {user.isKakao ? (
          <>
            <LinkForm service="skct" title="모의고사(skct) 계정 가져오기" done={!!user.skctUserId} onDone={refresh} />
            <LinkForm service="skala" title="연습앱(skala) 계정 가져오기" done={!!user.skalaHandle} onDone={refresh} />
          </>
        ) : (
          <p className="text-muted">
            기존 계정으로 로그인 중입니다. 카카오로 로그인하면 두 서비스의 데이터를 한 계정으로 연결할 수 있어요.
          </p>
        )}

        <div className="mt-4 flex items-center gap-2">
          <a
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-surface2 px-3.5 py-2.5 text-base font-semibold text-text no-underline hover:brightness-[0.98]"
            href={MOCK_URL}
          >
            모의고사 열기
          </a>
          <a
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-surface2 px-3.5 py-2.5 text-base font-semibold text-text no-underline hover:brightness-[0.98]"
            href={PRACTICE_URL}
          >
            연습앱 열기
          </a>
          <button
            className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-border bg-surface2 px-3.5 py-2.5 text-base font-semibold text-text hover:brightness-[0.98]"
            onClick={logout}
          >
            로그아웃
          </button>
        </div>
      </div>
    </div>
  );
}
