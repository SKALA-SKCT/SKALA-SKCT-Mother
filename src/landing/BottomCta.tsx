import type { CSSProperties } from "react";
import { bottomCta } from "./content";
import styles from "./BottomCta.module.css";

export default function BottomCta() {
  return (
    <section className={styles.cta}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className={styles.bg} src="/assets/cta-bg.png" alt="" aria-hidden="true" />

      <div className={styles.content}>
        <div className={styles.heads}>
          <h2 className={`heading reveal ${styles.title}`} style={{ "--reveal-y": "70px" } as CSSProperties}>
            {bottomCta.title.split("\n").map((line) => (
              <span key={line}>{line}</span>
            ))}
          </h2>
        </div>
      </div>
    </section>
  );
}
