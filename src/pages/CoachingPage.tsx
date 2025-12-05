import { useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import Button from '@/components/common/Button';
import DropDown from '@/components/ui/Dropdown';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import { showToast } from '@/utils/toast';
import { FeedbackIcon } from '@/assets';
import { FiSave } from 'react-icons/fi';
import { LuLightbulb, LuRotateCcw } from 'react-icons/lu';
import { basicItems, coachStep, jobItems } from '@/data/coachItems';
import { useAtom } from 'jotai';
import { pageAtom } from '@/atoms';
import clsx from 'clsx';
import { Outlet } from 'react-router-dom';

const CoachingPage = () => {
  const [page, setPage] = useAtom(pageAtom);
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);
  const [customQuestion, setCustomQuestion] = useState<string>('');
  const [customAnswer, setCustomAnswer] = useState<string>('');
  const [feedback, setFeedback] = useState<string>('');
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

      setFeedback('모범 답변 예시입니당');
      setPage((prev) => prev + 1);
      showToast.success('피드백이 생성되었습니다');
    }
  };

  const newCoaching = () => {
    setPage(1);
    setSelectedJob(null);
    setSelectedQuestion(null);
    setCustomQuestion('');
    setCustomAnswer('');
    setShowExampleAnswer(false);
  };

  return (
    <div className='space-y-5 relative sm:max-w-200 sm:mx-auto pb-30'>
      <div className='hidden sm:flex flex-col my-10'>
        <h3 className='text-2xl font-semibold mb-2'>면접 코칭</h3>
        <p className='text-[#717182] mb-6'>질문에 답변하고 AI로부터 즉각적인 피드백을 받아보세요</p>
        <div className='flex gap-3'>
          {coachStep.map((step) => (
            <div
              key={step.id}
              className={clsx(
                'rounded-lg max-sm:text-xs font-medium px-2 sm:px-3 py-1 sm:py-2',
                page === step.id ? 'bg-black text-white' : 'bg-[#D1D1D1]',
              )}
            >
              {step.content}
            </div>
          ))}
        </div>
      </div>
      {page === 1 && (
        <>
          <div className='bg-white rounded-xl px-6 py-4 border border-[#E5E5E5] flex flex-col gap-4'>
            <p className='font-semibold'>직무 선택</p>
            <DropDown
              items={jobItems}
              selected={selectedJob}
              placeholder='직무 선택'
              onSelect={(job) => setSelectedJob(job)}
            />
          </div>

          <div className='bg-white rounded-xl px-6 py-4 border border-[#E5E5E5] flex flex-col gap-4'>
            <p className='font-semibold'>면접 질문</p>
            <DropDown
              items={basicItems}
              selected={selectedQuestion}
              placeholder='기본 질문 선택'
              onSelect={(question) => setSelectedQuestion(question)}
            />

            <p className='font-semibold mt-4'>또는 직접 입력</p>
            <TextareaAutosize
              minRows={3}
              placeholder='면접 질문을 직접 입력하세요'
              className='bg-[#F3F3F5] rounded-lg p-4 max-sm:text-sm mb-2 border border-transparent focus:border-gray-300 focus:outline-none leading-6'
              value={customQuestion}
              onChange={(e) => setCustomQuestion(e.target.value)}
            />
          </div>

          <Button
            type='button'
            className='w-full bg-black text-white font-medium sm:max-w-[80%] sm:mx-auto mt-10 px-4 py-3 gap-2'
            onClick={handleNextStep}
          >
            다음 <FaAngleRight />
          </Button>
        </>
      )}

      {page === 2 && (
        <>
          <div className='bg-black rounded-xl p-6 flex flex-col gap-4 text-white leading-5'>
            <p className='font-semibold'>선택된 질문</p>
            <p>{customQuestion || selectedQuestion}</p>
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
              onClick={handleNextStep}
            >
              <FeedbackIcon />
              피드백 받기
            </Button>
          </div>
        </>
      )}

      {page === 3 && (
        <>
          <div className='bg-black rounded-xl p-6 flex flex-col gap-4 text-white leading-5'>
            <p className='font-semibold'>선택된 질문</p>
            <p>{customQuestion || selectedQuestion}</p>
          </div>

          <div className='bg-white rounded-xl p-6 flex flex-col gap-4 border border-[#E5E5E5]'>
            <p className='font-semibold'>내 답변</p>
            <p className='leading-6'>{customAnswer}</p>
          </div>

          <div className='bg-white rounded-xl p-4 px-6 border border-[#E5E5E5] flex flex-col gap-4'>
            <div className='flex flex-row items-center gap-3'>
              <p className='font-semibold'>AI 피드백</p>
              <div className='rounded-lg max-sm:text-sm font-medium px-2 sm:px-3 py-1 sm:py-2 bg-black text-white'>
                75점
              </div>
              <p className='text-[#717182]'>양호</p>
            </div>
            <div className='bg-[#F3F3F5] rounded-lg p-4 max-sm:text-sm mb-2 leading-5'>
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
              onClick={newCoaching}
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
              <div className='bg-[#F3F3F5] rounded-lg p-4 max-sm:text-sm mb-2 leading-5'>
                {feedback}
              </div>
            </div>
          )}
        </>
      )}

      <Outlet />
    </div>
  );
};

export default CoachingPage;
