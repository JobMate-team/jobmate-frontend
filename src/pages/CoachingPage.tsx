import Button from '@/components/common/Button';
import { ChevronDown } from 'lucide-react';
import { FaAngleRight } from 'react-icons/fa6';
import TextareaAutosize from 'react-textarea-autosize';

const CoachingPage = () => {
  return (
    <div className='space-y-5'>
      <div className='bg-white rounded-xl px-6 py-4 cursor-pointer border border-[#E5E5E5] flex flex-col gap-4'>
        <p className='font-semibold'>직무 선택</p>
        <div className='bg-[#F3F3F5] rounded-lg p-2.5 px-4 text-sm flex justify-between'>
          <p className='text-[#717182]'>직무 선택</p>
          <ChevronDown size={20} stroke='#717182' />
        </div>
      </div>
      <div className='bg-white rounded-xl px-6 py-4 cursor-pointer border border-[#E5E5E5] flex flex-col gap-4'>
        <p className='font-semibold'>면접 질문</p>
        <div className='bg-[#F3F3F5] rounded-lg p-2.5 px-4 text-sm mb-5 flex justify-between'>
          <p className='text-[#717182]'>기본 질문 선택</p>
          <ChevronDown size={20} stroke='#717182' />
        </div>
        <p className='font-semibold'>또는 직접 입력</p>
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
