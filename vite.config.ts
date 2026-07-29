import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// 마더 앱은 인증 백엔드가 Cloudflare Pages Functions(functions/)에 있으므로,
// 인증 흐름 로컬 테스트는 `npm run pages:dev`(wrangler)로 하세요.
// 순수 `npm run dev`(Vite)는 SPA 렌더링 확인용이며 /api/* 는 동작하지 않습니다.
export default defineConfig({
  plugins: [react()],
  server: { port: 5170 },
});
