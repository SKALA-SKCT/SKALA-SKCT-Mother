"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef } from "react";
import { growth } from "./content";
import styles from "./GrowthSection.module.css";

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** Growth starts once the next section's top is this far up the viewport. */
const GROW_START = 0.88;
/** Scroll distance the card takes to grow into the full-bleed background. */
const GROW_VIEWPORTS = 0.4;
/** Dead zone before the card hands its gradient to the growing backdrop. */
const EPS = 0.004;

export default function GrowthSection() {
  const cardRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLImageElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);
  const darkRef = useRef(false);

  /* Scroll-linked hand-off: as the next section takes the viewport, the card's
     copy fades out and its gradient grows out of the card box into the page
     background. Geometry is interpolated per frame, so it reverses on scroll up. */
  useEffect(() => {
    const card = cardRef.current;
    const bg = bgRef.current;
    const layer = layerRef.current;
    const next = document.getElementById("practice");
    if (!card || !bg || !layer || !next) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      const vw = window.innerWidth;
      const box = card.getBoundingClientRect();
      const target = next.getBoundingClientRect();

      // Geometry only grows on the way in; on the way out it stays full-bleed
      // and the layer simply fades, so nothing shrinks back into a box.
      const p = clamp01((vh * GROW_START - target.top) / (vh * GROW_VIEWPORTS));
      const fade = clamp01(target.bottom / (vh * 0.32));

      // The layer is the card's own gradient, handed over the moment it starts
      // growing: same image, same crop, same box, so only ever one box is drawn.
      // Small epsilon so scroll jitter can't sit exactly on the swap point; the
      // geometry ramp starts from it, so at the swap the layer is pixel-identical
      // to the card box and the hand-over is invisible.
      const live = p > EPS;
      const pg = clamp01((p - EPS) / (1 - EPS));
      const op = live ? fade : 0;
      layer.style.opacity = String(op);
      bg.style.opacity = live ? "0" : "1";

      // Ink inversion follows the backdrop: on once it covers the header, off
      // only once the backdrop has fully faded out.
      if (!darkRef.current && p >= 0.5 && fade >= 0.5) {
        darkRef.current = true;
        document.body.classList.add("scene-dark");
      } else if (darkRef.current && (op <= 0.05 || p <= 0.05)) {
        darkRef.current = false;
        document.body.classList.remove("scene-dark");
      }
      layer.style.top = `${lerp(box.top, 0, pg)}px`;
      layer.style.left = `${lerp(box.left, 0, pg)}px`;
      layer.style.width = `${lerp(box.width, vw, pg)}px`;
      layer.style.height = `${lerp(box.height, vh, pg)}px`;
      layer.style.borderRadius = `${lerp(16, 0, pg)}px`;

      card.style.setProperty("--copy-fade", String(clamp01(1 - p * 2.4)));
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
      darkRef.current = false;
      document.body.classList.remove("scene-dark");
    };
  }, []);

  return (
    <section className={styles.section} id="features">
      <div className={styles.expandLayer} ref={layerRef} aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className={styles.assistBg} src="/assets/growth-bg.png" alt="" />
      </div>

      <div className={styles.container}>
        <h2 className="heading reveal">{growth.title}</h2>

        <div className={styles.row}>
          <article
            className={`reveal ${styles.card} ${styles.assist}`}
            style={{ "--reveal-y": "140px" } as CSSProperties}
            ref={cardRef}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className={styles.assistBg} src="/assets/growth-bg.png" alt="" aria-hidden="true" ref={bgRef} />

            <div className={styles.assistTop}>
              <p className={styles.tag}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/assets/growth-icon.svg" alt="" width={32} height={32} />
                {growth.assist.eyebrow}
              </p>
              <h3 className={styles.assistHeadline}>{growth.assist.headline}</h3>
            </div>

            <div className={styles.bubbles}>
              {growth.assist.prompts.map((prompt) => (
                <span className={styles.bubble} key={prompt}>
                  {prompt}
                </span>
              ))}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
