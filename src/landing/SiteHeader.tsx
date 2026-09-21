import BrandMark from "./BrandMark";
import { nav } from "./content";
import { CONTAINER } from "../styleTokens";
import { useAuth } from "../auth";
import { useState } from "react";

const HEADER =
  "sticky top-0 z-[60] bg-[rgba(250,250,249,0.86)] " +
  "[backdrop-filter:blur(18px)_saturate(160%)] [transition:background-color_0.3s_ease]";

const NAV_LINK = "text-ink [transition:color_0.25s_ease] hover:text-skRed";
const ACTIVE_NAV_LINK = "text-skRed";

/** 아직 열리지 않은 메뉴. `button { font: inherit; color: inherit }`가 index.css에
    있어 링크와 같은 타이포로 렌더된다. */
const showPending = () => window.alert("서비스 준비 중입니다!");

const LOGIN =
  "inline-flex min-h-[34px] items-center justify-center rounded-[10px] border border-black/10 bg-white px-[13px] py-[7px] " +
  "text-[14px] font-semibold leading-none text-ink [transition:background-color_0.2s_ease] " +
  "hover:bg-black/[0.03] max-[900px]:hidden";

export default function SiteHeader() {
  const { user, loading, logout } = useAuth();
  const [accountOpen, setAccountOpen] = useState(false);

  return (
    <header className={HEADER}>
      <div
        className={`${CONTAINER} grid h-[68px] grid-cols-[1fr_auto_1fr] items-center gap-6 max-[900px]:h-auto max-[900px]:grid-cols-[1fr_auto] max-[900px]:py-[18px]`}
      >
        <a className="flex items-center justify-self-start" href="#top" aria-label="SKALA-SKCT 홈">
          <BrandMark />
        </a>

        <nav className="flex items-center gap-[34px] text-[16px] font-normal leading-[1.7] max-[900px]:hidden">
          {nav.links.map((link) =>
            link.pending ? (
              <button className={NAV_LINK} key={link.label} type="button" onClick={showPending}>
                {link.label}
              </button>
            ) : (
              <a
                className={`${NAV_LINK} ${link.label === "홈" ? ACTIVE_NAV_LINK : ""}`}
                key={link.label}
                href={link.href}
                aria-current={link.label === "홈" ? "page" : undefined}
              >
                {link.label}
              </a>
            ),
          )}
        </nav>

        <div className="flex items-center justify-self-end gap-[18px] text-[16px] font-normal max-[900px]:gap-3">
          {!loading && user ? (
            <div
              className="group relative max-[900px]:hidden"
              onMouseEnter={() => setAccountOpen(true)}
              onMouseLeave={() => setAccountOpen(false)}
            >
              <button
                className={LOGIN}
                type="button"
                aria-haspopup="menu"
                aria-expanded={accountOpen}
                onClick={() => setAccountOpen((open) => !open)}
              >
                {user.nick}님
              </button>
              <div
                className={`absolute right-0 top-full z-[70] min-w-[132px] pt-2 text-[14px] text-[#202020] transition ${
                  accountOpen
                    ? "visible translate-y-0 opacity-100"
                    : "invisible -translate-y-1 opacity-0"
                }`}
                role="menu"
              >
                <div className="rounded-[12px] border border-black/10 bg-white p-1 shadow-[0_14px_32px_rgba(0,0,0,0.14)]">
                  <button
                    className="block w-full rounded-[9px] px-3 py-2 text-left hover:bg-black/[0.04]"
                    type="button"
                    role="menuitem"
                    onClick={logout}
                  >
                    로그아웃
                  </button>
                  <button
                    className="block w-full cursor-default rounded-[9px] px-3 py-2 text-left text-[#9a9a9a]"
                    type="button"
                    role="menuitem"
                    tabIndex={-1}
                    aria-disabled="true"
                    onClick={(event) => event.preventDefault()}
                  >
                    회원탈퇴
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <a className={LOGIN} href={nav.login.href}>
              {nav.login.label}
            </a>
          )}
        </div>
      </div>
    </header>
  );
}
