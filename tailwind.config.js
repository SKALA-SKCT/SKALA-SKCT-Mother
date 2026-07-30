/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#f6f7f9',
        surface: '#ffffff',
        surface2: '#f0f2f5',
        border: '#e2e5ea',
        text: '#1a1d23',
        muted: '#6b7280',
        primary: '#2f6bff',
        danger: '#e5484d',
        ok: '#2fa84f',
        kakao: '#fee500',
        kakaoText: '#191600',
      },
      boxShadow: {
        soft: '0 1px 3px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.04)',
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Apple SD Gothic Neo',
          'Malgun Gothic',
          'Roboto',
          'sans-serif',
        ],
      },
    },
  },
  plugins: [],
};
