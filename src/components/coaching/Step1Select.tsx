import TextareaAutosize from 'react-textarea-autosize';
import Button from '@/components/common/Button';
import DropDown from '@/components/ui/Dropdown';
import { FaAngleRight } from 'react-icons/fa6';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  getCategories,
  getCompanies,
  getJobRole,
  getQuestions,
  postQuestion,
} from '@/api/coaching';
import { useEffect, useState } from 'react';
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
  const [selectRole, isSelectRole] = useState<string | null>(null);
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

  const selectedJobCategoryId = jobCategories.find((c) => c.name === selectedJob)?.id;

  const { data: QuestionData } = useQuery({
    queryKey: ['questions', selectedJobCategoryId],
    queryFn: () => getQuestions(selectedJobCategoryId!),
    enabled: !!selectedJobCategoryId,
    staleTime: 5 * 60 * 1000,
  });

  const { data: JobRoleData } = useQuery({
    queryKey: ['jobRoles', selectedJobCategoryId],
    queryFn: () => getJobRole(selectedJobCategoryId!),
    enabled: !!selectedJobCategoryId,
    staleTime: 5 * 60 * 1000,
  });

  const questionList = QuestionData?.success.questions?.map((q) => q.text) || [];
  const selectedJobList = JobRoleData?.success?.roles?.map((role) => role.name) || [];

  const recommendMutation = useMutation({
    mutationFn: () => {
      if (!selectedJob || !selectRole || !selectCompanies) {
        throw new Error('모든 값을 선택해주세요.');
      }
      return postQuestion(selectedJob, selectRole, selectCompanies);
    },
    onSuccess: () => {
      showToast.success('추천 질문이 생성되었습니다.');
    },
    onError: () => {
      showToast.error('질문 생성에 실패했습니다.');
    },
  });

  const toggleCreateQuestion = () => {
    if (!selectedJob) {
      showToast.error('직군을 선택해주세요');
      return;
    }
    if (!selectCompanies) {
      showToast.error('기업을 선택해주세요');
      return;
    }
    if (!selectRole) {
      showToast.error('직군을 선택해주세요');
      return;
    }

    setIsModalOpen(true);
    recommendMutation.mutate();
  };

  useEffect(() => {
    setSelectedQuestion(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedJob]);

  return (
    <>
      <div className='bg-white rounded-xl px-6 py-4 border border-[#E5E5E5] flex flex-col gap-4'>
        <div className='flex gap-1'>
          <p className='font-semibold'>직군 선택</p>
          <span className='text-red-500'>*</span>
        </div>
        <DropDown
          items={jobCategories.map((c) => c.name)}
          selected={selectedJob}
          placeholder='직군 선택'
          onSelect={(job) => setSelectedJob(job)}
        />
      </div>

      <div className='bg-white rounded-xl px-6 py-4 border border-[#E5E5E5] flex flex-col gap-4'>
        <div className='flex gap-1'>
          <p className='font-semibold'>면접 질문</p>
          <span className='text-red-500'>*</span>
        </div>
        <DropDown
          disabled={!selectedJob}
          onDisabledClick={() => showToast.error('직군을 먼저 선택해주세요')}
          items={questionList}
          selected={selectedQuestion}
          placeholder='기본 질문 예시'
          onSelect={(question) => setSelectedQuestion(question)}
        />

        <p className='font-semibold mt-4'>또는 직접 입력</p>
        <TextareaAutosize
          minRows={6}
          placeholder='면접 질문을 직접 입력하세요'
          className='bg-[#F3F3F5] rounded-lg p-4 max-sm:text-sm border border-transparent focus:border-gray-300 focus:outline-none leading-6'
          value={customQuestion}
          onChange={(e) => setCustomQuestion(e.target.value)}
        />
        <div className='sm:flex flex-row gap-5 mb-2'>
          <div className='sm:flex-1'>
            <div className='flex gap-1 mt-4 mb-1'>
              <p className='font-semibold'>특정 기업 중심 피드백</p>
              <span className='text-red-500'>*</span>
            </div>
            <p className='text-xs text-[#717182] font-medium mb-2'>
              입력하신 기업 인재상을 반영하여 면접 답변을 피드백해드립니다
            </p>
            <DropDown
              items={companies.map((c) => c.name)}
              selected={selectCompanies}
              placeholder='기업 선택'
              onSelect={(company) => isSelectCompanies(company)}
            />
          </div>

          <div className='sm:flex-1 max-sm:mt-8'>
            <div className='flex gap-1 mt-4 mb-1'>
              <p className='font-semibold'>지원 직무</p>
              <span className='text-red-500'>*</span>
            </div>
            <p className='text-xs text-[#717182] font-medium mb-2'>
              직무에 맞춘 맞춤형 면접 질문을 생성합니다
            </p>
            <DropDown
              disabled={!selectedJob}
              onDisabledClick={() => showToast.error('직군을 먼저 선택해주세요')}
              items={selectedJobList}
              selected={selectRole}
              placeholder='프론트엔드 개발자'
              onSelect={(role) => isSelectRole(role)}
            />
          </div>
        </div>

        <div className='w-full text-center mt-2'>
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
        <RecommendQuestionModal
          recommendedQuestions={recommendMutation.data?.success.questions}
          isLoading={recommendMutation.isPending}
          setCustomQuestion={setCustomQuestion}
          onCancel={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};

export default Step1Select;
