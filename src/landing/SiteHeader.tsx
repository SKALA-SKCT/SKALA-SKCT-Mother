import BrandMark from "./BrandMark";
import { nav } from "./content";
import { CONTAINER } from "../styleTokens";
import { useAuth } from "../auth";
import { useState } from "react";

/* Follows the scene dimming set by DataPlatformSection. The `body.scene-dark`
   variants override the ink tokens on the header itself, so no other section is
   affected. The header goes fully transparent in the dark scene so the backdrop
   reads as one continuous surface. */
const HEADER =
  "sticky top-0 z-[60] bg-[rgba(247,247,245,0.86)] " +
  "[backdrop-filter:blur(18px)_saturate(160%)] [transition:background-color_0.3s_ease] " +
  "[body.scene-dark_&]:bg-transparent [body.scene-dark_&]:[backdrop-filter:none] " +
  "[body.scene-dark_&]:[--ink:#f5f5f3] [body.scene-dark_&]:[--ink-inverse:#131313]";

const NAV_LINK = "text-ink [transition:color_0.25s_ease] hover:text-skRed";

/** 아직 열리지 않은 메뉴. `button { font: inherit; color: inherit }`가 index.css에
    있어 링크와 같은 타이포로 렌더된다. */
const showPending = () => window.alert("준비중입니다!");

const LOGIN =
  "inline-flex min-h-[38px] items-center justify-center rounded-[10px] bg-ink px-[18px] py-[6px] " +
  "leading-[1.7] text-inverse [transition:background-color_0.25s_ease,transform_0.25s_ease] " +
  "hover:bg-skRed hover:[transform:translateY(-1px)] max-[900px]:hidden";

export default function SiteHeader() {
  const { user, loading, logout } = useAuth();
  const [accountOpen, setAccountOpen] = useState(false);

  return (
    <header className={HEADER}>
      <div
        className={`${CONTAINER} grid h-[68px] grid-cols-[1fr_auto_1fr] items-center gap-6 max-[900px]:h-auto max-[900px]:grid-cols-[1fr_auto] max-[900px]:py-[18px]`}
      >
        <a className="justify-self-start" href="#top" aria-label="SKALA-SKCT 홈">
          <BrandMark />
        </a>

        <nav className="flex items-center gap-[34px] text-[16px] font-normal leading-[1.7] max-[900px]:hidden">
          {nav.links.map((link) =>
            link.pending ? (
              <button className={NAV_LINK} key={link.label} type="button" onClick={showPending}>
                {link.label}
              </button>
            ) : (
              <a className={NAV_LINK} key={link.label} href={link.href}>
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
