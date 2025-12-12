import { RightIcon } from '@/assets';
import { isModalOpenAtom } from '@/atoms';
import Button from '@/components/common/Button';
import { useSetAtom } from 'jotai';
import { FaRegTrashAlt } from 'react-icons/fa';
import { FiCalendar } from 'react-icons/fi';
import { Outlet, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import UpScrollButton from '@/components/ui/UpScrollButton';

const historyItems = [
  {
    id: 1,
    category: '경험',
    date: '오늘',
    question: '코드 리뷰에서 가장 중요하게 생각하는 것은?',
    answer:
      '코드 컨벤션을 지켰는지 확인하면서 리뷰를 하는 것이 가장 중요하다고 생각합니다. 왜냐하면 중요하다고 생각하기 때문입니다. 코드 컨벤션을 지켰는지 확인하면서 리뷰를 하는 것이 가장 중요하다고 생각합니다. 왜냐하면 중요하다고 생각하기 때문입니다.',
  },
  {
    id: 2,
    category: '인성',
    date: '25.10.27',
    question: '인성 문제있어요?',
    answer: '없는데요? 왜 물어보세요 그런거',
  },
  {
    id: 3,
    category: 'IT',
    date: '24.9.10',
    question: '개발이 좋으세요? 아니면 고양이발이 좋으세요?',
    answer:
      '저는 개인적으로 고양이 발이 더 좋습니다. 고양이 발바닥을 보시면 핑크색 젤리가 있는데 그게 참 야무지거든요.',
  },
];

const HistoryPage = () => {
  const setIsModalOpen = useSetAtom(isModalOpenAtom);
  const [isSortOrder, SetIsSortOrder] = useState(false);
  const navigate = useNavigate();

  return (
    <div className='space-y-5 relative pb-30'>
      <section className='hidden sm:flex items-center justify-between'>
        <div className='flex flex-col mt-10'>
          <h3 className='text-2xl font-semibold mb-2'>히스토리</h3>
          <p className='text-[#717182] mb-6'>과거 연습 기록을 확인하고 발전 과정을 추적하세요</p>
        </div>

        <Button
          type='button'
          className='bg-white font-medium text-sm px-2.5 py-2 border border-[#E5E5E5] whitespace-nowrap max-sm:hidden'
          onClick={() => setIsModalOpen((prev) => !prev)}
        >
          <FaRegTrashAlt size={16} />
          전체 삭제
        </Button>
      </section>

      <div className='flex justify-end'>
        <button
          type='button'
          onClick={() => SetIsSortOrder((prev) => !prev)}
          className='text-sm px-3 text-gray-700'
        >
          {isSortOrder ? '최신순' : '오래된순'}
        </button>
      </div>

      {historyItems.map((item) => (
        <div
          key={item.id}
          className='bg-white rounded-xl px-6 py-5 border border-[#E5E5E5] flex flex-col gap-4'
        >
          <div className='flex items-center justify-between mb-2'>
            <div className='bg-black text-white text-xs font-medium p-1 px-4 border border-[#E5E5E5] rounded-lg'>
              {item.category}
            </div>
            <p className='text-[#6A7282] flex items-center gap-1'>
              <FiCalendar size={18} />
              {item.date}
            </p>
          </div>

          <p>{item.question}</p>

          <button
            type='button'
            onClick={() => navigate(`/history/${item.id}`)}
            className='flex flex-row items-center gap-2 mt-1 cursor-pointer justify-between outline-none'
          >
            <p className='line-clamp-1 text-[#99A1AF]'>{item.answer}</p>
            <RightIcon className='h-4 min-w-4' />
          </button>
        </div>
      ))}

      <UpScrollButton />
      <Outlet />
    </div>
  );
};

export default HistoryPage;
