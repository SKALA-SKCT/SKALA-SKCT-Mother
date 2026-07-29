import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import DesktopOnly from '../landing/DesktopOnly';
import BrandMark from './BrandMark';

type Props = {
  title: string;
  lede?: string;
  backTo?: string;
  backLabel?: string;
  helpContent?: ReactNode;
  centered?: boolean;
  children: ReactNode;
};

export default function AuthShell({
  title,
  lede,
  backTo = '/',
  backLabel = '랜딩으로 돌아가기',
  helpContent,
  centered = false,
  children,
}: Props) {
  return (
    <>
      <main className="auth-shell">
        <div className="auth-card">
          <section className="auth-panel">
            <img className="auth-panel-bg" src="/assets/growth-bg.png" alt="" aria-hidden="true" />
            <div className="auth-panel-scrim" aria-hidden="true" />

            <div className="auth-panel-top">
              <Link className="auth-panel-home" to={backTo}>
                <span aria-hidden="true">←</span>
                {backLabel}
              </Link>
              <p className="auth-panel-head">지금 로그인하고 SKCT 학습을 시작하세요.</p>
            </div>
            <p className="auth-panel-caption">SKALA SKCT Practice Platform</p>
          </section>

          <section className={`auth-form-panel${centered ? ' auth-form-panel-centered' : ''}`}>
            {helpContent}
            <Link className="auth-brand" to="/" aria-label="SKALA-SKCT 홈">
              <BrandMark height={centered ? 26 : 20} />
            </Link>
            <h1 className="auth-title">{title}</h1>
            {lede ? <p className="auth-lede">{lede}</p> : null}
            <div className="auth-body">{children}</div>
          </section>
        </div>
      </main>
      <DesktopOnly />
    </>
  );
}
