import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { FiCalendar } from 'react-icons/fi';
import { IoIosClose } from 'react-icons/io';
import { useNavigate, useParams } from 'react-router-dom';

const mockHistoryItems = [
  {
    id: 1,
    category: '경험',
    date: '오늘',
    question: '코드 리뷰에서 가장 중요하게 생각하는 것은?',
    answer:
      '코드 컨벤션을 지켰는지 확인하면서 리뷰를 하는 것이 가장 중요하다고 생각합니다. 왜냐하면 중요하다고 생각하기 때문입니다.',
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

const HistoryDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const item = mockHistoryItems.find((h) => h.id === Number(id));

  const [open, setOpen] = useState(false);

  useEffect(() => {
    setTimeout(() => setOpen(true), 10); // mount 후 transition 트리거
  }, []);

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => navigate(-1), 200); // 애니메이션 끝난 뒤 닫기
  };

  if (!item) return null;

  return (
    <div
      className={clsx(
        'fixed inset-0 bg-black/40 transition-opacity duration-200 ',
        open ? 'opacity-100' : 'opacity-0',
      )}
      onClick={handleClose}
    >
      <div
        className={clsx(
          'fixed bottom-0 left-0 right-0 h-[80vh] bg-white rounded-t-2xl shadow-xl p-8 transition-transform duration-300',
          open ? 'translate-y-0' : 'translate-y-full',
        )}
      >
        <div className='flex items-center justify-between px-2 mb-10'>
          <div className='flex flex-row items-center justify-center gap-5'>
            <div className='bg-black text-white text-xs font-medium p-1 px-4 border border-[#E5E5E5] rounded-lg'>
              {item.category}
            </div>
            <p className='text-[#6A7282] flex items-center gap-1'>
              <FiCalendar size={18} />
              {item.date}
            </p>
          </div>
          <button
            onClick={handleClose}
            className='text-[#0A0A0A] bg-white rounded-full hover:brightness-90 transition'
          >
            <IoIosClose size={30} />
          </button>
        </div>

        <div className='mt-4 p-4 bg-white rounded-xl border border-gray-200'>
          <p className='font-medium text-lg mb-2'>{item.question}</p>
          <p className='text-gray-700'>{item.answer}</p>
        </div>
      </div>
    </div>
  );
};

export default HistoryDetailPage;
