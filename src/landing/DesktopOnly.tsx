import BrandMark from "./BrandMark";
import styles from "./DesktopOnly.module.css";

/**
 * Below the desktop breakpoint the landing is replaced by this notice.
 * CSS-only gate (see globals.css) so it works without JS and cannot mismatch
 * on hydration — nothing here depends on measuring the viewport.
 *
 * Uses the landing's base surface and type scale — no gradient plate, since a
 * full-screen stretch of the marketing gradient reads as noise here.
 */
export default function DesktopOnly() {
  return (
    <div className={styles.gate} data-desktop-gate>
      <div className={styles.content}>
        <div className={styles.brand}>
          <BrandMark />
        </div>

        <p className={styles.eyebrow}>Desktop Only</p>

        <h1 className={`heading ${styles.title}`}>
          <span>데스크탑에서</span>
          <span>확인해 주세요</span>
        </h1>

        <p className={styles.body}>
          긴 지문과 표, 자료 이미지, 결과 차트를 한 화면에서 봐야 해서
          모바일 화면은 지원하지 않아요.
        </p>

        <div className={styles.spec}>
          <p className={styles.specLabel}>권장 환경</p>
          <p className={styles.specValue}>가로 1200px 이상 · Chrome, Edge, Safari</p>
        </div>
      </div>
    </div>
  );
}
