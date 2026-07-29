export function isAbsolute(u: string): boolean {
  return /^https?:\/\//i.test(u);
}

// 로그인 성공 후 이동. 절대 URL(자식 서브도메인)이면 전체 이동, 아니면 SPA 경로 이동.
export function goAfterLogin(redirect: string): void {
  if (isAbsolute(redirect)) window.location.replace(redirect);
  else window.location.assign(redirect || '/');
}
