import { useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import Button from '@/components/common/Button';
import DropDown from '@/components/ui/Dropdown';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import { showToast } from '@/utils/toast';

const CoachingPage = () => {
  const [page, setPage] = useState(1); // 페이지 상태
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);
  const [customQuestion, setCustomQuestion] = useState<string>('');
  const [customAnswer, setCustomAnswer] = useState<string>('');

  const jobItems = ['기획', '개발', '마케팅', '디자인', '영업', '인사'];
  const basicItems = [
    '자기소개 부탁드립니다.',
    '가장 어려웠던 기술적 문제와 해결 방법은?',
    '최근에 관심있는 기술 트렌드는 무엇인가요?',
    '코드 리뷰에서 가장 중요하게 생각하는 것은?',
    '본인의 개발 철학은 무엇인가요?',
  ];

  const handleNextStep = () => {
    if (page === 1) {
      // 1페이지 검증
      if (!selectedJob) {
        showToast.error('직무를 선택해주세요');
        return;
      }

      if (!selectedQuestion && !customQuestion.trim()) {
        showToast.error('질문을 선택하거나 직접 입력해주세요');
        return;
      }

      // 페이지 2로 이동
      setPage((prev) => prev + 1);
    } else if (page === 2) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <div className='space-y-5 relative'>
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
              className='bg-[#F3F3F5] rounded-lg p-4 text-sm mb-2 outline-gray-300'
              value={customQuestion}
              onChange={(e) => setCustomQuestion(e.target.value)}
            />
          </div>
        </>
      )}

      {page === 2 && (
        <>
          <div className='bg-black rounded-xl px-6 py-4 flex flex-col gap-4 text-white'>
            <p className='font-semibold text-lg'>질문</p>
            <p>{selectedQuestion || customQuestion}</p>
          </div>

          <div className='bg-white rounded-xl px-6 py-4 border border-[#E5E5E5] flex flex-col gap-4'>
            <p className='font-semibold'>면접 질문</p>
            <TextareaAutosize
              minRows={7}
              placeholder='면접 질문에 대한 답변을 작성해주세요'
              className='bg-[#F3F3F5] rounded-lg p-4 text-sm mb-2 outline-gray-300'
              value={customAnswer}
              onChange={(e) => setCustomAnswer(e.target.value)}
            />
          </div>
        </>
      )}

      {page === 3 && (
        <>
          <div className='bg-white rounded-xl px-6 py-4 border border-[#E5E5E5] flex flex-col gap-4'>
            <p className='font-semibold text-lg'>다음 단계 페이지</p>
            <p>{selectedQuestion || customQuestion}</p>
          </div>

          <div className='bg-white rounded-xl px-6 py-4 border border-[#E5E5E5] flex flex-col gap-4'>
            <p className='font-semibold'>면접 질문</p>
            <TextareaAutosize
              minRows={3}
              placeholder='면접 질문을 직접 입력하세요'
              className='bg-[#F3F3F5] rounded-lg p-4 text-sm mb-2'
              value={customAnswer}
              onChange={(e) => setCustomAnswer(e.target.value)}
            />
          </div>
        </>
      )}

      {page > 1 ? (
        <footer className='flex items-center gap-5'>
          <Button
            type='button'
            className='w-full ring bg-gray-50 ring-[#DADADA] font-medium'
            onClick={() => setPage((prev) => prev - 1)}
          >
            <FaAngleLeft /> 이전
          </Button>
          <Button
            type='button'
            className='w-full bg-black text-white font-medium'
            onClick={handleNextStep}
          >
            피드백 받기
          </Button>
        </footer>
      ) : (
        <Button
          type='button'
          className='w-full bg-black text-white font-medium'
          onClick={handleNextStep}
        >
          다음 <FaAngleRight />
        </Button>
      )}
    </div>
  );
};

export default CoachingPage;
