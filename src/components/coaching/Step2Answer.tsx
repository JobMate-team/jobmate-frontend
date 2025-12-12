import TextareaAutosize from 'react-textarea-autosize';
import Button from '@/components/common/Button';
import { FaAngleLeft } from 'react-icons/fa6';
import { FeedbackIcon } from '@/assets';

interface Props {
  question: string;
  customAnswer: string;
  // eslint-disable-next-line no-unused-vars
  setCustomAnswer: (v: string) => void;
  goBack: () => void;
  handleNext: () => void;
}

const Step2Answer = ({ question, customAnswer, setCustomAnswer, goBack, handleNext }: Props) => {
  return (
    <>
      <div className='bg-black text-white rounded-xl p-6'>
        <p className='font-semibold'>선택된 질문</p>
        <p className='leading-5 whitespace-pre-wrap'>{question}</p>
      </div>

      <div className='bg-white rounded-xl px-6 py-4 border flex flex-col gap-4'>
        <p className='font-semibold'>답변 작성</p>
        <TextareaAutosize
          minRows={7}
          placeholder='답변을 작성해주세요'
          className='bg-[#F3F3F5] rounded-lg p-4'
          value={customAnswer}
          onChange={(e) => setCustomAnswer(e.target.value)}
        />
      </div>

      <div className='flex items-center gap-5 mt-10'>
        <Button type='button' className='w-full ring bg-gray-50 ring-[#DADADA]' onClick={goBack}>
          <FaAngleLeft /> 이전
        </Button>

        <Button type='button' className='w-full bg-black text-white' onClick={handleNext}>
          <FeedbackIcon /> 피드백 받기
        </Button>
      </div>
    </>
  );
};

export default Step2Answer;
