import type { CSSProperties } from "react";
import { workflow } from "./content";
import { HEADING } from "../styleTokens";

/* Reference: section padding 80/30/0, container gap 48, four equal columns
   with 1px left dividers, title on top and body pinned to the bottom. */
export default function WorkflowSection() {
  return (
    <section className="flex justify-center px-[30px] pb-0 pt-[200px]">
      <div className="flex w-full max-w-[1200px] flex-col items-center gap-[140px]">
        <h2 className={`reveal text-center ${HEADING}`}>{workflow.title}</h2>

        {/* grid-cols-[1fr] rather than grid-cols-1: Tailwind's scale emits
            minmax(0,1fr), which can shrink below min-content. */}
        <div className="flex w-full max-[767.98px]:grid max-[767.98px]:grid-cols-[1fr] max-[767.98px]:gap-7">
          {workflow.steps.map((step, index) => (
            <article
              className="reveal flex min-h-[264px] w-px flex-[1_0_0] flex-col justify-between gap-10 border-l-[1px] border-l-[color:rgba(59,59,59,0.12)] px-8 max-[1199.98px]:min-h-[210px] max-[1199.98px]:px-5 max-[767.98px]:min-h-0 max-[767.98px]:w-auto max-[767.98px]:gap-3 max-[767.98px]:py-0 max-[767.98px]:pl-5 max-[767.98px]:pr-0"
              style={{ "--reveal-y": "72px", "--reveal-delay": `${index * 80}ms` } as CSSProperties}
              key={`${index}-${step.title}`}
            >
              <h3 className="max-w-[158px] whitespace-pre-line text-[24px] font-medium leading-[1.4] tracking-[-0.5px] max-[767.98px]:max-w-none">
                {step.title}
              </h3>
              <p className="whitespace-pre-line text-[16px] leading-[1.7] text-muted">{step.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
