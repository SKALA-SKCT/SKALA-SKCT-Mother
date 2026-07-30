import BrandMark from "./BrandMark";
import { nav } from "./content";
import { CONTAINER } from "../styleTokens";
import { useAuth } from "../auth";

/* Follows the scene dimming set by DataPlatformSection. The `body.scene-dark`
   variants override the ink tokens on the header itself, so no other section is
   affected. The header goes fully transparent in the dark scene so the backdrop
   reads as one continuous surface. */
const HEADER =
  "sticky top-0 z-[60] bg-[rgba(247,247,245,0.86)] " +
  "[backdrop-filter:blur(18px)_saturate(160%)] [transition:background-color_0.3s_ease] " +
  "[body.scene-dark_&]:bg-transparent [body.scene-dark_&]:[backdrop-filter:none] " +
  "[body.scene-dark_&]:[--ink:#f5f5f3] [body.scene-dark_&]:[--ink-inverse:#131313]";

const LOGIN =
  "inline-flex min-h-[38px] items-center justify-center rounded-[10px] bg-ink px-[18px] py-[6px] " +
  "leading-[1.7] text-inverse [transition:background-color_0.25s_ease,transform_0.25s_ease] " +
  "hover:bg-skRed hover:[transform:translateY(-1px)] max-[900px]:hidden";

export default function SiteHeader() {
  const { user, loading, logout } = useAuth();

  return (
    <header className={HEADER}>
      <div
        className={`${CONTAINER} grid h-[68px] grid-cols-[1fr_auto_1fr] items-center gap-6 max-[900px]:h-auto max-[900px]:grid-cols-[1fr_auto] max-[900px]:py-[18px]`}
      >
        <a className="justify-self-start" href="#top" aria-label="SKALA-SKCT 홈">
          <BrandMark />
        </a>

        <nav className="flex items-center gap-[34px] text-[16px] font-normal leading-[1.7] max-[900px]:hidden">
          {nav.links.map((link) => (
            <a
              className="text-ink [transition:color_0.25s_ease] hover:text-skRed"
              key={link.href}
              href={link.href}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center justify-self-end gap-[18px] text-[16px] font-normal max-[900px]:gap-3">
          {!loading && user ? (
            <>
              <span className="whitespace-nowrap text-ink">{user.nick}님</span>
              <a className={LOGIN} href="/settings">
                설정
              </a>
              <button className={LOGIN} type="button" onClick={logout}>
                로그아웃
              </button>
            </>
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
