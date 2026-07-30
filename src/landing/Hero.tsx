"use client";

import type { CSSProperties } from "react";
import { useEffect, useState } from "react";
import { hero } from "./content";
import { LEDE } from "../styleTokens";

const AUTOPLAY_MS = 4000;

/* Geometry mirrors the reference: section padding 60/30/280, 1200 container,
   a 1.82094 aspect background plate, and an 80%-wide overlay group pinned 56px
   from the plate's top. */

/* `.display` supplies line-height 1 and weight 500; the size and tracking here
   outrank it at every width, so there are no responsive steps. */
const HERO_TITLE = "text-[78px] font-medium leading-none tracking-[-3.2px]";

const PILLS =
  "flex min-h-[46px] w-fit max-w-full flex-wrap items-center justify-center gap-10 " +
  "rounded-[100px] bg-surface px-[42px] py-0.5 " +
  "max-[1000px]:min-h-[44px] max-[1000px]:gap-3 max-[1000px]:px-3";

const PILL =
  "flex items-center gap-3 whitespace-pre p-0 text-[16px] font-medium leading-[1.7] " +
  "[transition:color_0.2s_ease] max-[1000px]:gap-2 max-[1000px]:p-1.5 max-[1000px]:text-[14px]";

const FRAME =
  "relative aspect-[1.32799] w-full max-w-[911px] overflow-hidden rounded-[32px] " +
  "bg-[rgba(255,255,255,0.54)] px-[17px] py-4 [backdrop-filter:blur(54px)] " +
  // Arbitrary property, not shadow-[…]: that utility composes the ring vars in
  // and lands two transparent placeholder shadows in the computed value.
  "[box-shadow:0_8px_32px_rgba(0,0,0,0.08)] max-[1000px]:rounded-[20px] max-[1000px]:p-2.5";

const SHOT =
  "absolute left-[1.8112%] top-[2.33236%] h-[95%] w-[96%] rounded-3xl border-[1px] " +
  "border-[color:rgba(59,59,59,0.08)] bg-white [transition:opacity_1.1s_ease]";

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
    <section
      className="flex justify-center overflow-hidden px-[30px] pb-[280px] pt-[92px] max-[1000px]:px-5 max-[1000px]:pb-40 max-[1000px]:pt-[130px]"
      id="top"
    >
      <div className="w-full max-w-[1200px]">
        <div className="flex flex-col items-center gap-6 text-center">
          {/* Title + lede share a 740px column, 16px apart. */}
          <div className="flex w-full max-w-[1120px] flex-col items-center gap-4">
            <h1 className={`reveal ${HERO_TITLE}`} style={{ "--reveal-y": "70px" } as CSSProperties}>
              {hero.title.split("\n").map((line) => (
                <span className="block whitespace-nowrap" key={line}>
                  {line}
                </span>
              ))}
            </h1>
            <p
              className={`reveal ${LEDE}`}
              style={{ "--reveal-y": "56px", "--reveal-delay": "90ms" } as CSSProperties}
            >
              {hero.body}
            </p>
          </div>
        </div>

        <div className="relative mt-[102px] aspect-[1.82094] w-full max-[1000px]:aspect-[1.20275] max-[1000px]:rounded-xl">
          {/* Separate layer so the plate can scale up on entry without dragging
              the dashboard group with it — same split the reference uses. */}
          <div
            className="reveal-scale absolute inset-0 overflow-hidden rounded-2xl"
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
            <img className="h-full w-full object-cover object-center" src="/assets/hero-bg.png" alt="" />
          </div>

          <div className="absolute left-1/2 top-14 z-[1] flex w-full flex-col items-center gap-16 [transform:translateX(-50%)] max-[1000px]:top-[30px] max-[1000px]:w-[90%] max-[1000px]:gap-6">
            <div
              className={`reveal ${PILLS}`}
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
                  className={`${PILL} ${index === active ? "text-ink" : "text-muted"}`}
                  onClick={() => {
                    setAutoplayDone(true);
                    setActive(index);
                  }}
                >
                  <span className="grid h-6 w-6 flex-none place-items-center">
                    {index === active ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src="/assets/hero-pill-icon.svg" alt="" width={24} height={23} />
                    ) : (
                      <span className="h-2 w-2 rounded-[100px] bg-[rgba(59,59,59,0.12)]" />
                    )}
                  </span>
                  {tab.label}
                </button>
              ))}
            </div>

            <div className={FRAME}>
              {hero.tabs.map((tab, index) => (
                <div
                  key={tab.image}
                  className={`${SHOT} ${index === active ? "opacity-100" : "opacity-0"}`}
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
