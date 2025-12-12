import { useState } from 'react';
import { showToast } from '@/utils/toast';
import { useAtom } from 'jotai';
import { pageAtom } from '@/atoms';
import { Outlet } from 'react-router-dom';
import Step1Select from '@/components/coaching/Step1Select';
import Step2Answer from '@/components/coaching/Step2Answer';
import CoachStepHeader from '@/components/coaching/CoachStepHeader';
import Step3Feedback from '@/components/coaching/Step3Feedback';

const CoachingPage = () => {
  const [page, setPage] = useAtom(pageAtom);
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);
  const [customQuestion, setCustomQuestion] = useState<string>('');
  const [customAnswer, setCustomAnswer] = useState<string>('');
  const [showExampleAnswer, setShowExampleAnswer] = useState<boolean>(false);

  const handleNextStep = () => {
    if (page === 1) {
      if (!selectedJob) {
        showToast.error('직무를 선택해주세요');
        return;
      }

      if (!selectedQuestion && !customQuestion.trim()) {
        showToast.error('질문을 선택하거나 직접 입력해주세요');
        return;
      }

      setPage((prev) => prev + 1);
    } else if (page === 2) {
      if (!customAnswer.trim()) {
        showToast.error('답변을 작성해주세요');
        return;
      }
      setPage((prev) => prev + 1);
    }
  };

  const resetCoaching = () => {
    setPage(1);
    setSelectedJob(null);
    setSelectedQuestion(null);
    setCustomQuestion('');
    setCustomAnswer('');
    setShowExampleAnswer(false);
  };

  return (
    <div className='space-y-5 relative sm:max-w-200 sm:mx-auto pb-40'>
      <div className='hidden sm:flex flex-col my-10'>
        <h3 className='text-2xl font-semibold mb-2'>면접 코칭</h3>
        <p className='text-[#717182] mb-6'>질문에 답변하고 AI로부터 즉각적인 피드백을 받아보세요</p>
        <CoachStepHeader page={page} />
      </div>

      {page === 1 && (
        <Step1Select
          selectedJob={selectedJob}
          setSelectedJob={setSelectedJob}
          selectedQuestion={selectedQuestion}
          setSelectedQuestion={setSelectedQuestion}
          customQuestion={customQuestion}
          setCustomQuestion={setCustomQuestion}
          handleNextStep={handleNextStep}
        />
      )}

      {page === 2 && (
        <Step2Answer
          customQuestion={customQuestion}
          selectedQuestion={selectedQuestion}
          customAnswer={customAnswer}
          setCustomAnswer={setCustomAnswer}
          setPage={setPage}
          handleNextStep={handleNextStep}
        />
      )}

      {page === 3 && (
        <Step3Feedback
          customQuestion={customQuestion}
          selectedQuestion={selectedQuestion}
          customAnswer={customAnswer}
          showExampleAnswer={showExampleAnswer}
          setShowExampleAnswer={setShowExampleAnswer}
          resetCoaching={resetCoaching}
        />
      )}

      <Outlet />
    </div>
  );
};

export default CoachingPage;
