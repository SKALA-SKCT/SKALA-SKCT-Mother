/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        surface: 'var(--surface)',
        ink: 'var(--ink)',
        muted: 'var(--ink-muted)',
        accent: 'var(--accent)',
        line: 'var(--line)',
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
    },
  },
  plugins: [],
};
