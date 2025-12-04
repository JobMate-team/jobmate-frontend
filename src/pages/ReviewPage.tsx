import { RightIcon } from '@/assets';
import { isModalOpenAtom } from '@/atoms';
import Button from '@/components/common/Button';
import { useSetAtom } from 'jotai';
import { FiCalendar } from 'react-icons/fi';
import { Outlet, useNavigate } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa6';

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
    category: '개발',
    date: '24.9.10',
    question: '개발이 좋으세요? 아니면 고양이발이 좋으세요?',
    answer:
      '저는 개인적으로 고양이 발이 더 좋습니다. 고양이 발바닥을 보시면 핑크색 젤리가 있는데 그게 참 야무지거든요.',
  },
];

const ReviewPage = () => {
  const setIsModalOpen = useSetAtom(isModalOpenAtom);
  const navigate = useNavigate();

  return (
    <div className='space-y-5 relative pb-30 '>
      <div className='hidden sm:flex items-center justify-between'>
        <div className='flex flex-col mt-10'>
          <h3 className='text-2xl font-semibold mb-2'>면접 후기</h3>
          <p className='text-[#717182] mb-6'>
            면접 경험을 공유하고 다른 취준생들이 남긴 후기에서 인사이트를 얻어보세요
          </p>
        </div>
        <Button
          type='button'
          className='bg-black text-white font-medium text-sm px-2.5 py-2 border border-[#E5E5E5] whitespace-nowrap'
          onClick={() => setIsModalOpen((prev) => !prev)}
        >
          <FaPlus size={16} />
          후기 작성
        </Button>
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
            className='flex flex-row items-center gap-1 mt-1 cursor-pointer justify-between outline-none'
          >
            <p className='line-clamp-1 text-[#99A1AF]'>{item.answer}</p>
            <RightIcon className='h-4 min-w-4' />
          </button>
        </div>
      ))}

      <Outlet />
    </div>
  );
};

export default ReviewPage;
