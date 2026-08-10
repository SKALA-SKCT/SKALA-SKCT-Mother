"use client";

import { useEffect, useRef, useState } from "react";
import { dataPlatform } from "./content";
import { HEADING } from "../styleTokens";

/* Ink inversion for the dimmed scene, scoped to this section only. */
const SECTION =
  "flex justify-center px-[30px] pb-0 pt-[180px] max-[1199.98px]:pt-[128px] " +
  "[body.scene-dark_&]:text-[#f5f5f3] [body.scene-dark_&]:[--ink:#f5f5f3] " +
  "[body.scene-dark_&]:[--ink-muted:rgba(245,245,243,0.64)]";

/** The ink inversion is animated, so the text nodes carry the colour transition. */
const INK_FADE = "[transition:color_0.3s_ease]";

const COPY_ITEM =
  "flex flex-col justify-center min-h-[58vh] " +
  "[transition:opacity_0.45s_ease,transform_0.45s_cubic-bezier(0.2,0.7,0.2,1)] " +
  "max-[1199.98px]:min-h-0 max-[1199.98px]:opacity-100 max-[1199.98px]:[transform:none]";

// `--brand-red` is never declared, so these fall back to the inherited ink. Kept
// verbatim rather than "fixed" — changing it would change the rendering.
const EYEBROW =
  "inline-flex items-center gap-3 mb-7 text-[12px] font-bold leading-none tracking-[0.18em] " +
  "text-[color:var(--brand-red)] before:content-[''] before:h-px before:w-[42px] before:bg-current";

const BULLET =
  "flex items-center gap-3 before:content-['✓'] before:inline-flex before:items-center " +
  "before:justify-center before:h-[18px] before:w-[18px] before:rounded-[999px] " +
  "before:bg-[rgba(234,0,44,0.1)] before:text-[11px] before:font-extrabold " +
  "before:text-[color:var(--brand-red)]";
const SCREEN =
  "absolute left-0 top-0 z-[1] aspect-[1.62] w-full overflow-hidden rounded-2xl border border-[color:rgba(59,59,59,0.08)] bg-white " +
  "[box-shadow:0_28px_80px_rgba(0,0,0,0.1),0_2px_8px_rgba(0,0,0,0.05)] " +
  "[transition:opacity_0.55s_ease,transform_0.55s_cubic-bezier(0.2,0.7,0.2,1)]";

export default function DataPlatformSection() {
  const [active, setActive] = useState(0);
  const itemRefs = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    const items = itemRefs.current.filter(Boolean) as HTMLElement[];
    if (!items.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const next = Number((visible.target as HTMLElement).dataset.index);
        if (!Number.isNaN(next)) setActive(next);
      },
      { root: null, threshold: [0.35, 0.5, 0.65], rootMargin: "-28% 0px -28% 0px" },
    );
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return (
    <section className={SECTION} id="practice">
      <div className="flex w-full max-w-[1200px] flex-col items-center gap-[92px] max-[1199.98px]:gap-[72px] max-[767.98px]:gap-[54px]">
        <h2 className={`reveal w-[569px] max-w-full text-center ${HEADING} ${INK_FADE}`}>
          {dataPlatform.title.split("\n").map((line) => (
            <span className="block whitespace-nowrap" key={line}>
              {line}
            </span>
          ))}
        </h2>

        <div className="grid w-full grid-cols-[minmax(260px,0.55fr)_minmax(600px,1.75fr)] [align-items:start] gap-16 max-[1199.98px]:grid-cols-[1fr] max-[1199.98px]:gap-11">
          <div className="flex flex-col gap-[34vh] px-0 pb-[12vh] pt-[6vh] max-[1199.98px]:order-2 max-[1199.98px]:gap-[42px] max-[1199.98px]:p-0">
            {dataPlatform.features.map((feature, index) => (
              <article
                className={`${COPY_ITEM} ${index === active ? "opacity-100 [transform:translateY(-32px)]" : "opacity-[0.28] [transform:translateY(16px)]"}`}
                data-index={index}
                ref={(node) => { itemRefs.current[index] = node; }}
                key={feature.title}
              >
                <span className={EYEBROW}>{feature.eyebrow}</span>
                <h3
                  className={`text-[clamp(40px,4.6vw,62px)] leading-[1.1] tracking-[-0.04em] [font-weight:650] max-[767.98px]:text-[34px] ${INK_FADE}`}
                >
                  {feature.title.split("\n").map((line) => (
                    <span className="block" key={line}>
                      {line}
                    </span>
                  ))}
                </h3>
                <p
                  className={`mt-8 max-w-[430px] text-[18px] leading-[1.75] tracking-[-0.02em] text-muted max-[767.98px]:mt-5 max-[767.98px]:text-[16px] ${INK_FADE}`}
                >
                  {feature.body.split("\n").map((line) => (
                    <span className="block" key={line}>
                      {line}
                    </span>
                  ))}
                </p>
                <ul className="mt-11 flex flex-col gap-4 text-[16px] leading-[1.5] text-ink max-[767.98px]:mt-7">
                  {feature.bullets.map((bullet) => (
                    <li className={`${BULLET} ${INK_FADE}`} key={bullet}>
                      {bullet}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <div className="sticky top-[132px] flex min-h-[calc(100vh_-_160px)] items-center max-[1199.98px]:relative max-[1199.98px]:top-auto max-[1199.98px]:order-1 max-[1199.98px]:min-h-0" aria-hidden="true">
            <div className="relative aspect-[1.62] w-[min(1120px,78vw)] overflow-visible [transform:translate(0,-58px)] max-[1199.98px]:mx-auto max-[1199.98px]:max-w-[720px] max-[1199.98px]:[transform:none]">
              {dataPlatform.features.map((feature, index) => (
                <div className={`${SCREEN} ${index === active ? "opacity-100 [transform:translateY(0)_scale(1)]" : "pointer-events-none opacity-0 [transform:translateY(18px)_scale(0.985)]"}`} key={feature.title}>
                  <video
                    className="h-full w-full object-cover"
                    src={feature.video}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload={index === 0 ? "auto" : "metadata"}
                    onLoadedMetadata={(event) => {
                      event.currentTarget.defaultPlaybackRate = 2;
                      event.currentTarget.playbackRate = 2;
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
