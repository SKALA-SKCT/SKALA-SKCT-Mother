"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import { stats } from "./content";

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
    <div
      className="flex w-px max-w-[248px] flex-[1_0_0] flex-col items-start gap-3 max-[1199.98px]:w-full max-[1199.98px]:max-w-none max-[1199.98px]:flex-none"
      ref={ref}
    >
      <p className="flex items-center gap-[2px] text-[40px] font-semibold leading-[1.4] tracking-[-1px] tabular-nums max-[1199.98px]:text-[36px] max-[767.98px]:text-[30px]">
        {value}
        <span>{stat.suffix}</span>
      </p>
      <p className="text-[24px] font-medium leading-[1.4] tracking-[-0.5px]">{stat.label}</p>
      <p className="whitespace-pre-line text-[16px] leading-[1.7] text-muted">{stat.body}</p>
    </div>
  );
}

/* Reference: section padding 80/30/0; one white card, radius 16,
   padding 72px 78px, three 248px columns spaced apart. */
export default function StatsSection() {
  return (
    <section className="flex justify-center px-[30px] pb-0 pt-[128px]">
      <div
        className="reveal flex w-full max-w-[1200px] items-center justify-between rounded-2xl bg-surface px-16 py-[60px] max-[1199.98px]:flex-col max-[1199.98px]:items-start max-[1199.98px]:gap-12 max-[1199.98px]:px-8 max-[1199.98px]:py-12"
        style={{ "--reveal-y": "100px" } as CSSProperties}
      >
        {stats.map((stat) => (
          <Stat stat={stat} key={stat.label} />
        ))}
      </div>
    </section>
  );
}
