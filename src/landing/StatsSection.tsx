"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import { stats } from "./content";
import styles from "./StatsSection.module.css";

const DURATION = 1400;

/** Counts from 0 to `target` the first time the element scrolls into view. */
function useCountUp(target: number) {
  const ref = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      setValue(target);
      return;
    }

    const run = () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setValue(target);
        return;
      }

      const start = performance.now();
      const step = (now: number) => {
        const t = Math.min((now - start) / DURATION, 1);
        setValue(Math.round(target * (1 - Math.pow(1 - t, 3))));
        if (t < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          run();
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [target]);

  return { ref, value };
}

function Stat({ stat }: { stat: (typeof stats)[number] }) {
  const { ref, value } = useCountUp(stat.value);

  return (
    <div className={styles.stat} ref={ref}>
      <p className={styles.counter}>
        {value}
        <span>{stat.suffix}</span>
      </p>
      <p className={styles.label}>{stat.label}</p>
      <p className={styles.body}>{stat.body}</p>
    </div>
  );
}

export default function StatsSection() {
  return (
    <section className={styles.section}>
      <div className={`reveal ${styles.card}`} style={{ "--reveal-y": "100px" } as CSSProperties}>
        {stats.map((stat) => (
          <Stat stat={stat} key={stat.label} />
        ))}
      </div>
    </section>
  );
}
