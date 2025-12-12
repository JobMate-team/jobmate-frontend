import { useState } from 'react';
import Button from '../common/Button';
import DropDown from './Dropdown';
import type { CommonItem } from '@/types/common';
import { useQuery } from '@tanstack/react-query';
import { getUserInfo } from '@/api/auth';
import { showToast } from '@/utils/toast';
import { getJobRole } from '@/api/coaching';

interface ModalProps {
  companies: CommonItem[];
  jobCategoryId: number | undefined;
  onCancel: () => void;
}

const RecommendQuestionModal = ({ companies, jobCategoryId, onCancel }: ModalProps) => {
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

  const handleCreate = () => {
    if (!selectCompanies) {
      showToast.error('기업을 선택해주세요.');
      return;
    }

    isSetCreatePage(true);
  };

  const selectedJobList = JobRoleData?.success?.roles?.map((role) => role.name) || [];

  return (
    <div onClick={onCancel} className='fixed inset-0 bg-black/40 flex justify-center items-center'>
      <div
        onClick={(e) => e.stopPropagation()}
        className='bg-white rounded-[10px] flex flex-col overflow-hidden p-6 w-[90%] sm:w-110'
      >
        {isCreatePage ? (
          <>
            <p className='font-medium mb-7'>{userData?.success.nickname}님을 위한 추천 질문 목록</p>

            <div className='space-y-2'>
              <div className='flex items-center gap-3'>
                <div className='flex-1 bg-[#F9FAFB] border border-gray-200 rounded-xl p-2.5 flex items-center gap-2'>
                  <div className='bg-white border border-gray-200 text-xs py-1 px-2 rounded-lg font-medium'>
                    인성
                  </div>
                  <p className='text-sm break-keep'>자기소개 부탁드립니다</p>
                </div>

                <Button type='submit' className='bg-black text-white text-sm p-3.5 px-8 rounded-xl'>
                  선택
                </Button>
              </div>
            </div>
          </>
        ) : (
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
              onSelect={(company) => isSelectJob(company)}
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
      </div>
    </div>
  );
};

export default RecommendQuestionModal;
