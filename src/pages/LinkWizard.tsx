import { Navigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../auth';
import LinkForm from '../components/LinkForm';
import { isAbsolute } from '../nav';

// 카카오 가입 직후 1회 표시되는 통합 마법사. 기존 skct/skala 계정을 연결(링크)하면
// 통합 계정 하나로 기존 기록을 그대로 이어 쓴다. 건너뛰어도 됨(나중에 /settings에서 가능).
export default function LinkWizard() {
  const { user, loading, refresh } = useAuth();
  const [sp] = useSearchParams();
  const next = sp.get('next') || '/';

  if (loading)
    return (
      <div className="flex min-h-dvh flex-col items-center justify-center p-6">
        <p className="text-muted">불러오는 중…</p>
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

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center p-6">
      <div className="mx-auto w-full max-w-[560px]">
        <h1 className="m-0 text-4xl font-bold">환영합니다, {user.nick}님 👋</h1>
        <p className="text-muted">
          모의고사·연습앱에 <strong>기존 계정</strong>이 있다면 지금 연결하세요. 기존 아이디·비밀번호로 한 번만
          확인하면 <strong>기존 기록을 그대로 이어서</strong> 쓸 수 있어요. 없으면 건너뛰어도 됩니다.
        </p>

        {user.isKakao ? (
          <>
            <LinkForm service="skct" title="모의고사(skct) 기존 계정 연결" done={!!user.skctUserId} onDone={refresh} />
            <LinkForm service="skala" title="연습앱(skala) 기존 계정 연결" done={!!user.skalaHandle} onDone={refresh} />
          </>
        ) : (
          <p className="text-muted">카카오로 로그인한 계정에서만 기존 계정을 통합할 수 있어요.</p>
        )}

        <div className="mt-4 flex items-center justify-between gap-2">
          <button className="cursor-pointer border-0 bg-transparent p-0 font-inherit text-primary" onClick={goNext}>
            나중에 하기
          </button>
          <button
            className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-transparent bg-primary px-3.5 py-2.5 text-base font-semibold text-white hover:brightness-[0.98]"
            onClick={goNext}
          >
            완료하고 시작
          </button>
        </div>
      </div>
    </div>
  );
}
