import type { CSSProperties } from "react";
import { opportunity } from "./content";
import { HEADING, TITLE } from "../styleTokens";

const TILE_TRANSITION = "[transition:transform_0.4s_cubic-bezier(0.2,0.7,0.2,1)]";

/* Reference: section padding 132/30/0, container gap 48 (max 1200),
   white panel radius 16 padding 104px 78px, 2x2 grid gap 40/24. */
export default function OpportunitySection() {
  return (
    <section
      className="flex justify-center px-[30px] pb-0 pt-[200px] max-[1199.98px]:pt-[128px]"
      id="types"
    >
      <div className="flex w-full max-w-[1200px] flex-col items-center gap-12">
        <div className="flex w-full flex-col items-center gap-16 rounded-2xl bg-surface px-[78px] py-[104px] max-[1199.98px]:gap-12 max-[1199.98px]:px-8 max-[1199.98px]:py-14 max-[767.98px]:px-5 max-[767.98px]:py-10">
          <h2
            className={`reveal max-w-[464px] text-center ${HEADING}`}
            style={{ "--reveal-y": "70px" } as CSSProperties}
          >
            {opportunity.title.split("\n").map((line) => (
              <span className="block whitespace-nowrap" key={line}>
                {line}
              </span>
            ))}
          </h2>

          <div className="grid w-full grid-cols-[repeat(2,minmax(50px,1fr))] gap-x-6 gap-y-10 max-[767.98px]:grid-cols-[1fr] max-[767.98px]:gap-8">
            {opportunity.items.map((item, index) => (
              <article
                className="reveal group flex flex-col gap-6"
                style={{ "--reveal-y": "72px", "--reveal-delay": `${index * 80}ms` } as CSSProperties}
                key={item.title}
              >
                <div className={`relative flex aspect-[1.14607] w-full items-center justify-center overflow-hidden rounded-xl ${TILE_TRANSITION}`}>
                  <img className="absolute inset-0 h-full w-full object-cover" src="/assets/opp-bg.png" alt="" aria-hidden="true" />
                  <div className={`reveal-tile relative flex aspect-[1.35] w-[76%] items-center justify-center overflow-hidden rounded-2xl border border-[color:rgba(59,59,59,0.08)] bg-white ${TILE_TRANSITION} group-hover:[transform:translateY(-10px)_scale(1.03)]`}>
                    <img
                      className="h-full w-full object-contain"
                      src={item.image}
                      alt={`${item.title} 서비스 화면`}
                    />
                  </div>
                </div>
                <div className="flex max-w-[430px] flex-col gap-2.5">
                  <h3 className={TITLE}>{item.title}</h3>
                  <p className="whitespace-pre-line text-[16px] leading-[1.7] text-muted">{item.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
