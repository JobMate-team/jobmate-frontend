import TextareaAutosize from 'react-textarea-autosize';
import Button from '@/components/common/Button';
import { FaAngleLeft } from 'react-icons/fa6';
import { FeedbackIcon } from '@/assets';
import type React from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
import {
  aiFeedbackAtom,
  companyIdAtom,
  feedbackLoadingAtom,
  jobCategoryIdAtom,
  questionIdAtom,
  roleIdAtom,
} from '@/atoms';
import { showToast } from '@/utils/toast';
import { useMutation } from '@tanstack/react-query';
import { postHandFeedback, postTempFeedback } from '@/api/coaching';

interface Props {
  customQuestion: string | null;
  selectedQuestion: string | null;
  customAnswer: string;
  // eslint-disable-next-line no-unused-vars
  setCustomAnswer: (v: string) => void;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  handleNextStep: () => void;
}

const Step2Answer = ({
  customQuestion,
  selectedQuestion,
  customAnswer,
  setCustomAnswer,
  setPage,
  handleNextStep,
}: Props) => {
  const jobCategoryId = useAtomValue(jobCategoryIdAtom);
  const roleId = useAtomValue(roleIdAtom);
  const companyId = useAtomValue(companyIdAtom);
  const questionId = useAtomValue(questionIdAtom);
  const setFeedbackLoading = useSetAtom(feedbackLoadingAtom);
  const setAiFeedback = useSetAtom(aiFeedbackAtom);

  const tempFeedbackMutation = useMutation({
    mutationFn: () =>
      postTempFeedback({
        job_category_id: jobCategoryId!,
        role_id: roleId!,
        company_id: companyId!,
        question_id: questionId!,
        question_source: 'template',
        user_answer: customAnswer,
      }),
    onMutate: () => setFeedbackLoading(true),
    onSuccess: (res) => {
      const ai = res.success.ai_feedback;

      setAiFeedback({
        summarizedTalent: ai['요약된_인재상'] || '',
        companyAdvice: ai['기업_맞춤_조언'] || '',
        totalReview: ai['전체_총평'],
        improvementPoints: ai['개선포인트'],
        exampleAnswer: ai['모범_답변_예시'],
      });

      setFeedbackLoading(false);
      showToast.success('피드백이 생성되었습니다.');
    },
    onError: () => {
      setFeedbackLoading(false);
      showToast.error('피드백 생성에 실패했습니다.');
    },
  });

  const handFeedbackMutation = useMutation({
    mutationFn: () =>
      postHandFeedback({
        job_category_id: jobCategoryId!,
        role_id: roleId!,
        company_id: companyId!,
        question: customQuestion!,
        question_source: 'input',
        user_answer: customAnswer,
      }),
    onMutate: () => setFeedbackLoading(true),
    onSuccess: (res) => {
      const ai = res?.success?.ai_feedback ?? {};

      setAiFeedback({
        summarizedTalent: '',
        companyAdvice: '',
        totalReview: ai['전체_총평'] ?? '',
        improvementPoints: ai['개선포인트'] ?? [],
        exampleAnswer: ai['모범_답변_예시'] ?? '',
      });

      setFeedbackLoading(false);
      showToast.success('피드백이 생성되었습니다.');
    },
    onError: () => {
      setFeedbackLoading(false);
      showToast.error('피드백 생성에 실패했습니다.');
    },
  });

  const handleSave = () => {
    if (customQuestion && customQuestion.trim() !== '') {
      handFeedbackMutation.mutate();
      handleNextStep();
      return;
    }

    if (selectedQuestion) {
      tempFeedbackMutation.mutate();
      handleNextStep();
      return;
    }
  };

  return (
    <>
      <div className='bg-black rounded-xl p-6 flex flex-col gap-4 text-white'>
        <p className='font-semibold'>선택된 질문</p>
        <p className='leading-5 whitespace-pre-wrap'>{customQuestion || selectedQuestion}</p>
      </div>

      <div className='bg-white rounded-xl px-6 py-4 border border-[#E5E5E5] flex flex-col gap-4'>
        <p className='font-semibold'>답변 작성</p>
        <TextareaAutosize
          minRows={7}
          placeholder='면접 질문에 대한 답변을 작성해주세요'
          className='bg-[#F3F3F5] rounded-lg p-4 max-sm:text-sm mb-2 border border-transparent focus:border-gray-300 focus:outline-none leading-6'
          value={customAnswer}
          onChange={(e) => setCustomAnswer(e.target.value)}
        />
      </div>

      <div className='flex items-center gap-5 sm:max-w-[80%] sm:mx-auto mt-10'>
        <Button
          type='button'
          className='w-full ring bg-gray-50 ring-[#DADADA] font-medium px-4 py-3 gap-2'
          onClick={() => setPage((prev) => prev - 1)}
        >
          <FaAngleLeft /> 이전
        </Button>
        <Button
          type='submit'
          className='w-full bg-black text-white font-medium px-4 py-3 gap-2'
          onClick={handleSave}
        >
          <FeedbackIcon />
          피드백 받기
        </Button>
      </div>
    </>
  );
};

export default Step2Answer;
