/**
 * SKALA-SKCT landing copy.
 * 레이아웃은 기존 템플릿 구조를 유지하고, 콘텐츠는 SKCT 학습 서비스로 구성한다.
 */

const motherUrl = import.meta.env.VITE_MOTHER_URL ?? "https://skala-skct.com";
const skctUrl = import.meta.env.VITE_MOCK_URL ?? "https://mock.skala-skct.com";
const skalaUrl = import.meta.env.VITE_PRACTICE_URL ?? "https://practice.skala-skct.com";
export type NavLink = { label: string; href?: string; pending?: boolean };


export const nav = {
  links: [
    { label: "실전 모의고사", href: skctUrl },
    { label: "모의고사 문제 연습", href: skalaUrl },
    { label: "유형별 문제 연습", href: "#types" },
  ],
  login: { label: "시작하기", href: "/login" },
};

export const auth = {
  campuses: ["판교", "울산", "광주"] as const,
  /** 판교는 10반, 나머지 캠퍼스는 4반까지. */
  classCountOf: (campus: string) => (campus === "판교" ? 10 : 4),
  /** 좌측 비주얼 패널. */
  panel: {
    headline: "지금 로그인하고\nSKCT 학습을\n시작하세요.",
    caption: "SKALA SKCT\nPractice Platform",
  },
  login: {
    title: "로그인",
    lede: "",
    submit: "로그인",
  },
  findId: {
    title: "아이디 찾기",
    lede: "가입할 때 등록한 이메일을 입력해 주세요.",
    submit: "아이디 찾기",
  },
  forgotPassword: {
    title: "비밀번호 찾기",
    lede: "아이디와 가입 이메일을 입력하면 재설정 안내를 보내드려요.",
    submit: "재설정 안내 받기",
  },
  /** 가입 화면 약관 모달. 법무 검토 전 초안 문구입니다. */
  terms: {
    trigger: "약관 보기",
    title: "서비스 이용약관 · 개인정보 처리방침",
    note: "",
    docs: [
      {
        heading: "서비스 이용약관",
        clauses: [
          {
            title: "제1조 (목적)",
            body: "이 약관은 SKALA-SKCT(이하 '서비스')가 제공하는 SKCT 학습 서비스의 이용 조건과 절차, 회원과 서비스의 권리·의무를 정하는 것을 목적으로 합니다.",
          },
          {
            title: "제2조 (이용 자격)",
            body: "서비스는 SKALA 과정 구성원을 대상으로 합니다. 가입 시 입력한 이름, 캠퍼스, 분반 정보가 사실과 다를 경우 이용이 제한될 수 있습니다.",
          },
          {
            title: "제3조 (계정 관리)",
            body: "회원은 본인의 아이디와 비밀번호를 직접 관리해야 하며, 계정을 타인에게 양도하거나 공유할 수 없습니다. 계정 도용이 의심되면 즉시 비밀번호를 변경해 주세요.",
          },
          {
            title: "제4조 (학습 기록)",
            body: "응시 기록, 점수, 풀이 이력은 학습 분석과 평균 비교를 위해 저장됩니다. 다른 회원에게는 개인을 식별할 수 없는 형태의 통계로만 제공됩니다.",
          },
          {
            title: "제5조 (금지 행위)",
            body: "문항과 해설을 무단으로 복제·배포하거나, 자동화 도구로 응시 기록을 조작하는 행위를 금지합니다. 위반 시 이용이 정지될 수 있습니다.",
          },
          {
            title: "제6조 (서비스 변경)",
            body: "서비스 구성과 회차는 학습 일정에 따라 변경될 수 있으며, 중요한 변경은 서비스 내 공지로 안내합니다.",
          },
        ],
      },
      {
        heading: "개인정보 처리방침",
        clauses: [
          {
            title: "수집 항목",
            body: "이름, 캠퍼스, 분반, 아이디, 이메일, 비밀번호(암호화 저장), 학습 기록(응시 결과·풀이 이력)을 수집합니다.",
          },
          {
            title: "이용 목적",
            body: "본인 확인, 학습 기록 저장과 복원, 평균 대비 분석 제공, 서비스 개선을 위한 통계 산출에 사용합니다.",
          },
          {
            title: "보유 기간",
            body: "회원 탈퇴 시 지체 없이 파기합니다. 다만 관계 법령에 따라 보존이 필요한 정보는 해당 기간 동안 보관합니다.",
          },
          {
            title: "제3자 제공",
            body: "법령에 근거한 경우를 제외하고 개인정보를 외부에 제공하지 않습니다.",
          },
          {
            title: "이용자 권리",
            body: "언제든지 본인의 개인정보 열람·정정·삭제를 요청할 수 있으며, 요청은 서비스 내 문의 창구로 접수됩니다.",
          },
        ],
      },
    ],
  },
  links: {
    login: { label: "로그인", href: "/login" },
    findId: { label: "아이디 찾기", href: "/find-id" },
    forgotPassword: { label: "비밀번호 찾기", href: "/forgot-password" },
  },
};

export const hero = {
  title: "SKALA를 위한 효율적인\nSKCT 학습 플랫폼",
  body: "실전 모의고사부터 모의고사 연습 문제 풀이, 유형별 연습까지 준비되어 있어요.",
  tabs: [
    { label: "실전 모의고사", image: "/assets/skct/dashboard.png" },
    { label: "모의고사 연습 문제", image: "/assets/skct/review.png" },
    { label: "유형별 문제 연습", image: "/assets/skct/mock-3.png" },
  ],
};

export const partners = [
  { name: "SK텔레콤", logo: "/assets/sk-logo.svg", width: 34, height: 22 },
  { name: "SK하이닉스", logo: "/assets/sk-logo.svg", width: 34, height: 22 },
  { name: "SK이노베이션", logo: "/assets/sk-logo.svg", width: 34, height: 22 },
  { name: "SK온", logo: "/assets/sk-logo.svg", width: 34, height: 22 },
  { name: "SK AX", logo: "/assets/sk-logo.svg", width: 34, height: 22 },
  { name: "SK스퀘어", logo: "/assets/sk-logo.svg", width: 34, height: 22 },
  { name: "SK브로드밴드", logo: "/assets/sk-logo.svg", width: 34, height: 22 },
  { name: "SK에코플랜트", logo: "/assets/sk-logo.svg", width: 34, height: 22 },
  { name: "SK네트웍스", logo: "/assets/sk-logo.svg", width: 34, height: 22 },
  { name: "SK지오센트릭", logo: "/assets/sk-logo.svg", width: 34, height: 22 },
  { name: "SK엔무브", logo: "/assets/sk-logo.svg", width: 34, height: 22 },
  { name: "SK실트론", logo: "/assets/sk-logo.svg", width: 34, height: 22 },
  { name: "SKC", logo: "/assets/sk-logo.svg", width: 34, height: 22 },
  { name: "SK바이오팜", logo: "/assets/sk-logo.svg", width: 34, height: 22 },
  { name: "SK바이오사이언스", logo: "/assets/sk-logo.svg", width: 34, height: 22 },
  { name: "SK가스", logo: "/assets/sk-logo.svg", width: 34, height: 22 },
];

export const growth = {
  title: "AI Assistant를 통한 효율적인 학습",
  assist: {
    eyebrow: "SKCT AI Assistant",
    headline: "AI Assistant로\n학습 방향을 빠르게 잡아요",
    prompts: [
      "이번 회차는 언어이해 정답률이 41%로 세 영역 중 가장 낮았습니다.",
      "자료해석은 시간이 부족해 뒤쪽 5문항을 미응답으로 남겼습니다.",
      "다음엔 자료해석부터 풀고 남은 시간을 언어이해에 배분해 보세요.",
    ],
  },
  chips: [
    { label: "SK텔레콤", rotate: -18, style: { top: "-13px", left: "-93px" } },
    { label: "SK하이닉스", rotate: 0, style: { bottom: "-98px", left: "55%" } },
    { label: "SK이노베이션", rotate: 17, style: { bottom: "-58px", left: "110%" } },
    { label: "SK온", rotate: 7, style: { bottom: "-46px", left: "10%" } },
    { label: "SK AX", rotate: 7, style: { top: "-82px", left: "53%" } },
    { label: "SK스퀘어", rotate: 4, style: { top: "-32px", right: "-69px" } },
  ],
};

export const solutions = {
  title: "SKCT 실전 감각을 만드는 핵심 기능",
  cards: [
    {
      title: "실전 모의고사",
      body: "제한 시간과 문항 흐름을 실제 시험처럼 구성해\n실전 집중력을 점검해요.",
      bullets: ["회차별 실전 세트를 풀어요", "제한 시간 안에 풀이해요", "점수와 정답률을 확인해요"],
      bg: "/assets/sol-1-bg.png",
      card: "/assets/skct/dashboard.png",
      imageSide: "right" as const,
    },
    {
      title: "모의고사 문제 연습",
      body: "다양한 모의고사를 시간 제한 없이 풀 수 있어요.",
      bullets: ["여러 출판사 모의고사를 골라 풀어요", "시간 제한 없이 편하게 풀어요", "결과 페이지에서 피드백을 받아요"],
      bg: "/assets/sol-2-bg.png",
      card: "/assets/skct/review.png",
      imageSide: "left" as const,
    },
    {
      title: "유형별 문제 연습",
      body: "언어이해, 자료해석, 수리, 추리 등\n약한 유형만 골라 반복 훈련해요.",
      bullets: ["유형별로 필터링해요", "난이도별 문제를 풀어요", "취약 유형을 추천해요"],
      bg: "/assets/sol-3-bg.png",
      card: "/assets/skct/mock-3.png",
      imageSide: "right" as const,
    },
  ],
};

export const dataPlatform = {
  title: "점수 향상을 위해 준비되어 있는\n최적의 학습 환경",
  bg: "/assets/data-bg.png",
  features: [
    {
      eyebrow: "STEP 01 · MOCK TEST",
      title: "실전\n모의고사",
      body: "회차별 시험 흐름을 그대로 따라가며\n제한 시간 안에서 집중력을 점검해요.",
      bullets: ["회차별 실전 세트를 풀어요", "제한 시간 안에 풀이해요", "점수 흐름을 확인해요"],
      image: "/assets/skct/dashboard.png",
    },
    {
      eyebrow: "STEP 02 · PRACTICE",
      title: "모의고사\n문제 연습",
      body: "다양한 출판사의 모의고사를\n시간 제한 없이 풀어 보세요.",
      bullets: ["여러 출판사 모의고사를 골라 풀어요", "시간 제한 없이 편하게 풀어요", "결과 페이지에서 피드백을 받아요"],
      image: "/assets/skct/review.png",
    },
    {
      eyebrow: "STEP 03 · TYPE TRAINING",
      title: "유형별\n문제 연습",
      body: "취약한 문제 유형을 확인하고\n필요한 유형만 골라 반복 학습해요.",
      bullets: ["유형별로 필터링해요", "난이도별 문제를 풀어요", "취약 유형을 추천해요"],
      image: "/assets/skct/mock-3.png",
    },
  ],
};

export const stats = [
  {
    value: 80,
    suffix: "명",
    label: "누적 가입자",
    body: "약 80명의 SKALA 구성원이 가입해\n학습 기록을 쌓고 있어요.",
  },
  {
    value: 300,
    suffix: "+",
    label: "시험 응시 기록",
    body: "응시 기록이 데이터로 남아\n다른 사용자들과 비교해 볼 수 있어요.",
  },
  {
    value: 5,
    suffix: "개",
    label: "출판사 모의고사",
    body: "여러 출판사의 모의고사를 한곳에서\n골라 풀 수 있어요.",
  },
];

export const workflow = {
  title: "SKCT 학습 플로우",
  steps: [
    {
      title: "실전 모의고사",
      body: "제한 시간에 맞춰 회차별 모의고사를 실제 시험처럼 응시해요.",
    },
    {
      title: "취약 유형 분석",
      body: "응시 결과에서 자주 틀리는 유형과\n시간이 부족한 영역을 확인해요.",
    },
    {
      title: "모의고사\n문제 연습",
      body: "시간 제한 없이 모의고사\n문제를 풀며 숙련도를 올려요.",
    },
    {
      title: "다시 한 번,\n실전 모의고사!",
      body: "다시 실전 응시로 돌아와\n점수 향상에 도전하세요!",
    },
  ],
};

export const opportunity = {
  title: "실제 SKCT 시험과\n유사한 학습 화면",
  items: [
    {
      title: "실제 시험과 유사한 화면",
      body: "실제 시험과 유사한 환경을 통해 실전 감각을 기를 수 있어요.",
      image: "/assets/skct/mock-1.png",
    },
    {
      title: "계산기와 그림판 제공",
      body: "풀이 중에 계산기와 그림판을 사용할 수 있어요.",
      image: "/assets/skct/mock-2.png",
    },
    {
      title: "문항 보기와 선택지 구성",
      body: "지문, 보기, 선택지가 실제 시험처럼 배치되어 있어요.",
      image: "/assets/skct/mock-3.png",
    },
    {
      title: "유형별 문제 구분",
      body: "유형별 20문제씩 나눠져 있어 실제 시험과 유사해요.",
      image: "/assets/skct/review.png",
    },
  ],
};

export const faqs = [
  {
    q: "실전 모의고사와 모의고사 문제 연습은 어떻게 다른가요?",
    a: "실전 모의고사는 제한 시간 안에서 실제 시험처럼 응시하고,\n모의고사 문제 연습은 시간 제한 없이 원하는 문제만 골라 풀 수 있어요.",
  },
  {
    q: "어떤 출판사의 모의고사를 풀 수 있나요?",
    a: "여러 출판사의 모의고사를 한곳에 모아 두었어요.\n원하는 출판사와 회차를 골라 바로 응시할 수 있어요.",
  },
  {
    q: "시험 화면에 계산기나 그림판도 있나요?",
    a: "네. 실제 SKCT 응시 환경과 비슷하게 계산기와 그림판을 함께 제공하고,\n문항 보기와 선택지 구성도 실제 시험 화면에 맞췄어요.",
  },
  {
    q: "응시가 끝나면 어떤 피드백을 받을 수 있나요?",
    a: "결과 페이지에서 취약한 유형과 시간이 부족했던 영역을 정리해 주고,\nAI Assistant가 다음에 무엇부터 풀면 좋을지 제안해요.",
  },
];

export const bottomCta = {
  title: "SKCT 준비,\n지금 바로 시작하세요!",
  cta: { label: "학습 시작하기", href: motherUrl },
};

export const footer = {
  copyright: "© 2026 SKALA-SKCT. All rights reserved",
};
