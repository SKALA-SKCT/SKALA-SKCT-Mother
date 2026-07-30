import BrandMark from "./BrandMark";
import { HEADING } from "../styleTokens";

/**
 * Below the desktop breakpoint the landing is replaced by this notice.
 * CSS-only gate (see index.css) so it works without JS and cannot mismatch
 * on hydration — nothing here depends on measuring the viewport.
 *
 * Uses the landing's base surface and type scale — no gradient plate, since a
 * full-screen stretch of the marketing gradient reads as noise here.
 *
 * `hidden` is the default state; the `[data-desktop-gate]` rule in index.css
 * swaps in `display: flex` below the breakpoint.
 */
export default function DesktopOnly() {
  return (
    <div
      className="hidden min-h-screen items-center justify-center bg-bg px-[30px] py-20 max-[767.98px]:px-5 max-[767.98px]:py-16"
      data-desktop-gate
    >
      <div className="flex w-full max-w-[520px] flex-col items-center text-center">
        <div className="mb-11 max-[767.98px]:mb-8">
          <BrandMark />
        </div>

        <p className="inline-flex items-center gap-3 text-[12px] font-bold uppercase leading-none tracking-[0.18em] text-skRed before:h-px before:w-7 before:bg-current before:opacity-50 before:content-[''] after:h-px after:w-7 after:bg-current after:opacity-50 after:content-['']">
          Desktop Only
        </p>

        <h1 className={`mt-5 ${HEADING}`}>
          <span className="block whitespace-nowrap">데스크탑에서</span>
          <span className="block whitespace-nowrap">확인해 주세요</span>
        </h1>

        <p className="mt-[18px] max-w-[420px] break-keep text-[18px] leading-[1.7] tracking-[-0.5px] text-muted max-[767.98px]:mt-[14px] max-[767.98px]:text-[16px]">
          긴 지문과 표, 자료 이미지, 결과 차트를 한 화면에서 봐야 해서
          모바일 화면은 지원하지 않아요.
        </p>

        <div className="mt-9 flex w-full flex-col gap-1 rounded-2xl border-[1px] border-line bg-surface px-6 py-[18px] max-[767.98px]:mt-7 max-[767.98px]:px-[18px] max-[767.98px]:py-4">
          <p className="text-[14px] font-semibold leading-[1.7]">권장 환경</p>
          <p className="text-[14px] leading-[1.7] text-muted">가로 1200px 이상 · Chrome, Edge, Safari</p>
        </div>
      </div>
    </div>
  );
}
