import { useState } from 'react';
import Button from '../common/Button';
import DropDown from './Dropdown';
import type { CommonItem } from '@/types/common';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getUserInfo } from '@/api/auth';
import { showToast } from '@/utils/toast';
import { getJobRole, postQuestion } from '@/api/coaching';
import LoadingComponent from './LoadingComponent';

interface ModalProps {
  companies: CommonItem[];
  selectedJob: string | null;
  jobCategoryId: number | undefined;
  // eslint-disable-next-line no-unused-vars
  setCustomQuestion: (v: string) => void;
  onCancel: () => void;
}

const RecommendQuestionModal = ({
  companies,
  selectedJob,
  jobCategoryId,
  setCustomQuestion,
  onCancel,
}: ModalProps) => {
  const [selectCompanies, isSelectCompanies] = useState<string | null>(null);
  const [selectJob, isSelectJob] = useState<string | null>(null);
  const [isCreatePage, isSetCreatePage] = useState(false);

  const { data: userData } = useQuery({
    queryKey: ['userInfo'],
    queryFn: getUserInfo,
    gcTime: 10 * 60 * 1000,
    staleTime: 5 * 60 * 1000,
  });

  const { data: JobRoleData } = useQuery({
    queryKey: ['questions', jobCategoryId],
    queryFn: () => getJobRole(jobCategoryId!),
    enabled: !!jobCategoryId,
  });

  const selectedJobList = JobRoleData?.success?.roles?.map((role) => role.name) || [];

  const RecommendQuestionMutation = useMutation({
    mutationFn: () => {
      if (!selectedJob || !selectJob || !selectCompanies) {
        throw new Error('모든 값을 선택해주세요.');
      }
      return postQuestion(selectedJob, selectJob, selectCompanies);
    },
    onSuccess: () => {
      showToast.success('추천 질문이 생성되었습니다.');
      isSetCreatePage(true);
    },
    onError: () => {
      showToast.error('질문 생성에 실패했습니다.');
    },
  });

  const handleCreate = () => {
    RecommendQuestionMutation.mutate();
  };

  const categoryMap: Record<string, string> = {
    Tenacity: '인성',
    Tech: '기술',
    Job: '직무',
    Experience: '경험',
    Behavior: '가치관',
  };

  return (
    <div onClick={onCancel} className='fixed inset-0 bg-black/40 flex justify-center items-center'>
      <div
        onClick={(e) => e.stopPropagation()}
        className='bg-white rounded-[10px] flex flex-col overflow-y-auto p-6 w-[90%] sm:w-110 min-h-85 max-h-[70%] hide-scrollbar'
      >
        {RecommendQuestionMutation.isPending && (
          <div>
            <LoadingComponent />
          </div>
        )}

        {!isCreatePage && !RecommendQuestionMutation.isPending && (
          <>
            <p className='mb-1 font-medium'>어떤 기업에 지원하시나요?</p>
            <p className='text-xs text-[#717182] font-medium mb-4'>
              입력하신 기업의 데이터를 반영하여 질문을 생성합니다
            </p>
            <DropDown
              items={companies.map((c) => c.name)}
              selected={selectCompanies}
              placeholder='기업 선택'
              onSelect={(company) => isSelectCompanies(company)}
            />

            <p className='mb-1 my-8 font-medium'>지원하시는 직무가 무엇인가요?</p>
            <p className='text-xs text-[#717182] font-medium mb-4'>
              직무에 맞춘 맞춤형 면접 질문을 생성합니다
            </p>
            <DropDown
              items={selectedJobList}
              selected={selectJob}
              placeholder='프론트엔드 개발자'
              onSelect={(job) => isSelectJob(job)}
            />

            <div className='flex items-center justify-center gap-3 mt-6'>
              <Button
                type='button'
                onClick={onCancel}
                className='bg-white border border-[#DADADA] font-medium p-3 flex-1'
              >
                취소
              </Button>
              <Button
                type='button'
                onClick={handleCreate}
                className='bg-black text-white font-medium p-3 flex-1'
              >
                생성
              </Button>
            </div>
          </>
        )}

        {isCreatePage && RecommendQuestionMutation.data?.success.questions && (
          <div className='space-y-5 mt-4'>
            <p className='font-medium mb-7'>{userData?.success.nickname}님을 위한 추천 질문 목록</p>
            {RecommendQuestionMutation.data.success.questions.map((q, idx) => (
              <div key={idx} className='flex items-center'>
                <div className=' bg-[#F9FAFB] border border-gray-200 rounded-xl p-4 flex flex-col gap-4'>
                  <div className='flex items-center justify-between'>
                    <div className='bg-white border border-gray-200 text-xs py-1 px-2 rounded-lg font-medium whitespace-nowrap text-center'>
                      {categoryMap[q.category] || q.category}
                    </div>
                    <Button
                      type='button'
                      onClick={() => {
                        setCustomQuestion(q.question);
                        onCancel();
                      }}
                      className='bg-black text-white text-sm py-2 px-6 rounded-xl'
                    >
                      선택
                    </Button>
                  </div>
                  <p className='text-sm break-keep'>{q.question}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecommendQuestionModal;
