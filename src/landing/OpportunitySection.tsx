import type { CSSProperties } from "react";
import { opportunity } from "./content";
import styles from "./OpportunitySection.module.css";

export default function OpportunitySection() {
  return (
    <section className={styles.section} id="types">
      <div className={styles.container}>
        <div className={styles.panel}>
          <h2 className={`heading reveal ${styles.title}`} style={{ "--reveal-y": "70px" } as CSSProperties}>
            {opportunity.title.split("\n").map((line) => (
              <span key={line}>{line}</span>
            ))}
          </h2>

          <div className={styles.grid}>
            {opportunity.items.map((item, index) => (
              <article
                className={`reveal ${styles.item}`}
                style={{ "--reveal-y": "72px", "--reveal-delay": `${index * 80}ms` } as CSSProperties}
                key={item.title}
              >
                <div className={styles.plate}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img className={styles.plateBg} src="/assets/opp-bg.png" alt="" aria-hidden="true" />
                  <div className={`reveal-tile ${styles.tileFrame}`}>
                    <div className={styles.tile} aria-label={`${item.title} placeholder`} />
                  </div>
                </div>

                <div className={styles.text}>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
