import {
  FirstOnboardingIcon,
  LogoIcon,
  SecondOnboardingIcon,
  ShiningIcon,
  ThirdOnboardingIcon,
} from '@/assets';
import Button from '@/components/common/Button';
import { useState } from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';

const onboardingPages = [
  {
    id: 1,
    icon: <LogoIcon />,
    title: 'JobMate.AI',
    content: 'AI 면접 코칭으로 합격을 준비하세요.',
    subcontent: ['실시간 AI 피드백', '맞춤형 면접 질문', '체계적인 답변 관리'],
  },
  {
    id: 2,
    icon: <FirstOnboardingIcon />,
    title: 'AI 면접 코칭',
    content: 'AI가 여러분의 면접 답변을\n분석하고 개선점을 제시합니다.',
    subcontent: ['답변의 논리성과 구조 분석', '개선 포인트 상세 피드백', '모범 답변 예시 제공'],
  },
  {
    id: 3,
    icon: <SecondOnboardingIcon />,
    title: '직무별 맞춤 질문',
    content: '개발자, 디자이너, 마케터 등 직무에\n특화된 면접 질문을 제공합니다.',
    subcontent: ['실무 중심 질문 템플릿', '기술 면접 대비', '직무 역량 강화'],
  },
  {
    id: 4,
    icon: <ThirdOnboardingIcon />,
    title: '성장 추적 & 히스토리',
    content: '연습 기록을 저장하고 성장 과정을\n한눈에 확인하세요.',
    subcontent: ['답변 히스토리 관리', '실전 면접 후기 공유', '꾸준한 성장 추적'],
  },
];

const OnboardingPage = () => {
  const [page, setPage] = useState(0);

  const goNext = () => {
    if (page < onboardingPages.length - 1) {
      setPage((prev) => prev + 1);
    }
  };

  const goPrev = () => {
    if (page > 0) {
      setPage((prev) => prev - 1);
    }
  };

  const current = onboardingPages[page];

  return (
    <div className='relative bg-gray-50 h-dvh flex justify-center items-center p-4'>
      <button className='absolute top-4 right-4 font-medium'>건너뛰기</button>
      <div className='w-full max-w-sm p-4'>
        {/* 아이콘 */}
        <div className='flex justify-center'>
          <div className='flex justify-center items-center rounded-3xl mb-10 bg-black w-30 h-30'>
            {current.icon}
          </div>
        </div>

        {/* 제목/설명 */}
        <div className='text-center mb-6'>
          <h1 className='text-2xl font-bold mb-1'>{current.title}</h1>
          <p className='text-gray-700 min-h-12 whitespace-pre-line'>{current.content}</p>
        </div>

        {/* 서브 콘텐츠 */}
        <div className='bg-white rounded-2xl shadow-sm p-6 mb-8'>
          <ul className='space-y-4'>
            {current.subcontent.map((text, idx) => (
              <li key={idx} className='flex items-center gap-3'>
                <ShiningIcon />
                <span className='font-medium'>{text}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 페이지 인디케이터 */}
        <div className='flex justify-center gap-2 mb-8'>
          {onboardingPages.map((_, idx) => (
            <div
              key={idx}
              className={
                idx === page ? 'w-8 h-2 bg-black rounded-full' : 'w-2 h-2 bg-[#DADADA] rounded-full'
              }
            ></div>
          ))}
        </div>

        {page > 0 ? (
          <div className='flex items-center gap-5'>
            <Button
              type='button'
              className='w-full ring bg-gray-50 ring-[#DADADA] font-medium'
              onClick={goPrev}
            >
              <FaAngleLeft /> 이전
            </Button>
            <Button
              type='button'
              className='w-full bg-black text-white font-medium hover:bg-gray-800'
              onClick={goNext}
            >
              다음 <FaAngleRight />
            </Button>
          </div>
        ) : (
          <Button
            type='button'
            className='w-full bg-black text-white font-medium hover:bg-gray-900'
            onClick={goNext}
          >
            다음 <FaAngleRight />
          </Button>
        )}
      </div>
    </div>
  );
};

export default OnboardingPage;
