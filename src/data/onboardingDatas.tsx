import { FirstOnboardingIcon, LogoIcon, SecondOnboardingIcon, ThirdOnboardingIcon } from '@/assets';

export const onboardingDatas = [
  {
    id: 1,
    icon: <LogoIcon />,
    title: 'JobMate.AI',
    content: 'AI 면접 코칭으로 합격을 준비하세요',
    subcontent: ['실시간 AI 피드백', '맞춤형 면접 질문', '체계적인 답변 관리'],
  },
  {
    id: 2,
    icon: <FirstOnboardingIcon />,
    title: 'AI 면접 코칭',
    content: 'AI가 여러분의 면접 답변을\n분석하고 개선점을 제시합니다',
    subcontent: ['답변의 논리성과 구조 분석', '개선 포인트 상세 피드백', '모범 답변 예시 제공'],
  },
  {
    id: 3,
    icon: <SecondOnboardingIcon />,
    title: '직무별 맞춤 질문',
    content: '개발자, 디자이너, 마케터 등 직무에\n특화된 면접 질문을 제공합니다',
    subcontent: ['실무 중심 질문 템플릿', '기술 면접 대비', '직무 역량 강화'],
  },
  {
    id: 4,
    icon: <ThirdOnboardingIcon />,
    title: '성장 추적 & 히스토리',
    content: '연습 기록을 저장하고 성장 과정을\n한눈에 확인하세요',
    subcontent: ['답변 히스토리 관리', '실전 면접 후기 공유', '꾸준한 성장 추적'],
  },
];
