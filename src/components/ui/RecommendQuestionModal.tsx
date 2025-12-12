import Button from '../common/Button';
import { useQuery } from '@tanstack/react-query';
import { getUserInfo } from '@/api/auth';
import LoadingComponent from './LoadingComponent';
import type { RecommendQuestionItem } from '@/types/coaching';
import { X } from 'lucide-react';

interface ModalProps {
  recommendedQuestions?: RecommendQuestionItem[];
  isLoading?: boolean;
  // eslint-disable-next-line no-unused-vars
  setCustomQuestion: (v: string) => void;
  onCancel: () => void;
}

const RecommendQuestionModal = ({
  recommendedQuestions,
  isLoading,
  setCustomQuestion,
  onCancel,
}: ModalProps) => {
  const { data: userData } = useQuery({
    queryKey: ['userInfo'],
    queryFn: getUserInfo,
    gcTime: 10 * 60 * 1000,
    staleTime: 5 * 60 * 1000,
  });

  const categoryMap: Record<string, string> = {
    Tenacity: '인성',
    Tech: '기술',
    Job: '직무',
    Experience: '경험',
    Behavior: '가치관',
  };

  return (
    <div
      onClick={onCancel}
      className='fixed inset-0 bg-black/40 flex justify-center items-center z-50'
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className='bg-white rounded-[10px] flex flex-col overflow-y-auto p-6 w-[90%] sm:w-140 h-[80%] hide-scrollbar'
      >
        {isLoading && <LoadingComponent />}

        {!isLoading && recommendedQuestions && recommendedQuestions.length > 0 && (
          <div className='space-y-5'>
            <div className='flex items-center justify-between'>
              <p className='font-medium'>{userData?.success.nickname}님을 위한 추천 질문 목록</p>
              <button
                type='button'
                onClick={onCancel}
                className='bg-white p-1.5 hover:bg-gray-200 transition rounded-full'
              >
                <X />
              </button>
            </div>

            {recommendedQuestions.map((q, idx) => (
              <div key={idx} className='flex items-center'>
                <div className='bg-[#F9FAFB] border border-gray-200 rounded-xl p-4 flex flex-col gap-4 w-full'>
                  <div className='flex items-center justify-between'>
                    <div className='bg-white border border-gray-200 text-xs py-1 px-2 rounded-lg font-medium whitespace-nowrap text-center'>
                      {categoryMap[q.category] || q.category}
                    </div>
                    <Button
                      type='button'
                      onClick={() => {
                        setCustomQuestion(q.question);
                        onCancel();
                      }}
                      className='bg-black text-white text-sm py-2 px-6 rounded-xl'
                    >
                      선택
                    </Button>
                  </div>
                  <p className='text-sm break-keep'>{q.question}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {!isLoading && (!recommendedQuestions || recommendedQuestions.length === 0) && (
          <div className='py-10 text-center text-gray-500'>
            <p>추천 질문을 생성할 수 없습니다.</p>
            <Button
              type='button'
              onClick={onCancel}
              className='mt-4 bg-black text-white py-2 px-6 rounded-xl'
            >
              닫기
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecommendQuestionModal;
