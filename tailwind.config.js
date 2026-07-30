/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        surface: 'var(--surface)',
        sunken: 'var(--surface-sunken)',
        ink: 'var(--ink)',
        muted: 'var(--ink-muted)',
        faint: 'var(--ink-faint)',
        inverse: 'var(--ink-inverse)',
        accent: 'var(--accent)',
        accentSoft: 'var(--accent-soft)',
        skRed: 'var(--sk-red)',
        lime: 'var(--lime)',
        line: 'var(--line)',
        lineStrong: 'var(--line-strong)',
        danger: 'var(--danger)',
        ok: 'var(--ok)',
        kakao: 'var(--kakao)',
        kakaoText: 'var(--kakao-text)',
      },
      fontFamily: {
        sans: [
          '"Pretendard Variable"',
          'Pretendard',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Apple SD Gothic Neo"',
          '"Noto Sans KR"',
          'system-ui',
          'sans-serif',
        ],
      },
      keyframes: {
        // Travel is -50% because the partner list is duplicated to loop seamlessly.
        marquee: { to: { transform: 'translateX(-50%)' } },
        'welcome-spin': { to: { transform: 'rotate(360deg)' } },
      },
      animation: {
        // Duration scales with the list length so the travel speed stays put —
        // 16 logos at the old 32s would run ~2.7x faster.
        marquee: 'marquee 84s linear infinite',
        'welcome-spin': 'welcome-spin 0.75s linear infinite',
      },
    },
  },
  plugins: [],
};
