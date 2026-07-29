"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef } from "react";
import { solutions } from "./content";
import styles from "./SolutionsSection.module.css";

const STACK_TOPS = [200, 230, 260];

export default function SolutionsSection() {
  const listRef = useRef<HTMLDivElement>(null);

  /**
   * Sticky stack: every card pins at the same offset and the next one slides
   * over it. A covered card scales down so the deck reads as receding, but it
   * keeps full opacity so nothing shows through the card on top.
   */
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    if (window.matchMedia("(max-width: 767.98px)").matches) return;

    const cards = Array.from(list.children) as HTMLElement[];
    let frame = 0;

    const update = () => {
      frame = 0;
      cards.forEach((card, index) => {
        const next = cards[index + 1];
        if (!next) {
          card.style.transform = "";
          return;
        }
        const height = card.offsetHeight || 1;
        const pinTop = STACK_TOPS[index] ?? STACK_TOPS[STACK_TOPS.length - 1];
        const covered = (pinTop + height - next.getBoundingClientRect().top) / height;
        const p = Math.min(Math.max(covered, 0), 1);
        card.style.transform = `scale(${1 - 0.095 * p})`;
      });

    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section className={styles.section} id="mock">
      <div className={styles.container}>
        <div className={`reveal ${styles.title}`} style={{ "--reveal-y": "70px" } as CSSProperties}>
          <h2 className="heading">
            {solutions.title}
          </h2>
        </div>

        <div className={styles.list} ref={listRef}>
          {solutions.cards.map((card, index) => (
            <article
              key={card.bg}
              className={`${styles.card} ${card.imageSide === "left" ? styles.cardReverse : ""}`}
              style={{ zIndex: index + 1 }}
            >
              <div className={styles.copy}>
                <div className={styles.heads}>
                  <h3>{card.title}</h3>
                  <p>{card.body}</p>
                </div>

                <div className={styles.checks}>
                  {card.bullets.map((bullet) => (
                    <p className={styles.check} key={bullet}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="/assets/tick.svg" alt="" width={18} height={18} />
                      {bullet}
                    </p>
                  ))}
                </div>
              </div>

              <div className={styles.media}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className={styles.mediaBg} src={card.bg} alt="" aria-hidden="true" />
                <div className={styles.mediaCard} aria-label={`${card.title} preview placeholder`} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
