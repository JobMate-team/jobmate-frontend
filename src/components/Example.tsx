import { ShiningIcon } from '@/assets';
import Button from './common/Button';
import Modal from './common/Modal';
import { useState } from 'react';
import toast from 'react-hot-toast';

const Example = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        type='button'
        icon={<ShiningIcon className='h-5 w-5' />}
        className='border-[0.5px] border-gray-400 bg-white'
        onClick={() => setIsOpen((prev) => !prev)}
      >
        모달 열기
      </Button>
      <Button
        type='button'
        icon={<ShiningIcon className='h-5 w-5' />}
        className='mt-5 border-[0.5px] border-gray-400 bg-[#BFFCD9]'
        onClick={() => {
          toast.dismiss();
          toast.success('로그인 성공');
        }}
      >
        성공 토스트 열기
      </Button>

      <Button
        type='button'
        icon={<ShiningIcon className='h-5 w-5' />}
        className='mt-5 border-[0.5px] border-gray-400 bg-[#FFE0E1]'
        onClick={() => {
          toast.dismiss();
          toast.error('로그인 실패');
        }}
      >
        실패 토스트 열기
      </Button>

      {isOpen && (
        <Modal
          title='해당 히스토리를 삭제하시겠습니까?'
          content='이 작업은 되돌릴 수 없습니다. 모든 면접 답변 기록이 영구적으로 삭제됩니다.'
          onCancel={() => setIsOpen((prev) => !prev)}
          onConfirm={() => setIsOpen((prev) => !prev)}
        />
      )}
    </>
  );
};

export default Example;
