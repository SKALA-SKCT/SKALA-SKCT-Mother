import type { CSSProperties } from "react";
import { bottomCta } from "./content";

/* Full-bleed striped gradient band, no rounding — matches the reference. */
export default function BottomCta() {
  return (
    <section className="relative flex min-h-[620px] items-center justify-center overflow-hidden px-[30px] py-[180px] max-[767.98px]:min-h-[420px] max-[767.98px]:px-5 max-[767.98px]:py-[110px]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="absolute inset-0 h-full w-full object-cover object-center"
        src="/assets/cta-bg.png"
        alt=""
        aria-hidden="true"
      />

      <div className="relative flex w-full max-w-[715px] flex-col items-center gap-6 text-center text-inverse">
        <div className="flex flex-col items-center gap-4">
          <h2
            className="reveal text-[clamp(46px,5.1vw,86px)] font-bold leading-[1.08] tracking-[-2.8px]"
            style={{ "--reveal-y": "70px" } as CSSProperties}
          >
            {bottomCta.title.split("\n").map((line) => (
              <span className="block" key={line}>
                {line}
              </span>
            ))}
          </h2>
        </div>
      </div>
    </section>
  );
}
