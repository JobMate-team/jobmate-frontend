import TextareaAutosize from 'react-textarea-autosize';
import Button from '@/components/common/Button';
import DropDown from '@/components/ui/Dropdown';
import { FaAngleRight } from 'react-icons/fa6';
import { basicItems } from '@/data/coachItems';
import { useQuery } from '@tanstack/react-query';
import { getCategories, getCompanies } from '@/api/coaching';
import { useState } from 'react';
import { showToast } from '@/utils/toast';
import RecommendQuestionModal from '../ui/RecommendQuestionModal';

interface Props {
  selectedJob: string | null;
  // eslint-disable-next-line no-unused-vars
  setSelectedJob: (v: string | null) => void;
  selectedQuestion: string | null;
  // eslint-disable-next-line no-unused-vars
  setSelectedQuestion: (v: string | null) => void;
  customQuestion: string;
  // eslint-disable-next-line no-unused-vars
  setCustomQuestion: (v: string) => void;
  handleNextStep: () => void;
}

const Step1Select = ({
  selectedJob,
  setSelectedJob,
  selectedQuestion,
  setSelectedQuestion,
  customQuestion,
  setCustomQuestion,
  handleNextStep,
}: Props) => {
  const [selectCompanies, isSelectCompanies] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: jobData } = useQuery({
    queryKey: ['jobCategories'],
    queryFn: getCategories,
    gcTime: 10 * 60 * 1000,
    staleTime: 5 * 60 * 1000,
  });

  const { data: companyData } = useQuery({
    queryKey: ['companies'],
    queryFn: getCompanies,
    gcTime: 10 * 60 * 1000,
    staleTime: 5 * 60 * 1000,
  });

  const jobCategories = jobData?.success.jobCategories || [];
  const companies = companyData?.success.companies || [];

  const toggleCreateQuestion = () => {
    if (!selectedJob) {
      showToast.error('직군을 선택해주세요');
      return;
    } else setIsModalOpen(true);
  };

  return (
    <>
      <div className='bg-white rounded-xl px-6 py-4 border border-[#E5E5E5] flex flex-col gap-4'>
        <p className='font-semibold'>직군 선택</p>
        <DropDown
          items={jobCategories.map((c) => c.name)}
          selected={selectedJob}
          placeholder='직군 선택'
          onSelect={(job) => setSelectedJob(job)}
        />
      </div>

      <div className='bg-white rounded-xl px-6 py-4 border border-[#E5E5E5] flex flex-col gap-4'>
        <p className='font-semibold'>면접 질문</p>
        <DropDown
          items={basicItems}
          selected={selectedQuestion}
          placeholder='기본 질문 예시'
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

        <div>
          <p className='font-semibold mt-4 mb-1'>어떤 기업 중심의 피드백을 원하시나요? (옵션)</p>
          <p className='text-xs text-[#717182] font-medium'>
            입력하신 기업 인재상을 반영하여 면접 답변을 피드백해드립니다
          </p>
        </div>
        <DropDown
          items={companies.map((c) => c.name)}
          selected={selectCompanies}
          placeholder='기업 선택'
          onSelect={(company) => isSelectCompanies(company)}
        />

        <div className='w-full text-center'>
          <button
            type='button'
            onClick={toggleCreateQuestion}
            className='underline text-sm text-[#717182] hover:text-gray-800'
          >
            맞춤형 질문 생성하기
          </button>
        </div>
      </div>

      <Button
        type='button'
        className='w-full bg-black text-white font-medium sm:max-w-[80%] sm:mx-auto mt-10 px-4 py-3 gap-2'
        onClick={handleNextStep}
      >
        다음 <FaAngleRight />
      </Button>

      {isModalOpen && (
        <RecommendQuestionModal companies={companies} onCancel={() => setIsModalOpen(false)} />
      )}
    </>
  );
};

export default Step1Select;
