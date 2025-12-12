import Button from '@/components/common/Button';
import { LuLightbulb, LuRotateCcw } from 'react-icons/lu';
import { FiSave } from 'react-icons/fi';
import { showToast } from '@/utils/toast';
import type React from 'react';

interface Props {
  customQuestion: string;
  selectedQuestion: string | null;
  customAnswer: string;
  feedback: string;
  showExampleAnswer: boolean;
  setShowExampleAnswer: React.Dispatch<React.SetStateAction<boolean>>;
  resetCoaching: () => void;
}

const Step3Feedback = ({
  customQuestion,
  selectedQuestion,
  customAnswer,
  feedback,
  showExampleAnswer,
  setShowExampleAnswer,
  resetCoaching,
}: Props) => {
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
        <p className='font-semibold py-2'>AI 피드백</p>
        <div className='bg-[#F3F3F5] rounded-lg p-4 max-sm:text-sm mb-2 leading-5 whitespace-pre-wrap'>
          넌 안돼 망할거라 우우~
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
          className='w-full bg-black text-white px-4 py-3 gap-2'
          onClick={resetCoaching}
        >
          <LuRotateCcw size={18} /> 새로운 질문 연습하기
        </Button>
      </div>

      {showExampleAnswer && (
        <div className='bg-white rounded-xl px-6 py-4  border border-[#E5E5E5] flex flex-col gap-4'>
          <div className='flex items-center justify-between'>
            <p className='font-semibold'>📝 모범 답변 예시</p>
            <Button
              type='button'
              className='border border-black/10 text-sm font-medium gap-1.5 p-2 px-3 bg-white'
              onClick={() => {
                navigator.clipboard.writeText(feedback);
                showToast.success('히스토리에 저장되었습니다');
              }}
            >
              <FiSave size={18} />
              저장
            </Button>
          </div>
          <div className='bg-[#F3F3F5] rounded-lg p-4 max-sm:text-sm mb-2 leading-5 whitespace-pre-wrap'>
            {feedback}
          </div>
        </div>
      )}
    </>
  );
};

export default Step3Feedback;
