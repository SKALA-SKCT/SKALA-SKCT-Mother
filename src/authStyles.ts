/**
 * Auth + onboarding surface as Tailwind utilities. These replace the former
 * global `.auth-*` / `.btn` / `.field` / `.welcome-*` classes in index.css.
 *
 * Font sizes always use the arbitrary `text-[Npx]` form — Tailwind's named sizes
 * also set a line-height, which would override the inherited 1.7 from body.
 */

/* --- shell ---------------------------------------------------------------- */

export const AUTH_SHELL = 'flex min-h-[100dvh] items-center justify-center bg-bg px-[30px] py-10';

export const AUTH_CARD =
  'grid w-[min(100%,980px)] grid-cols-[1fr_1fr] overflow-hidden rounded-2xl border-solid ' +
  'border-[1px] border-line bg-surface [box-shadow:var(--shadow-md)]';

export const AUTH_PANEL =
  'relative flex min-h-[560px] flex-col justify-between overflow-hidden px-11 py-12';

export const AUTH_PANEL_BG =
  'absolute inset-0 h-full w-full object-cover [object-position:left_center]';

export const AUTH_PANEL_SCRIM =
  'absolute inset-0 bg-[linear-gradient(160deg,rgba(0,0,0,0.34),rgba(0,0,0,0.06)_62%)]';

export const AUTH_PANEL_TOP = 'relative flex flex-col items-start gap-7';

export const AUTH_PANEL_HOME =
  'inline-flex min-h-[34px] items-center gap-2 rounded-[100px] bg-[rgba(255,255,255,0.16)] ' +
  'px-3 py-[7px] text-[13px] font-semibold leading-[1.4] text-[rgba(255,255,255,0.9)] ' +
  '[backdrop-filter:blur(10px)] [transition:background-color_0.12s_ease,color_0.12s_ease] ' +
  'hover:bg-[rgba(255,255,255,0.24)] hover:text-inverse ' +
  'focus-visible:[outline:2px_solid_rgba(255,255,255,0.6)] focus-visible:[outline-offset:3px]';

export const AUTH_PANEL_HEAD = 'relative max-w-[320px] text-[32px] font-bold leading-[1.35] text-inverse';

export const AUTH_PANEL_CAPTION =
  'relative whitespace-pre-line text-[14px] font-medium leading-[1.6] tracking-[0.02em] ' +
  'text-[rgba(255,255,255,0.78)]';

export const AUTH_FORM_PANEL = 'relative flex flex-col justify-center p-11';

export const AUTH_FORM_PANEL_CENTERED =
  'relative flex flex-col items-center justify-center px-[50px] py-14 text-center';

/* --- help tooltip --------------------------------------------------------- */

/** `group` drives the tooltip's hover/focus-within reveal. */
export const AUTH_HELP = 'group absolute right-6 top-6 z-[2]';

export const AUTH_HELP_BUTTON =
  // border-solid is required: index.css's `button { border: 0 }` sets border-style
  // to none, which would compute every border-width down to 0.
  'grid h-8 w-8 place-items-center rounded-[50%] border-solid border-[1px] border-lineStrong bg-surface p-0 ' +
  'text-[15px] font-bold leading-none text-muted ' +
  '[transition:border-color_0.15s_ease,color_0.15s_ease,background-color_0.15s_ease] ' +
  'hover:border-ink hover:bg-sunken hover:text-ink ' +
  // [outline:none], not outline-none: Tailwind's utility emits
  // `outline: 2px solid transparent` rather than actually removing the outline.
  'focus-visible:border-ink focus-visible:bg-sunken focus-visible:text-ink focus-visible:[outline:none]';

export const AUTH_HELP_TOOLTIP =
  'invisible absolute right-0 top-[42px] w-[300px] rounded-lg border-solid border-[1px] border-line bg-surface ' +
  'p-4 text-left opacity-0 [transform:translateY(-4px)] [box-shadow:var(--shadow-md)] ' +
  '[transition:opacity_0.15s_ease,visibility_0.15s_ease,transform_0.15s_ease] ' +
  'group-hover:visible group-hover:opacity-100 group-hover:[transform:translateY(0)] ' +
  'group-focus-within:visible group-focus-within:opacity-100 group-focus-within:[transform:translateY(0)]';

export const AUTH_HELP_TOOLTIP_STRONG = 'block text-[14px] leading-[1.5]';

export const AUTH_HELP_TOOLTIP_BODY = 'mt-[6px] break-keep text-[12px] leading-[1.7] text-muted';

/* --- form panel copy ------------------------------------------------------ */

export const authTitle = (centered: boolean) =>
  centered
    ? 'mt-[34px] whitespace-pre-line text-[20px] font-medium leading-[1.75] tracking-[0] text-[#555555]'
    : 'mt-7 text-[24px] font-bold leading-[1.4]';

export const AUTH_LEDE = 'mt-[6px] break-keep text-[14px] leading-[1.7] text-muted';

export const authBody = (centered: boolean) => (centered ? 'mt-[46px] w-full' : 'mt-5');

export const authBrand = (centered: boolean) => (centered ? 'self-center' : 'self-start');

/* --- fields --------------------------------------------------------------- */

export const AUTH_BOX = 'flex w-full flex-col gap-[18px]';

export const FIELD = 'flex flex-col gap-[5px]';

export const FIELD_LABEL = 'text-[12px] font-medium leading-[1.5] text-muted';

export const AUTH_INPUT =
  'h-12 w-full rounded-[10px] border-solid border-[1px] border-line bg-surface px-[14px] py-0 ' +
  'text-[15px] leading-[1.5] text-ink ' +
  '[transition:border-color_0.12s_ease,background-color_0.12s_ease] placeholder:text-faint ' +
  'hover:border-lineStrong focus-visible:border-muted ' +
  'focus-visible:[outline:2px_solid_rgba(32,32,32,0.24)] focus-visible:[outline-offset:2px]';

export const AUTH_ERR = 'text-[12px] font-medium leading-[1.5] text-danger';

export const AUTH_OK = 'text-[12px] font-medium leading-[1.5] text-ok';

export const SEGMENTED =
  'grid grid-cols-[repeat(3,1fr)] gap-[6px] rounded-[10px] border-solid border-[1px] border-line bg-sunken p-1';

export const SEGMENT =
  'relative flex min-h-[38px] cursor-pointer items-center justify-center rounded-lg ' +
  'text-[13px] font-semibold text-muted ' +
  'has-[input:checked]:bg-surface has-[input:checked]:text-ink ' +
  'has-[input:checked]:[box-shadow:var(--shadow-sm)]';

/**
 * The old `.auth-box input:hover / :focus-visible / ::placeholder` rules were
 * scoped to the whole box, so they also matched these radios. The states are
 * invisible behind `opacity-0`, but they are carried over so the computed style
 * stays identical.
 */
export const SEGMENT_INPUT =
  'pointer-events-none absolute opacity-0 placeholder:text-faint ' +
  'hover:border-lineStrong focus-visible:border-muted ' +
  'focus-visible:[outline:2px_solid_rgba(32,32,32,0.24)] focus-visible:[outline-offset:2px]';

/* --- buttons --------------------------------------------------------------
 *
 * Each variant is a COMPLETE class string rather than `BTN` plus modifier
 * fragments. Two utilities for the same property in one class attribute are
 * resolved by Tailwind's output order, not by the order they are written — so
 * composing `BTN + BTN_KAKAO` silently kept the base size and border colour.
 * Variants therefore never overlap.
 *
 * Hover filters use mutually exclusive `enabled:` / `disabled:` variants for the
 * same reason: `.btn.primary:hover:not(:disabled)` outranked `.btn:hover` by
 * specificity, which utilities cannot express.
 */
const BTN_BASE =
  'inline-flex cursor-pointer items-center justify-center border-solid border-[1px] px-[14px] py-0 ' +
  '[transition:filter_0.12s_ease,opacity_0.12s_ease,border-color_0.12s_ease] ' +
  'focus-visible:[outline:2px_solid_rgba(32,32,32,0.24)] focus-visible:[outline-offset:2px] ' +
  'disabled:cursor-not-allowed';

const BTN_SIZE = 'min-h-12 gap-2 rounded-[10px] text-[15px] font-semibold';

export const BTN = `${BTN_BASE} ${BTN_SIZE} border-line bg-surface text-ink hover:[filter:brightness(0.98)] disabled:opacity-[0.55]`;

export const BTN_PRIMARY =
  `${BTN_BASE} ${BTN_SIZE} border-transparent bg-skRed text-inverse disabled:opacity-[0.55] ` +
  'enabled:hover:[filter:brightness(0.94)] disabled:hover:[filter:brightness(0.98)]';

export const BTN_BLOCK = 'w-full';

/** The centered (Kakao-first) login enlarges the button and its icon. */
export const BTN_KAKAO_CENTERED =
  `${BTN_BASE} min-h-14 gap-4 rounded-lg text-[16px] font-bold ` +
  'border-transparent bg-kakao text-kakaoText hover:[filter:brightness(0.96)] disabled:opacity-[0.55]';

export const BTN_KAKAO_CENTERED_ICON = 'h-[21px] w-[22px] flex-[0_0_auto]';

/* --- `.row` primitive ----------------------------------------------------- */

export const ROW = 'flex items-center gap-2';

/* --- welcome / link wizard ------------------------------------------------ */

export const WELCOME_SHELL =
  'flex h-[100dvh] items-center justify-center overflow-hidden px-[30px] py-6 ' +
  '[background:linear-gradient(180deg,rgba(255,255,255,0.74),rgba(247,247,245,0.92)),var(--bg)]';

export const WELCOME_CARD =
  'w-[min(100%,940px)] max-h-[calc(100dvh_-_48px)] rounded-2xl border-solid border-[1px] border-line ' +
  'bg-surface px-[42px] py-8 [box-shadow:var(--shadow-md)]';

export const WELCOME_HEAD = 'flex items-center justify-between';

export const WELCOME_BADGE =
  'inline-flex min-h-[30px] items-center rounded-[var(--r-pill)] border-solid border-[1px] ' +
  'border-[color:rgba(25,25,25,0.08)] bg-kakao px-3 text-[12px] font-bold leading-none text-kakaoText';

export const WELCOME_COPY = 'mt-[42px]';

/**
 * The kicker is a `<p>`, so the later `.welcome-copy p` rule outranked
 * `.welcome-kicker` on every property it declared — the red 13px/1.5 never
 * applied, only the bold weight survived. Reproduced as rendered, not as written.
 */
export const WELCOME_KICKER = 'break-keep text-[16px] font-bold leading-[1.75] text-muted';

export const WELCOME_H1 = 'mt-3 text-[36px] font-bold leading-[1.2] tracking-[0] text-ink';

export const WELCOME_COPY_P = 'break-keep text-[16px] leading-[1.75] text-muted';

export const WELCOME_COPY_ROW = 'mt-6 flex items-center justify-between gap-6';

export const WELCOME_GRID = 'mt-7 grid grid-cols-[repeat(2,minmax(0,1fr))] gap-[14px]';

export const WELCOME_ACTIONS = 'mt-5 flex items-center justify-end';

export const WELCOME_CHECK =
  'flex cursor-pointer items-center gap-2 whitespace-nowrap text-[13px] font-semibold ' +
  'leading-[1.5] text-muted has-[input:checked]:text-ink';

export const WELCOME_CHECK_INPUT = 'm-0 h-4 w-4 [accent-color:var(--sk-red)] disabled:cursor-not-allowed';

export const WELCOME_PANEL = 'rounded-[14px] border-solid border-[1px] border-line bg-surface p-[18px]';

export const WELCOME_PANEL_TOP = 'flex items-center justify-between';

export const WELCOME_PANEL_LABEL = 'text-[12px] font-bold leading-[1.5] text-muted';

/** Connected panels lift the status text from faint to muted. */
export const welcomePanelStatus = (connected: boolean) =>
  `text-[12px] font-bold leading-[1.5] ${connected ? 'text-muted' : 'text-faint'}`;

export const WELCOME_PANEL_H2 = 'mt-[14px] text-[18px] font-bold leading-[1.45] tracking-[0] text-ink';

export const WELCOME_PANEL_P = 'mt-2 min-h-6 break-keep text-[13px] leading-[1.65] text-muted';

export const WELCOME_FIELDS = 'mb-[10px] mt-[14px] grid gap-2';

export const WELCOME_FIELDS_INPUT =
  'flex h-[42px] w-full items-center rounded-[10px] border-solid border-[1px] border-line bg-surface px-3 py-0 ' +
  'text-[13px] leading-[1.5] text-ink placeholder:text-faint ' +
  'focus-visible:border-muted focus-visible:[outline:2px_solid_rgba(32,32,32,0.18)] ' +
  'focus-visible:[outline-offset:2px] ' +
  'disabled:cursor-not-allowed disabled:bg-sunken disabled:text-faint';

/**
 * Connect button. The disabled look is deliberately not the generic `.btn`
 * dimming: it goes flat grey at full opacity, and stays red while loading.
 */
export const welcomeConnect = (loading: boolean) =>
  [
    BTN_BASE,
    BTN_SIZE,
    BTN_BLOCK,
    'border-transparent bg-skRed text-inverse hover:[filter:brightness(0.98)] disabled:opacity-100',
    loading
      ? 'disabled:border-transparent disabled:bg-skRed disabled:text-inverse'
      : 'disabled:border-line disabled:bg-[#ececea] disabled:text-muted',
  ].join(' ');

export const WELCOME_LOADING =
  'h-[18px] w-[18px] rounded-[50%] border-solid border-[2px] border-[color:rgba(255,255,255,0.45)] ' +
  'border-t-[color:var(--ink-inverse)] animate-welcome-spin';
