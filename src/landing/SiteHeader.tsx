import BrandMark from "./BrandMark";
import { nav } from "./content";
import styles from "./SiteHeader.module.css";
import { useAuth } from "../auth";

export default function SiteHeader() {
  const { user, loading, logout } = useAuth();

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <a className={styles.brand} href="#top" aria-label="SKALA-SKCT 홈">
          <BrandMark />
        </a>

        <nav className={styles.nav}>
          {nav.links.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className={styles.actions}>
          {!loading && user ? (
            <>
              <span className={styles.user}>{user.nick}님</span>
              <a className={styles.login} href="/settings">
                설정
              </a>
              <button className={styles.login} type="button" onClick={logout}>
                로그아웃
              </button>
            </>
          ) : (
            <a className={styles.login} href={nav.login.href}>
              {nav.login.label}
            </a>
          )}
        </div>
      </div>
    </header>
  );
}
