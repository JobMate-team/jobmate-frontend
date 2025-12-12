import { useState } from 'react';
import Button from '../common/Button';
import DropDown from './Dropdown';
import type { CommonItem } from '@/types/common';

interface ModalProps {
  companies: CommonItem[];
  onCancel: () => void;
}

const RecommendQuestionModal = ({ companies, onCancel }: ModalProps) => {
  const [selectCompanies, isSelectCompanies] = useState<string | null>(null);

  return (
    <div onClick={onCancel} className='fixed inset-0 bg-black/40 flex justify-center items-center'>
      <div
        onClick={(e) => e.stopPropagation()}
        className='bg-white rounded-[10px] flex flex-col overflow-hidden p-6 w-85 sm:w-100'
      >
        <p className='mb-1 font-medium'>어떤 기업에 지원하시나요?</p>
        <p className='text-xs text-[#717182] mb-4'>
          입력하신 기업의 데이터를 반영하여 질문을 생성합니다
        </p>
        <DropDown
          items={companies.map((c) => c.name)}
          selected={selectCompanies}
          placeholder='기업 예시'
          onSelect={(company) => isSelectCompanies(company)}
        />

        <p className='mb-1 my-8 font-medium'>어떤 기업에 지원하시나요?</p>
        <p className='text-xs text-[#717182] mb-4'>
          입력하신 기업의 데이터를 반영하여 질문을 생성합니다
        </p>
        <DropDown
          items={companies.map((c) => c.name)}
          selected={selectCompanies}
          placeholder='기업 예시'
          onSelect={(company) => isSelectCompanies(company)}
        />

        <div className='flex items-center justify-center gap-3 mt-6'>
          <Button
            type='button'
            onClick={onCancel}
            className='bg-white border border-[#DADADA] font-medium p-3 flex-1'
          >
            취소
          </Button>
          <Button type='button' className='bg-black text-white font-medium p-3 flex-1'>
            생성
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RecommendQuestionModal;
