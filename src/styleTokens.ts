/**
 * Type scale as Tailwind utilities — mirrors the reference's Framer text presets
 * exactly. These replace the former global `.display` / `.heading` / … classes in
 * index.css; keeping them as one shared constant means the responsive steps are
 * written once instead of being re-transcribed at every call site.
 *
 *   display 90/72/42 · heading 44/35/28 · subheading 36/30/26
 *   title 24 (fixed) · counter 40/36/30 · body 16 · lede 18
 *
 * Font sizes use the arbitrary `text-[Npx]` form on purpose: Tailwind's named
 * sizes (`text-lg`, …) also set a line-height, which would silently override the
 * inherited 1.7 from body.
 */
export const DISPLAY =
  'text-[90px] font-medium leading-none tracking-[-4px] ' +
  'max-[1199.98px]:text-[72px] max-[1199.98px]:tracking-[-3px] ' +
  'max-[767.98px]:text-[42px] max-[767.98px]:tracking-[-1.6px]';

export const HEADING =
  'text-[44px] font-bold leading-[1.2] tracking-[-1.8px] ' +
  'max-[1199.98px]:text-[35px] max-[1199.98px]:tracking-[-1.2px] ' +
  'max-[767.98px]:text-[28px] max-[767.98px]:tracking-[-1px]';

export const SUBHEADING =
  'text-[36px] font-medium leading-[1.4] tracking-[-1px] ' +
  'max-[1199.98px]:text-[30px] max-[1199.98px]:tracking-[-0.6px] ' +
  'max-[767.98px]:text-[26px] max-[767.98px]:tracking-[-0.8px]';

export const TITLE = 'text-[24px] font-medium leading-[1.4] tracking-[-0.5px]';

export const COUNTER =
  'text-[40px] font-semibold leading-[1.4] tracking-[-1px] ' +
  'max-[1199.98px]:text-[36px] max-[767.98px]:text-[30px]';

export const LEDE = 'text-[18px] leading-[1.7] tracking-[-0.5px] text-muted';

export const BODY_SM = 'text-[16px] leading-[1.7] text-muted';

/**
 * `.container` — page gutter primitive.
 *
 * The `max-w-*` steps are not decoration: the old global `.container` class also
 * matched Tailwind's built-in `.container` component, so it inherited Tailwind's
 * breakpoint max-widths on top of its own `width`. Those actually clamp the box in
 * the 689–767 / 817–1023 / 1073–1279px bands.
 *
 * Use CONTAINER_BASE when the call site sets its own `max-w-*`. Tailwind's
 * `.container` lived in the components layer, so a plain `max-w-[560px]` utility
 * beat it at every width; as breakpoint variants these steps would instead beat
 * the utility, which is the opposite of the original behaviour.
 */
export const CONTAINER_BASE = 'mx-auto w-[min(var(--container),calc(100vw_-_2_*_var(--gutter)))]';

export const CONTAINER =
  `${CONTAINER_BASE} ` +
  'sm:max-w-[640px] md:max-w-[768px] lg:max-w-[1024px] xl:max-w-[1280px] 2xl:max-w-[1536px]';
