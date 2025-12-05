import Modal from '@/components/common/Modal';
import { showToast } from '@/utils/toast';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { FaRegTrashAlt } from 'react-icons/fa';
import { FiCalendar } from 'react-icons/fi';
import { IoIosClose } from 'react-icons/io';
import { useNavigate, useParams } from 'react-router-dom';

const mockHistoryItems = [
  {
    id: 1,
    category: '경험',
    score: 75,
    date: '오늘',
    question: '코드 리뷰에서 가장 중요하게 생각하는 것은?',
    answer:
      '코드 컨벤션을 지켰는지 확인하면서 리뷰를 하는 것이 가장 중요하다고 생각합니다. 왜냐하면 중요하다고 생각하기 때문입니다. 코드 컨벤션을 지켰는지 확인하면서 리뷰를 하는 것이 가장 중요하다고 생각합니다. 왜냐하면 중요하다고 생각하기 때문입니다.',
  },
  {
    id: 2,
    category: '인성',
    score: 100,
    date: '25.10.27',
    question: '인성 문제있어요?',
    answer: '없는데요? 왜 물어보세요 그런거',
  },
  {
    id: 3,
    category: '개발',
    score: 60,
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

  const [isOpen, setISOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setTimeout(() => setISOpen(true), 10); // mount 후 transition 트리거
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;

      if (isModalOpen) {
        setIsModalOpen(false);
        return;
      }

      if (isOpen) {
        handleClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isModalOpen, isOpen]);

  const handleClose = () => {
    setISOpen(false);
    setTimeout(() => navigate('/history'), 200); // 애니메이션 끝난 뒤 닫기
  };

  const handleDelete = () => {
    setIsModalOpen((prev) => !prev);
    showToast.success('삭제되었습니다');
    navigate('/history');
  };

  if (!item) return null;

  return (
    <div
      className={clsx(
        'fixed inset-0 bg-black/40 transition-opacity duration-300 ',
        isOpen ? 'opacity-100' : 'opacity-0',
      )}
      onClick={() => {
        if (!isModalOpen) handleClose();
      }}
    >
      <main
        onClick={(e) => e.stopPropagation()}
        className={clsx(
          'fixed bottom-0 left-1/2 transform -translate-x-1/2 h-[90vh] bg-white rounded-t-2xl shadow-xl transition-transform duration-300 overflow-y-auto hide-scrollbar',
          'w-full max-w-4xl p-8',
          isOpen ? 'translate-y-0' : 'translate-y-full',
        )}
      >
        <section className='flex items-center justify-between px-2 mb-10'>
          <div className='flex flex-row items-center justify-center gap-3'>
            <div className='bg-black text-white text-xs font-medium p-1 px-4 border border-[#E5E5E5] rounded-lg'>
              {item.category}
            </div>
            <div className='bg-[#ECEEF2] text-xs font-medium p-1 px-4 border border-[#E5E5E5] rounded-lg'>
              {item.score}점
            </div>
            <p className='text-[#6A7282] flex items-center gap-1'>
              <FiCalendar size={18} />
              {item.date}
            </p>
          </div>
          <div className='flex items-center gap-2'>
            <button
              type='button'
              onClick={() => setIsModalOpen((prev) => !prev)}
              className='bg-white rounded-full p-2 hover:brightness-90 transition outline-none'
            >
              <FaRegTrashAlt size={16} className='text-[#FB2C36]' />
            </button>
            <button
              onClick={handleClose}
              className='text-[#0A0A0A] bg-white rounded-full hover:brightness-90 transition'
            >
              <IoIosClose size={30} />
            </button>
          </div>
        </section>

        <section className='space-y-5 mb-20'>
          <div className='bg-black rounded-xl p-6 flex flex-col gap-4 text-white leading-5'>
            <p className='font-semibold'>질문</p>
            <p>{item.question}</p>
          </div>

          <div className='bg-white rounded-xl p-6 flex flex-col gap-4 border border-[#E5E5E5]'>
            <p className='font-semibold'>내 답변</p>
            <p className='leading-6'>{item.answer}</p>
          </div>

          <div className='bg-white rounded-xl p-6  border border-[#E5E5E5] flex flex-col gap-4'>
            <p className='font-semibold'>AI 피드백</p>
            <div className='bg-[#F3F3F5] rounded-lg p-4 max-sm:text-sm mb-2 leading-5'>
              넌 안돼 망할거라 우우~ 넌 안돼 망할거라 우우~ 넌 안돼 망할거라 우우~ 넌 안돼 망할거라
              우우~
            </div>
          </div>

          <div className='bg-white rounded-xl p-6  border border-[#E5E5E5] flex flex-col gap-4 '>
            <p className='font-semibold'>📝 모범 답변 예시</p>
            <div className='bg-[#F3F3F5] rounded-lg p-4 max-sm:text-sm mb-2 leading-5'>
              피드백피드백피드백피드백피드백 피드백 피드백 피드백 피드백 피드백 피드백 피드백
            </div>
          </div>
        </section>
      </main>

      {isModalOpen && (
        <Modal
          title='해당 히스토리를 삭제하시겠습니까?'
          content='이 작업은 되돌릴 수 없습니다. 모든 면접 답변 기록이 영구적으로 삭제됩니다.'
          onCancel={() => setIsModalOpen((prev) => !prev)}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
};

export default HistoryDetailPage;
