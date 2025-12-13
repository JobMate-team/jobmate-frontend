import Button from '@/components/common/Button';
import { LuLightbulb, LuRotateCcw } from 'react-icons/lu';
import { FiSave } from 'react-icons/fi';
import { showToast } from '@/utils/toast';
import type React from 'react';
import { useAtomValue } from 'jotai';
import { aiFeedbackAtom, coachingIdAtom, feedbackLoadingAtom } from '@/atoms';
import { postHistory } from '@/api/history';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import clsx from 'clsx';

interface Props {
  customQuestion: string;
  selectedQuestion: string | null;
  customAnswer: string;
  showExampleAnswer: boolean;
  setShowExampleAnswer: React.Dispatch<React.SetStateAction<boolean>>;
  resetCoaching: () => void;
}

const Step3Feedback = ({
  customQuestion,
  selectedQuestion,
  customAnswer,
  showExampleAnswer,
  setShowExampleAnswer,
  resetCoaching,
}: Props) => {
  const isLoading = useAtomValue(feedbackLoadingAtom);
  const { summarizedTalent, companyAdvice, totalReview, improvementPoints, exampleAnswer } =
    useAtomValue(aiFeedbackAtom);
  const coachingId = useAtomValue(coachingIdAtom);
  const [isSaved, setIsSaved] = useState(false);

  const saveHistoryMutation = useMutation({
    mutationFn: () => {
      if (coachingId === null) {
        throw new Error('coachingId가 없습니다');
      }
      return postHistory(coachingId);
    },
    onSuccess: () => {
      showToast.success('히스토리 저장에 성공했습니다');
      setIsSaved(true);
    },
    onError: () => {
      showToast.error('히스토리 저장에 실패했습니다');
    },
  });

  const handleSaveClick = () => {
    if (isSaved) {
      showToast.error('이미 히스토리가 저장되었습니다');
      return;
    }

    saveHistoryMutation.mutate();
  };

  return (
    <>
      <div className='bg-black rounded-xl p-6 flex flex-col gap-4 text-white'>
        <p className='font-semibold'>선택된 질문</p>
        <p className='leading-5 whitespace-pre-wrap'>{customQuestion || selectedQuestion}</p>
      </div>

      <div className='bg-white rounded-xl p-6 flex flex-col gap-4 border border-[#E5E5E5]'>
        <p className='font-semibold'>내 답변</p>
        <p className='leading-5 whitespace-pre-wrap'>{customAnswer}</p>
      </div>

      <div className='bg-white rounded-xl px-6 py-4 border border-[#E5E5E5] flex flex-col gap-4'>
        <div className='flex items-center justify-between py-2'>
          <p className='font-semibold'>AI 피드백</p>
          <Button
            type='button'
            className={clsx(
              'border border-black/10 text-sm font-medium gap-1.5 p-2 px-3 bg-white',
              isSaved && 'opacity-50 hover:brightness-100 pointer-events-none',
            )}
            disabled={coachingId === null || isLoading}
            onClick={handleSaveClick}
          >
            <FiSave size={18} />
            저장
          </Button>
        </div>
        <div className='bg-[#F3F3F5] rounded-lg p-4 mb-2 whitespace-pre-wrap'>
          {isLoading ? (
            <div className='flex items-center gap-3'>
              <div className='w-6 h-6 border-3 border-gray-400 border-t-transparent rounded-full animate-spin' />
              <p className='animate-pulse text-gray-500'>피드백 생성 중입니다...</p>
            </div>
          ) : (
            <div className='space-y-5'>
              {summarizedTalent && companyAdvice && (
                <>
                  <div className='bg-blue-100/60 border border-blue-200 p-4 rounded-lg'>
                    <h4 className='font-bold text-blue-900 mb-2 flex items-center gap-2 text-sm sm:text-base'>
                      인재상 요약
                    </h4>
                    <p className='text-xs sm:text-sm text-blue-800 leading-relaxed'>
                      {summarizedTalent}
                    </p>
                  </div>

                  <div className='bg-green-100/60 border border-green-200 p-4 rounded-lg'>
                    <h4 className='font-bold text-green-900 mb-2 flex items-center gap-2 text-sm sm:text-base'>
                      기업 맞춤 조언
                    </h4>
                    <p className='text-xs sm:text-sm text-green-800 leading-relaxed'>
                      {companyAdvice}
                    </p>
                  </div>
                </>
              )}

              <p className='font-semibold mb-2'>전체 총평</p>
              <p className='mb-6 text-gray-700 max-sm:text-sm leading-relaxed'>{totalReview}</p>

              <p className='font-semibold mb-2'>개선 포인트</p>
              <ul className='text-gray-700 max-sm:text-sm leading-relaxed'>
                {improvementPoints.map((pt, i) => (
                  <li key={i}>{pt}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className='flex max-sm:flex-col items-center gap-5 sm:max-w-[80%] sm:mx-auto mt-10'>
        <Button
          type='button'
          className='w-full bg-black text-white px-4 py-3 gap-2'
          onClick={() => setShowExampleAnswer((prev) => !prev)}
        >
          <LuLightbulb size={18} />
          {showExampleAnswer ? '모범 답변 숨기기' : '모범 답변 예시 보기'}
        </Button>

        <Button
          type='button'
          className={clsx(
            'w-full bg-black text-white px-4 py-3 gap-2',
            isLoading && 'opacity-50 hover:brightness-100 pointer-events-none',
          )}
          onClick={resetCoaching}
          disabled={isLoading}
        >
          <LuRotateCcw size={18} /> 새로운 질문 연습하기
        </Button>
      </div>

      {showExampleAnswer && (
        <div className='bg-white rounded-xl px-6 py-4 border border-[#E5E5E5] flex flex-col gap-4'>
          <div className='flex items-center justify-between'>
            <p className='font-semibold'>📝 모범 답변 예시</p>
          </div>
          <div className='bg-[#F3F3F5] rounded-lg p-4 max-sm:text-sm mb-2 leading-relaxed whitespace-pre-wrap'>
            {isLoading ? (
              <div className='flex items-center gap-3'>
                <div className='w-6 h-6 border-3 border-gray-400 border-t-transparent rounded-full animate-spin' />
                <p className='animate-pulse text-gray-500'>모범 답변 생성 중입니다...</p>
              </div>
            ) : (
              <p className='text-gray-700'>{exampleAnswer}</p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Step3Feedback;
