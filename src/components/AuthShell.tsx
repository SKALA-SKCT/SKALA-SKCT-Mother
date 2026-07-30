import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import DesktopOnly from '../landing/DesktopOnly';
import BrandMark from './BrandMark';
import {
  AUTH_CARD,
  AUTH_FORM_PANEL,
  AUTH_FORM_PANEL_CENTERED,
  AUTH_LEDE,
  AUTH_PANEL,
  AUTH_PANEL_BG,
  AUTH_PANEL_CAPTION,
  AUTH_PANEL_HEAD,
  AUTH_PANEL_HOME,
  AUTH_PANEL_SCRIM,
  AUTH_PANEL_TOP,
  AUTH_SHELL,
  authBody,
  authBrand,
  authTitle,
} from '../authStyles';

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
      <main className={AUTH_SHELL}>
        <div className={AUTH_CARD}>
          <section className={AUTH_PANEL}>
            <img className={AUTH_PANEL_BG} src="/assets/growth-bg.png" alt="" aria-hidden="true" />
            <div className={AUTH_PANEL_SCRIM} aria-hidden="true" />

            <div className={AUTH_PANEL_TOP}>
              <Link className={AUTH_PANEL_HOME} to={backTo}>
                <span aria-hidden="true">←</span>
                {backLabel}
              </Link>
              <p className={AUTH_PANEL_HEAD}>지금 로그인하고 SKCT 학습을 시작하세요.</p>
            </div>
            <p className={AUTH_PANEL_CAPTION}>SKALA SKCT Practice Platform</p>
          </section>

          <section className={centered ? AUTH_FORM_PANEL_CENTERED : AUTH_FORM_PANEL}>
            {helpContent}
            <Link className={authBrand(centered)} to="/" aria-label="SKALA-SKCT 홈">
              <BrandMark height={centered ? 26 : 20} />
            </Link>
            <h1 className={authTitle(centered)}>{title}</h1>
            {lede ? <p className={AUTH_LEDE}>{lede}</p> : null}
            <div className={authBody(centered)}>{children}</div>
          </section>
        </div>
      </main>
      <DesktopOnly />
    </>
  );
}
