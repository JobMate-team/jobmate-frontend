import Modal from '@/components/common/Modal';
import { showToast } from '@/utils/toast';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { FaRegTrashAlt } from 'react-icons/fa';
import { FiCalendar } from 'react-icons/fi';
import { IoIosClose } from 'react-icons/io';
import { useNavigate, useParams, useOutletContext } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchHistoryDetail, deleteHistory } from '@/api/history';
import { jobItems } from '@/data/coachItems';

interface HistoryDetailState {
  id: number;
  category: string;
  date: string;
  question: string;
  answer: string;
  aiFeedback: string;
  modelAnswer: string;
}

interface HistoryPageContext {
  loadHistory: () => void;
}

const HistoryDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { loadHistory } = useOutletContext<HistoryPageContext>();

  const [isOpen, setISOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getJobCategoryName = (id: number) => {
    return jobItems[id - 1] || '알 수 없음';
  };

  const { data: item, isLoading } = useQuery({
    queryKey: ['historyDetail', id],
    queryFn: async () => {
      if (!id) throw new Error('ID is required');

      const response = await fetchHistoryDetail(Number(id));

      if (response.resultType === 'SUCCESS' && response.success) {
        const data = response.success.data;
        return {
          id: data.history_id,
          category: getJobCategoryName(data.job_category_id),
          date: new Date(data.created_at)
            .toLocaleDateString('ko-KR', {
              year: '2-digit',
              month: 'numeric',
              day: 'numeric',
            })
            .replace(/\./g, '.')
            .replace(/\s/g, ''),
          question: data.question_content,
          answer: data.answer_text,
          aiFeedback: data.ai_feedback,
          modelAnswer: data.ai_model_answer,
        } as HistoryDetailState;
      } else if (response.resultType === 'FAIL' && response.error?.errorCode === 'NOT_FOUND') {
        showToast.error('해당 히스토리를 찾을 수 없습니다.');
        navigate('/history');
        throw new Error('History not found');
      } else {
        showToast.error(response.error?.reason || '히스토리 상세 정보를 불러오는데 실패했습니다.');
        navigate('/history');
        throw new Error(response.error?.reason || 'Failed to fetch history detail');
      }
    },
    enabled: !!id,
    gcTime: 10 * 60 * 1000,
    staleTime: 5 * 60 * 1000,
    retry: false,
  });

  useEffect(() => {
    if (!isLoading && item) {
      setTimeout(() => setISOpen(true), 10);
    }
  }, [isLoading, item]);

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
    setTimeout(() => navigate('/history'), 200);
  };

  const handleDelete = async () => {
    if (!item?.id) return;

    try {
      const response = await deleteHistory(item.id);

      if (response.resultType === 'SUCCESS') {
        setIsModalOpen(false);
        showToast.success('히스토리가 삭제되었습니다.');
        loadHistory();
        navigate('/history');
      } else if (response.resultType === 'FAIL') {
        const errorCode = response.error?.errorCode;
        if (errorCode === 'NOT_FOUND') {
          showToast.error('해당 히스토리를 찾을 수 없습니다.');
          navigate('/history');
        } else if (errorCode === 'FORBIDDEN') {
          showToast.error('해당 히스토리를 삭제할 권한이 없습니다.');
          setIsModalOpen(false);
        } else {
          showToast.error(response.error?.reason || '히스토리 삭제에 실패했습니다.');
          setIsModalOpen(false);
        }
      }
    } catch (error) {
      console.error('Failed to delete history:', error);
      showToast.error('히스토리 삭제 중 오류가 발생했습니다.');
      setIsModalOpen(false);
    }
  };

  const renderAiFeedback = () => {
    if (!item?.aiFeedback) return <div className='text-gray-500'>AI 피드백이 없습니다.</div>;

    let parsedFeedback = null;
    try {
      parsedFeedback = JSON.parse(item.aiFeedback);
    } catch {
      parsedFeedback = null;
    }

    if (parsedFeedback) {
      return (
        <div className='flex flex-col gap-4'>
          {parsedFeedback['요약된_인재상'] && (
            <div className='bg-blue-50 p-4 rounded-lg'>
              <h4 className='font-bold text-blue-900 mb-2 flex items-center gap-2 text-sm sm:text-base'>
                인재상 요약
              </h4>
              <p className='text-xs sm:text-sm text-blue-800 leading-relaxed'>
                {parsedFeedback['요약된_인재상']}
              </p>
            </div>
          )}

          {parsedFeedback['기업_맞춤_조언'] && (
            <div className='bg-green-50 p-4 rounded-lg'>
              <h4 className='font-bold text-green-900 mb-2 flex items-center gap-2 text-sm sm:text-base'>
                기업 맞춤 조언
              </h4>
              <p className='text-xs sm:text-sm text-green-800 leading-relaxed'>
                {parsedFeedback['기업_맞춤_조언']}
              </p>
            </div>
          )}

          {parsedFeedback['전체_총평'] && (
            <div>
              <h4 className='font-bold text-gray-900 mb-2 text-sm sm:text-base'>전체 총평</h4>
              <p className='text-xs sm:text-sm text-gray-700 leading-relaxed'>
                {parsedFeedback['전체_총평']}
              </p>
            </div>
          )}

          {parsedFeedback['개선포인트'] && Array.isArray(parsedFeedback['개선포인트']) && (
            <div>
              <h4 className='font-bold text-gray-900 mb-2 text-sm sm:text-base'>개선 포인트</h4>
              <ul className='list-disc list-inside space-y-1'>
                {parsedFeedback['개선포인트'].map((point: string, idx: number) => (
                  <li key={idx} className='text-xs sm:text-sm text-gray-700 leading-relaxed'>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      );
    }

    return (
      <div className='bg-[#F3F3F5] rounded-lg p-4 text-xs sm:text-sm mb-2 leading-5 whitespace-pre-wrap'>
        {item.aiFeedback}
      </div>
    );
  };

  const renderModelAnswer = () => {
    if (!item?.modelAnswer) return <div className='text-gray-500'>모범 답변이 없습니다.</div>;

    const answer = item.modelAnswer;
    const introIndex = answer.indexOf('(서론)');
    const bodyIndex = answer.indexOf('(본론)');
    const conclusionIndex = answer.indexOf('(결론)');

    if (introIndex !== -1 && bodyIndex !== -1 && conclusionIndex !== -1) {
      const summary = answer.substring(0, introIndex).trim();
      const intro = answer.substring(introIndex + 4, bodyIndex).trim();
      const body = answer.substring(bodyIndex + 4, conclusionIndex).trim();
      const conclusion = answer.substring(conclusionIndex + 4).trim();

      return (
        <div className='flex flex-col gap-4'>
          {summary && (
            <div className='border-l-4 border-blue-500 pl-4 py-1'>
              <h4 className='font-bold text-blue-900 mb-1 text-sm sm:text-base'>핵심 요약</h4>
              <p className='text-xs sm:text-sm text-gray-700 leading-relaxed'>{summary}</p>
            </div>
          )}

          <div className='grid gap-4'>
            <div className='border-l-4 border-blue-500 pl-4 py-1'>
              <h4 className='font-bold text-blue-900 mb-1 text-sm sm:text-base'>서론</h4>
              <p className='text-xs sm:text-sm text-gray-700 leading-relaxed'>{intro}</p>
            </div>

            <div className='border-l-4 border-blue-500 pl-4 py-1'>
              <h4 className='font-bold text-blue-900 mb-1 text-sm sm:text-base'>본론</h4>
              <p className='text-xs sm:text-sm text-gray-700 leading-relaxed'>{body}</p>
            </div>

            <div className='border-l-4 border-blue-500 pl-4 py-1'>
              <h4 className='font-bold text-blue-900 mb-1 text-sm sm:text-base'>결론</h4>
              <p className='text-xs sm:text-sm text-gray-700 leading-relaxed'>{conclusion}</p>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className='bg-[#F3F3F5] rounded-lg p-4 text-xs sm:text-sm mb-2 leading-relaxed whitespace-pre-wrap flex flex-col gap-4'>
        {item.modelAnswer.split(/\\n\\n|\n\n/).map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    );
  };

  if (isLoading) return null;
  if (!item) return null;

  return (
    <div
      className={clsx(
        'fixed inset-0 bg-black/40 transition-opacity duration-300 z-50',
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
          'w-full max-w-4xl p-4 sm:p-8',
          isOpen ? 'translate-y-0' : 'translate-y-full',
        )}
      >
        <section className='flex items-center justify-between px-2 mb-10'>
          <div className='flex flex-row items-center justify-center gap-3'>
            <div className='bg-black text-white text-xs font-medium p-1 px-4 border border-[#E5E5E5] rounded-lg'>
              {item.category}
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
          <div className='bg-black rounded-xl p-6 flex flex-col gap-4 text-white'>
            <p className='font-semibold'>질문</p>
            <p className='leading-5 whitespace-pre-wrap'>{item.question}</p>
          </div>

          <div className='bg-white rounded-xl p-6 flex flex-col gap-4 border border-[#E5E5E5]'>
            <p className='font-semibold'>내 답변</p>
            <p className='leading-6 whitespace-pre-wrap'>{item.answer}</p>
          </div>

          <div className='bg-white rounded-xl p-6  border border-[#E5E5E5] flex flex-col gap-4'>
            <p className='font-semibold'>AI 피드백</p>
            {renderAiFeedback()}
          </div>

          <div className='bg-white rounded-xl p-6  border border-[#E5E5E5] flex flex-col gap-4'>
            <p className='font-semibold'>📝 모범 답변 예시</p>
            {renderModelAnswer()}
          </div>
        </section>
      </main>

      {isModalOpen && (
        <Modal
          title='해당 히스토리를 삭제하시겠습니까?'
          content='이 작업은 되돌릴 수 없습니다.'
          onCancel={() => setIsModalOpen((prev) => !prev)}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
};

export default HistoryDetailPage;
