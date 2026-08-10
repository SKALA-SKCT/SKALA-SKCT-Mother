"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef } from "react";
import { solutions } from "./content";
import { HEADING } from "../styleTokens";

const STACK_TOPS = [200, 230, 260];

/* Reference: section padding 110/30/0, container gap 64 (max 1200),
   card list gap 24 (max 1044). Title stays with the card stack section only. */

/** Literal classes so Tailwind can see them; mirrors STACK_TOPS. */
const STACK_TOP_CLASS = ["top-[200px]", "top-[230px]", "top-[260px]"];

const CARD_COMMON =
  "sticky flex items-center w-full min-h-[478px] overflow-hidden rounded-2xl bg-surface " +
  "[transform-origin:50%_50%] [will-change:transform,opacity] " +
  "max-[767.98px]:static max-[767.98px]:flex-col max-[767.98px]:gap-8 " +
  "max-[767.98px]:px-6 max-[767.98px]:pb-0 max-[767.98px]:pt-8";

// The two variants are kept as complete, mutually exclusive strings. Merging them
// would leave the winner up to Tailwind's output order rather than the markup.
const CARD = `${CARD_COMMON} gap-[144px] pl-14 max-[1099.98px]:gap-12 max-[1099.98px]:pl-10`;
const CARD_REVERSE =
  `${CARD_COMMON} flex-row-reverse gap-[72px] pl-0 pr-14 ` +
  "max-[1099.98px]:gap-10 max-[1099.98px]:pl-10 max-[1099.98px]:pr-10";
const MEDIA =
  "relative flex items-center justify-center overflow-hidden aspect-[0.981172] " +
  "w-px max-w-[470px] flex-[1_0_0] " +
  "max-[767.98px]:aspect-[1.4] max-[767.98px]:w-full max-[767.98px]:flex-none";
const MEDIA_REVERSE =
  "relative flex items-center justify-center overflow-hidden aspect-auto " +
  "min-h-[478px] w-[541px] max-w-none flex-[0_0_541px] self-stretch";

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
    <section className="flex justify-center px-[30px] pb-0 pt-[110px]" id="mock">
      <div className="flex w-full max-w-[1200px] flex-col items-center gap-16">
        <div
          className="reveal pointer-events-none sticky top-[112px] z-[1] w-full text-center max-[767.98px]:static"
          style={{ "--reveal-y": "70px" } as CSSProperties}
        >
          <h2 className={HEADING}>{solutions.title}</h2>
        </div>

        <div
          className="relative z-[2] flex w-full max-w-[1044px] flex-col items-center gap-6 pb-0"
          ref={listRef}
        >
          {solutions.cards.map((card, index) => {
            const reverse = card.imageSide === "left";
            const top = STACK_TOP_CLASS[index] ?? STACK_TOP_CLASS[STACK_TOP_CLASS.length - 1];

            return (
              <article
                key={card.bg}
                className={`${reverse ? CARD_REVERSE : CARD} ${top}`}
                style={{ zIndex: index + 1 }}
              >
                <div className="flex w-px max-w-[375px] flex-[1_0_0] flex-col items-start gap-8 max-[1099.98px]:max-w-[320px] max-[767.98px]:w-full max-[767.98px]:max-w-none max-[767.98px]:flex-none">
                  <div className="flex flex-col gap-4">
                    <h3 className="text-[36px] font-medium leading-[1.4] tracking-[-1px] max-[1199.98px]:text-[30px] max-[1199.98px]:tracking-[-0.6px]">
                      {card.title}
                    </h3>
                    <p className="whitespace-pre-line text-[18px] leading-[1.7] text-muted">{card.body}</p>
                  </div>

                  {card.bullets.length > 0 && (
                    <div className="flex flex-col gap-3">
                      {card.bullets.map((bullet) => (
                        <p
                          className="flex items-center gap-2.5 text-[16px] font-normal leading-[1.7]"
                          key={bullet}
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            className="h-[18px] w-[18px] flex-none"
                            src="/assets/tick.svg"
                            alt=""
                            width={18}
                            height={18}
                          />
                          {bullet}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
                <div className={reverse ? MEDIA_REVERSE : MEDIA}>
                  <img className="absolute inset-0 h-full w-full object-cover" src={card.bg} alt="" aria-hidden="true" />
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
