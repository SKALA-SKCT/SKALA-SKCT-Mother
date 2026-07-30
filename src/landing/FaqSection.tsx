"use client";

import type { CSSProperties } from "react";
import { useId, useState } from "react";
import { faqs } from "./content";
import { HEADING } from "../styleTokens";

const ITEM =
  "flex flex-col gap-0 overflow-hidden rounded-2xl border-[1px] bg-surface p-0 " +
  "[transition:background-color_0.25s_ease,border-color_0.25s_ease] " +
  // The delay rides inside the shorthand: a separate animation-delay utility
  // could be emitted before `animation`, which would reset it to 0.
  "[animation:faq-rise_1.05s_cubic-bezier(0.16,0.82,0.18,1)_var(--faq-delay,0ms)_both]";

const ANSWER =
  "grid overflow-hidden px-6 py-0 " +
  "[transition:grid-template-rows_0.62s_cubic-bezier(0.18,0.72,0.18,1),padding-bottom_0.62s_cubic-bezier(0.18,0.72,0.18,1),opacity_0.35s_ease]";

export default function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();

  return (
    <section className="flex justify-center px-[30px] pb-[30px] pt-[128px]">
      <div className="flex min-h-[820px] w-full max-w-[1200px] flex-col items-center rounded-2xl bg-transparent px-10 pb-[122px] pt-[92px] max-[767.98px]:px-5 max-[767.98px]:pb-16 max-[767.98px]:pt-10">
        <div className="flex w-full max-w-[790px] flex-col items-center gap-14">
          <h2 className={`${HEADING} [animation:faq-rise_0.95s_cubic-bezier(0.16,0.82,0.18,1)_both]`}>
            자주 묻는 질문
          </h2>

          <div className="flex w-full flex-col gap-4">
            {faqs.map((faq, index) => {
              const isOpen = open === index;
              const panelId = `${baseId}-panel-${index}`;

              return (
                <div
                  className={`${ITEM} ${
                    isOpen ? "border-transparent" : "border-[color:rgba(59,59,59,0.12)]"
                  }`}
                  style={{ "--faq-delay": `${index * 80}ms` } as CSSProperties}
                  key={faq.q}
                >
                  <button
                    type="button"
                    className="flex w-full items-start justify-between gap-2.5 p-6 text-left text-[18px] font-semibold leading-[1.7] tracking-[-0.5px]"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? null : index)}
                  >
                    {faq.q}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      /* The asset points up, so the collapsed row is the flipped one. */
                      className={`h-6 w-6 flex-none [transition:transform_0.55s_cubic-bezier(0.2,0.7,0.2,1)] ${
                        isOpen ? "[transform:rotate(0deg)]" : "[transform:rotate(180deg)]"
                      }`}
                      src="/assets/faq-icon.svg"
                      alt=""
                      width={24}
                      height={25}
                    />
                  </button>

                  <div
                    id={panelId}
                    className={`${ANSWER} ${
                      isOpen ? "grid-rows-[1fr] pb-7 opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                    aria-hidden={!isOpen}
                  >
                    <p className="max-w-[640px] overflow-hidden whitespace-pre-line text-[16px] leading-[1.7] text-muted">
                      {faq.a}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
