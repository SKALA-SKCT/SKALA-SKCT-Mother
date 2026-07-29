// 자식 앱 URL. 배포 시 Vite 환경변수(VITE_MOCK_URL / VITE_PRACTICE_URL)로 덮어쓸 수 있다.
// 기본값은 로컬 서브도메인 테스트(hosts + Caddy) 기준.
export const MOCK_URL = import.meta.env.VITE_MOCK_URL ?? 'http://mock.skct.local';
export const PRACTICE_URL = import.meta.env.VITE_PRACTICE_URL ?? 'http://practice.skct.local';
