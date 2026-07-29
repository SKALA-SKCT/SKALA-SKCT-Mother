# SKCT 통합(마더) — 아키텍처 & 실행 가이드

세 앱을 하나의 상위 도메인 아래 서브도메인으로 묶고, **로그인 1회로 모두** 쓰게 한다.
신규 가입은 **카카오 전용**, 기존 유저는 **기존 아이디/비번**(별도 UI)으로 로그인한다. 이메일 인증은 없다.

```
example.com
├── www.example.com       → 마더(이 앱, Vite+CF Pages Functions): 랜딩 + 카카오/레거시 로그인 + 계정연결
├── mock.example.com      → skct(Next/Vercel): 모의고사. 공유 JWT만 신뢰
└── practice.example.com  → skala-skct(Vite/CF): 연습앱. 공유 JWT만 신뢰
```

## 세션 계약(핵심)

- 쿠키: **`skct_session`**, `Domain=.example.com`, `HttpOnly`, `SameSite=Lax`, (배포)`Secure`.
- 값: **HS256 JWT**(마더가 `SESSION_SECRET`로 서명). skct=`jose`, skala=Web Crypto로 **오프라인 서명 검증만**.
- 클레임: `sub`(`kakao:<id>`|`skct:<userId>`|`skala:<nick>`), `nick`, `skctUserId?`, `skalaHandle?`, `admin?`, `exp`.
- 자식 앱은 클레임으로 자기 데이터를 찾는다: skct=`skctUserId`(없으면 `sub`로 users upsert), skala=`skalaHandle`(없으면 `sub`가 handle).

로그인/카카오 OAuth/레거시 검증/계정연결은 **오직 마더**. 자식 앱은 로그인 UI가 없고, 미인증이면 마더 `/login?redirect=<자기 URL>`로 보낸다.

## 로그인 종류

- **신규(카카오)**: 마더 `/login` → `카카오로 로그인` → `/api/auth/kakao/callback` → `AUTH_KV`에 계정 생성 → JWT 발급.
- **기존(레거시)**: 마더 `/login/legacy`(별도 UI) → `/api/auth/legacy-login`
  - skct 계정: 마더가 `mock`의 `/api/auth/legacy-verify`(shared secret, bcrypt)에 위임.
  - skala 계정: 마더가 skala의 `SKCT_KV`(`usr:*`)를 읽어 PBKDF2 대조.
- **계정 연결**(마더 `/settings`, 카카오 로그인 상태): 옛 skct/skala 아이디·비번 1회 확인 → `AUTH_KV` 계정에 `skctUserId`/`skalaHandle` 부착 → 세션 재발급. 데이터가 한 계정으로 수렴(자동 병합 없음).

## 환경변수 / 시크릿

| 변수 | 마더(www) | skct(mock) | skala(practice) |
|---|:---:|:---:|:---:|
| `SESSION_SECRET`(32자+, **세 앱 동일**) | ✅ | ✅ | ✅ |
| `SESSION_COOKIE_DOMAIN`(`.example.com`) | ✅ | ✅ | ✅ |
| `KAKAO_CLIENT_ID` / `KAKAO_CLIENT_SECRET` | ✅ | | |
| `KAKAO_REDIRECT_URI`(`https://www.example.com/api/auth/kakao/callback`) | ✅ | | |
| `SKCT_LEGACY_VERIFY_URL`(`https://mock.example.com/api/auth/legacy-verify`) | ✅ | | |
| `SKCT_LEGACY_VERIFY_SECRET`(**마더·skct 동일**) | ✅ | ✅ | |
| `DATABASE_URL` | | ✅ | |
| `NEXT_PUBLIC_MOTHER_URL`(`https://www.example.com`) | | ✅ | |
| `NEXT_PUBLIC_SKCT_URL`(`https://mock.example.com`) | | ✅ | |
| `ADMIN_NICK`(선택) | | | ✅ |
| `GEMINI_API_KEY`(OCR) | | | ✅ |
| `VITE_MOTHER_URL`(빌드타임) | | | ✅ |
| `VITE_MOCK_URL` / `VITE_PRACTICE_URL`(빌드타임) | ✅ | | |
| KV 바인딩 | `AUTH_KV`(신규) + `SKCT_KV`(skala 것) | | `SKCT_KV` |

Cloudflare 시크릿: `npx wrangler pages secret put <NAME>`. Vercel: 프로젝트 환경변수.

## 최초 셋업(배포)

1. **도메인**: `www`·`practice`는 Cloudflare Pages 커스텀 도메인, `mock`은 Vercel 커스텀 도메인. DNS는 각 플랫폼 안내대로.
2. **KV 네임스페이스**(마더): `npx wrangler kv namespace create AUTH_KV` → 출력 id를 `skct-mother/wrangler.toml`의 `AUTH_KV`에 넣기. `SKCT_KV` id는 skala의 것과 동일(이미 기입됨).
3. **카카오**: developers.kakao.com → 앱 생성 → REST API 키/시크릿, Redirect URI 등록, 동의항목 `profile_nickname`(email 불필요).
4. **skct DB 마이그레이션**: `cd skct && npm run db:push` — `users`에 `external_id`(unique)·`onboarded` 추가, `pin_hash` NULL 허용, `auth_tokens` 테이블 제거. 기존 유저/응시 데이터는 보존.
5. 시크릿/환경변수 세팅(위 표) 후 각 앱 배포: 마더·skala `npm run pages:deploy`, skct는 Vercel.

## 로컬 개발(서브도메인 + 쿠키 공유 테스트)

쿠키 공유는 공통 상위 도메인이 필요하므로 로컬에선 `*.skct.local`을 쓴다.

1. `/etc/hosts`에 추가:
   ```
   127.0.0.1 www.skct.local mock.skct.local practice.skct.local
   ```
2. 세 앱을 각 포트로 실행:
   ```
   cd skct-mother && npm run pages:dev -- --port 8788     # 마더(.dev.vars 필요)
   cd skct        && npm run dev -- -p 3000               # skct(.env.local 필요)
   cd skala-skct  && npm run build && npx wrangler pages dev dist --port 8789   # skala(.dev.vars 필요)
   ```
3. `Caddyfile.local`(이 폴더)로 서브도메인 → 포트 매핑:
   ```
   caddy run --config skct-mother/Caddyfile.local
   ```
4. 각 앱 로컬 env: `SESSION_SECRET`(동일), `SESSION_COOKIE_DOMAIN=.skct.local`, 마더 `KAKAO_*`/`SKCT_LEGACY_VERIFY_URL=http://mock.skct.local/api/auth/legacy-verify`, skct `NEXT_PUBLIC_MOTHER_URL=http://www.skct.local` 등.
   - 카카오 로컬 테스트는 Redirect URI를 `http://www.skct.local/...`로 등록하거나(가능 시), 배포 프리뷰에서 확인. 레거시/JWT 흐름은 로컬에서 완전히 검증 가능.

> 참고: `npm run dev`(순수 Vite)만 띄우면 마더/ skala의 `/api/*`(Functions)가 없다. 인증 흐름은 `wrangler pages dev`(위)로 테스트.

## E2E 체크리스트(페르소나)

1. **신규 카카오**: `www/login` → 카카오 → 계정 생성 → `mock`/`practice` **재로그인 없이** 접근. `mock` 첫 방문 시 `/onboarding`(캠퍼스·분반).
2. **기존 skct**: `www/login/legacy`(서비스=모의고사) 아이디/비번(bcrypt) → `mock`에서 **기존 응시 기록** 그대로.
3. **기존 skala**: `www/login/legacy`(서비스=연습앱) 아이디/비번(PBKDF2) → `practice`에서 **기존 연습 기록** 그대로.
4. **계정 연결**: 카카오 로그인 → `www/settings` → 옛 skct·skala 연결 → 양쪽 데이터가 한 계정으로.
5. **로그아웃**: 어느 앱에서든 로그아웃 → `Domain=.` 쿠키 삭제로 **세 앱 모두** 무효화.

## 검증 완료(이번 구현)

- 세 앱 각각 타입체크/빌드 통과(마더 `vite build`, skct `next build`, skala `tsc -b`+`vite build`, 모든 Functions 타입체크).
- 크로스-앱 암호 계약 런타임 검증: 마더 서명 JWT를 skct(jose)·skala(Web Crypto)가 검증, 위조/변조 거부, skala PBKDF2 해시를 마더가 검증(레거시 skala 로그인). — 모두 통과.
- **남은 실환경 검증**: 실제 도메인/서브도메인에서의 쿠키 공유, 카카오 OAuth 왕복, skct `db:push` 후 데이터 보존은 위 체크리스트로 확인 필요(도메인·Kakao·KV 준비 후).
