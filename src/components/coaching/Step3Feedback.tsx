import Button from '@/components/common/Button';
import { LuLightbulb, LuRotateCcw } from 'react-icons/lu';
import { FiSave } from 'react-icons/fi';
import { showToast } from '@/utils/toast';

interface Props {
  question: string;
  customAnswer: string;
  feedback: string;
  showExample: boolean;
  // eslint-disable-next-line no-unused-vars
  setShowExample: (v: boolean) => void;
  resetFlow: () => void;
}

const Step3Feedback = ({
  question,
  customAnswer,
  feedback,
  showExample,
  setShowExample,
  resetFlow,
}: Props) => {
  return (
    <>
      <div className='bg-black text-white rounded-xl p-6'>
        <p className='font-semibold'>선택된 질문</p>
        <p className='leading-5 whitespace-pre-wrap'>{question}</p>
      </div>

      <div className='bg-white rounded-xl p-6 border flex flex-col gap-4'>
        <p className='font-semibold'>내 답변</p>
        <p className='leading-5 whitespace-pre-wrap'>{customAnswer}</p>
      </div>

      <div className='bg-white rounded-xl p-6 border flex flex-col gap-4'>
        <p className='font-semibold'>AI 피드백</p>
        <div className='bg-[#F3F3F5] rounded-lg p-4 leading-5 whitespace-pre-wrap'>{feedback}</div>
      </div>

      <div className='flex max-sm:flex-col gap-5 mt-10'>
        <Button
          type='button'
          className='w-full bg-black text-white'
          onClick={() => setShowExample(!showExample)}
        >
          <LuLightbulb />
          {showExample ? '모범 답변 숨기기' : '모범 답변 보기'}
        </Button>

        <Button type='button' className='w-full bg-black text-white' onClick={resetFlow}>
          <LuRotateCcw /> 새로운 질문 연습하기
        </Button>
      </div>

      {showExample && (
        <div className='bg-white rounded-xl p-6 border flex flex-col gap-4'>
          <div className='flex justify-between items-center'>
            <p className='font-semibold'>📝 모범 답변 예시</p>
            <Button
              type='button'
              className='border border-black/10 bg-white text-sm p-2 px-3'
              onClick={() => {
                navigator.clipboard.writeText(feedback);
                showToast.success('히스토리에 저장되었습니다');
              }}
            >
              <FiSave /> 저장
            </Button>
          </div>
          <div className='bg-[#F3F3F5] rounded-lg p-4 whitespace-pre-wrap'>{feedback}</div>
        </div>
      )}
    </>
  );
};

export default Step3Feedback;
