import BrandMark from "./BrandMark";
import { footer } from "./content";
import styles from "./SiteFooter.module.css";

export default function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <BrandMark />
        <p>{footer.copyright}</p>
      </div>
    </footer>
  );
}
