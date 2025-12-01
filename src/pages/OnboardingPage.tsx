import { ShiningIcon } from '@/assets';
import Button from '@/components/common/Button';
import { onboardingDatas } from '@/data/onboardingDatas';
import clsx from 'clsx';
import { useState } from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

const OnboardingPage = () => {
  const [page, setPage] = useState(0);

  const navigate = useNavigate();

  const goNext = () => {
    if (page === onboardingDatas.length - 1) {
      navigate('/signin');
      return;
    }

    setPage((prev) => prev + 1);
  };

  const goPrev = () => {
    if (page > 0) {
      setPage((prev) => prev - 1);
    }
  };

  const current = onboardingDatas[page];

  return (
    <div className='relative bg-gray-50 min-h-dvh flex justify-center items-center p-4'>
      <button onClick={() => navigate('/signin')} className='absolute top-4 right-4 font-medium'>
        건너뛰기
      </button>
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
          {onboardingDatas.map((_, idx) => (
            <div
              key={idx}
              className={clsx(
                'transition-all duration-300',
                idx === page
                  ? 'w-8 h-2 bg-black rounded-full'
                  : 'w-2 h-2 bg-[#DADADA] rounded-full',
              )}
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
              className='w-full bg-black text-white font-medium'
              onClick={goNext}
            >
              다음 <FaAngleRight />
            </Button>
          </div>
        ) : (
          <Button type='button' className='w-full bg-black text-white font-medium' onClick={goNext}>
            다음 <FaAngleRight />
          </Button>
        )}
      </div>
    </div>
  );
};

export default OnboardingPage;
