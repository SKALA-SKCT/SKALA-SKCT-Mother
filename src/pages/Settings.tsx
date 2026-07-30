import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../auth';
import { MOCK_URL, PRACTICE_URL } from '../config';
import LinkForm from '../components/LinkForm';
import { CONTAINER_BASE } from '../styleTokens';
import { AUTH_BOX, BTN, ROW } from '../authStyles';

// `.page` and `.muted` were never defined in the stylesheet, so the elements that
// carried them render unstyled. Left unstyled here rather than silently restyled.
export default function Settings() {
  const { user, loading, logout, refresh } = useAuth();

  if (loading)
    return (
      <div>
        <p>불러오는 중…</p>
      </div>
    );
  if (!user) return <Navigate to="/login?redirect=/settings" replace />;

  return (
    <div>
      <div className={`${CONTAINER_BASE} max-w-[560px]`}>
        <div className={`${ROW} justify-between`}>
          <h1 className="m-0">설정</h1>
          <Link className={BTN} to="/">
            ← 홈
          </Link>
        </div>

        <div className={`${AUTH_BOX} mt-3 max-w-none`}>
          <div>
            <strong>{user.nick}</strong> <span>({user.isKakao ? '카카오 계정' : '기존 계정'})</span>
          </div>
          <div>
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
          <p>
            기존 계정으로 로그인 중입니다. 카카오로 로그인하면 두 서비스의 데이터를 한 계정으로 연결할 수 있어요.
          </p>
        )}

        <div className={`${ROW} mt-4`}>
          <a className={BTN} href={MOCK_URL}>
            모의고사 열기
          </a>
          <a className={BTN} href={PRACTICE_URL}>
            연습앱 열기
          </a>
          <button className={BTN} onClick={logout}>
            로그아웃
          </button>
        </div>
      </div>
    </div>
  );
}
