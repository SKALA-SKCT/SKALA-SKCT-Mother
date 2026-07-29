"use client";

import type { CSSProperties } from "react";
import { useEffect, useState } from "react";
import { hero } from "./content";
import styles from "./Hero.module.css";

const AUTOPLAY_MS = 4000;

export default function Hero() {
  const [active, setActive] = useState(0);
  const [autoplayDone, setAutoplayDone] = useState(false);

  // Advance through the dashboard tabs once, then stop forever.
  // Manual tab clicks must not restart autoplay after the first pass.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (autoplayDone) return;

    if (active >= hero.tabs.length - 1) {
      setAutoplayDone(true);
      return;
    }

    const timer = window.setTimeout(() => {
      setActive((current) => {
        const next = Math.min(current + 1, hero.tabs.length - 1);
        if (next >= hero.tabs.length - 1) setAutoplayDone(true);
        return next;
      });
    }, AUTOPLAY_MS);

    return () => window.clearTimeout(timer);
  }, [active, autoplayDone]);

  return (
    <section className={styles.hero} id="top">
      <div className={styles.inner}>
        <div className={styles.copy}>
          <div className={styles.titleBlock}>
            <h1 className={`display reveal ${styles.heroTitle}`} style={{ "--reveal-y": "70px" } as CSSProperties}>
              {hero.title.split("\n").map((line) => (
                <span key={line}>{line}</span>
              ))}
            </h1>
            <p className="lede reveal" style={{ "--reveal-y": "56px", "--reveal-delay": "90ms" } as CSSProperties}>
              {hero.body}
            </p>
          </div>
        </div>

        <div className={styles.plate}>
          <div
            className={`reveal-scale ${styles.plateBg}`}
            style={
              {
                "--reveal-delay": "420ms",
                "--reveal-scale-opacity-duration": "2.1s",
                "--reveal-scale-transform-duration": "2.4s",
              } as CSSProperties
            }
            aria-hidden="true"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/hero-bg.png" alt="" />
          </div>

          <div className={styles.group}>
            <div
              className={`reveal ${styles.pills}`}
              style={{ "--reveal-y": "100px", "--reveal-delay": "620ms" } as CSSProperties}
              role="tablist"
              aria-label="Product highlights"
            >
              {hero.tabs.map((tab, index) => (
                <button
                  key={tab.label}
                  type="button"
                  role="tab"
                  aria-selected={index === active}
                  className={`${styles.pill} ${index === active ? styles.pillActive : ""}`}
                  onClick={() => {
                    setAutoplayDone(true);
                    setActive(index);
                  }}
                >
                  <span className={styles.marker}>
                    {index === active ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src="/assets/hero-pill-icon.svg" alt="" width={24} height={23} />
                    ) : (
                      <span className={styles.dot} />
                    )}
                  </span>
                  {tab.label}
                </button>
              ))}
            </div>

            <div className={styles.frame}>
              {hero.tabs.map((tab, index) => (
                <div
                  key={tab.image}
                  className={`${styles.shot} ${index === active ? styles.shotActive : ""}`}
                  aria-hidden={index !== active}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
