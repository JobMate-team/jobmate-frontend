import { useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import Button from '@/components/common/Button';
import DropDown from '@/components/ui/Dropdown';
import { FaAngleRight } from 'react-icons/fa6';

const CoachingPage = () => {
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);

  const jobItems = ['기획', '개발', '마케팅', '디자인', '영업', '인사'];
  const basicItems = ['하이'];

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
        />
      </div>
      <Button type='button' className='w-full bg-black text-white'>
        다음 단계 <FaAngleRight />
      </Button>
    </div>
  );
};

export default CoachingPage;
