import { Link } from 'react-router-dom';
import { useAuth } from '../auth';
import { MOCK_URL, PRACTICE_URL } from '../config';

export default function Landing() {
  const { user, loading, logout } = useAuth();
  return (
    <div className="page">
      <div className="container">
        <div className="row" style={{ justifyContent: 'space-between' }}>
          <h1 style={{ margin: 0 }}>SKCT · SKALA</h1>
          <div className="row">
            {loading ? null : user ? (
              <>
                <span className="muted">{user.nick}님</span>
                <Link className="btn" to="/settings">
                  설정
                </Link>
                <button className="btn" onClick={logout}>
                  로그아웃
                </button>
              </>
            ) : (
              <Link className="btn primary" to="/login">
                로그인
              </Link>
            )}
          </div>
        </div>

        <p className="muted">SKALA 구성원을 위한 SKCT 도구 모음. 하나의 로그인으로 모두 사용하세요.</p>

        <div className="card-grid">
          <a className="card" href={MOCK_URL}>
            <h3>SKCT 모의고사</h3>
            <p>회차별 모의고사 응시와 결과·비교 분석.</p>
          </a>
          <a className="card" href={PRACTICE_URL}>
            <h3>SKCT 연습 도구</h3>
            <p>문항별 시간 측정과 오답 패턴 분석.</p>
          </a>
        </div>
      </div>
    </div>
  );
}
