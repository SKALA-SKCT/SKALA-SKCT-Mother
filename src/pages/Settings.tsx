import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../auth';
import { MOCK_URL, PRACTICE_URL } from '../config';
import LinkForm from '../components/LinkForm';

export default function Settings() {
  const { user, loading, logout, refresh } = useAuth();

  if (loading)
    return (
      <div className="page">
        <p className="muted">불러오는 중…</p>
      </div>
    );
  if (!user) return <Navigate to="/login?redirect=/settings" replace />;

  return (
    <div className="page">
      <div className="container max-w-[560px]">
        <div className="row justify-between">
          <h1 className="m-0">설정</h1>
          <Link className="btn" to="/">
            ← 홈
          </Link>
        </div>

        <div className="auth-box mt-3 max-w-none">
          <div>
            <strong>{user.nick}</strong>{' '}
            <span className="muted">({user.isKakao ? '카카오 계정' : '기존 계정'})</span>
          </div>
          <div className="muted">
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
          <p className="muted">
            기존 계정으로 로그인 중입니다. 카카오로 로그인하면 두 서비스의 데이터를 한 계정으로 연결할 수 있어요.
          </p>
        )}

        <div className="row mt-4">
          <a className="btn" href={MOCK_URL}>
            모의고사 열기
          </a>
          <a className="btn" href={PRACTICE_URL}>
            연습앱 열기
          </a>
          <button className="btn" onClick={logout}>
            로그아웃
          </button>
        </div>
      </div>
    </div>
  );
}
