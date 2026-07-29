"use client";

import { useEffect, useRef, useState } from "react";
import { dataPlatform } from "./content";
import styles from "./DataPlatformSection.module.css";

export default function DataPlatformSection() {
  const [active, setActive] = useState(0);
  const itemRefs = useRef<Array<HTMLElement | null>>([]);

  /* `body.scene-dark` (the ink inversion for this section and the header) is
     driven by GrowthSection, in step with the backdrop that grows over it. */

  useEffect(() => {
    const items = itemRefs.current.filter(Boolean) as HTMLElement[];
    if (!items.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!visible) return;
        const next = Number((visible.target as HTMLElement).dataset.index);
        if (!Number.isNaN(next)) setActive(next);
      },
      {
        root: null,
        threshold: [0.35, 0.5, 0.65],
        rootMargin: "-28% 0px -28% 0px",
      },
    );

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.section} id="practice">
      <div className={styles.container}>
        <h2 className={`heading reveal ${styles.title}`}>
          {dataPlatform.title.split("\n").map((line) => (
            <span key={line}>{line}</span>
          ))}
        </h2>

        <div className={styles.stickyGrid}>
          <div className={styles.copyColumn}>
            {dataPlatform.features.map((feature, index) => (
              <article
                className={`${styles.copyItem} ${index === active ? styles.copyItemActive : ""}`}
                data-index={index}
                ref={(node) => {
                  itemRefs.current[index] = node;
                }}
                key={feature.title}
              >
                <span className={styles.eyebrow}>{feature.eyebrow}</span>
                <h3>
                  {feature.title.split("\n").map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                </h3>
                <p>
                  {feature.body.split("\n").map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                </p>
                <ul>
                  {feature.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <div className={styles.visualColumn} aria-hidden="true">
            <div className={styles.visualStage}>
              {dataPlatform.features.map((feature, index) => (
                <div
                  className={`${styles.screen} ${index === active ? styles.screenActive : ""}`}
                  key={feature.image}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
