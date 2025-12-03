import { useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import Button from '@/components/common/Button';
import DropDown from '@/components/ui/Dropdown';
import { FaAngleRight } from 'react-icons/fa6';
import { showToast } from '@/utils/toast';

const CoachingPage = () => {
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);
  const [customQuestion, setCustomQuestion] = useState<string>('');

  const jobItems = ['기획', '개발', '마케팅', '디자인', '영업', '인사'];
  const basicItems = [
    '자기소개 부탁드립니다.',
    '가장 어려웠던 기술적 문제와 해결 방법은?',
    '최근에 관심있는 기술 트렌드는 무엇인가요?',
    '코드 리뷰에서 가장 중요하게 생각하는 것은?',
    '본인의 개발 철학은 무엇인가요?',
  ];

  const handleNextStep = () => {
    // 직무 선택 체크
    if (!selectedJob) {
      showToast.error('직무를 선택해주세요');
      return;
    }

    // 면접 질문 체크 (선택 또는 직접 입력)
    if (!selectedQuestion && !customQuestion.trim()) {
      showToast.error('질문을 선택하거나 직접 입력해주세요');
      return;
    }

    console.log('선택 완료:', {
      selectedJob,
      selectedQuestion: selectedQuestion || customQuestion,
    });
  };

  return (
    <div className='space-y-5 relative'>
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
          className='bg-[#F3F3F5] rounded-lg p-4 text-sm mb-2'
          value={customQuestion}
          onChange={(e) => setCustomQuestion(e.target.value)}
        />
      </div>
      <Button type='button' className='w-full bg-black text-white' onClick={handleNextStep}>
        다음 단계 <FaAngleRight />
      </Button>
    </div>
  );
};

export default CoachingPage;
