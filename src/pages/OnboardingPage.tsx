import { Logo, ShiningIcon } from '@/assets';
import Button from '@/components/common/Button';
import { FaAngleRight } from 'react-icons/fa6';

const OnboardingPage = () => {
  return (
    <div className='relative bg-gray-50 h-dvh flex justify-center items-center p-4'>
      <button className='absolute top-4 right-4 font-medium'>건너뛰기</button>
      <div className='w-full max-w-sm p-4'>
        <div className='flex justify-center mb-10'>
          <Logo />
        </div>

        <div className='text-center mb-12'>
          <h1 className='text-2xl font-bold mb-1'>JobMate.AI</h1>
          <p className='text-gray-700'>AI 면접 코칭으로 합격을 준비하세요</p>
        </div>

        <div className='bg-white rounded-2xl shadow-sm p-6 mb-8'>
          <ul className='space-y-4'>
            <li className='flex items-center gap-3'>
              <ShiningIcon />
              <span className='font-medium'>실시간 AI 피드백</span>
            </li>
            <li className='flex items-center gap-3'>
              <ShiningIcon />
              <span className='font-medium'>맞춤형 면접 질문</span>
            </li>
            <li className='flex items-center gap-3'>
              <ShiningIcon />
              <span className='font-medium'>체계적인 답변 관리</span>
            </li>
          </ul>
        </div>

        <div className='flex justify-center gap-2 mb-8'>
          <div className='w-8 h-2 bg-black rounded-full'></div>
          <div className='w-2 h-2 bg-[#DADADA] rounded-full'></div>
          <div className='w-2 h-2 bg-[#DADADA] rounded-full'></div>
          <div className='w-2 h-2 bg-[#DADADA] rounded-full'></div>
        </div>

        <Button type='button' className='w-full bg-black text-white font-medium hover:bg-gray-900'>
          다음 <FaAngleRight />
        </Button>
      </div>
    </div>
  );
};

export default OnboardingPage;
