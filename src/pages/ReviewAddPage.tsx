import Button from '@/components/common/Button';
import DropDown from '@/components/ui/Dropdown';
import { jobItems } from '@/data/coachItems';
import { showToast } from '@/utils/toast';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { IoIosClose } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import TextareaAutosize from 'react-textarea-autosize';

const ReviewAddPage = () => {
  const [isOpen, setISOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => setISOpen(true), 10); // mount 후 transition 트리거
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      if (isOpen) {
        handleClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const handleClose = () => {
    setISOpen(false);
    setTimeout(() => navigate('/review'), 200); // 애니메이션 끝난 뒤 닫기
  };

  const handleCreate = () => {
    showToast.success('등록되었습니다');
    navigate('/review');
  };

  return (
    <div
      className={clsx(
        'fixed inset-0 bg-black/40 transition-opacity duration-300',
        isOpen ? 'opacity-100' : 'opacity-0',
      )}
      onClick={() => handleClose()}
    >
      <main
        onClick={(e) => e.stopPropagation()}
        className={clsx(
          'fixed bottom-0 left-1/2 transform -translate-x-1/2 h-[90vh] bg-white rounded-t-2xl shadow-xl transition-transform duration-300 overflow-y-auto hide-scrollbar',
          'w-full max-w-4xl p-8',
          isOpen ? 'translate-y-0' : 'translate-y-full',
        )}
      >
        <section className='flex flex-col mb-10'>
          <div className='flex items-center justify-between mb-3'>
            <h3 className='text-lg font-semibold'>면접 후기 작성</h3>
            <button
              onClick={handleClose}
              className='text-[#0A0A0A] bg-white rounded-full hover:brightness-90 transition'
            >
              <IoIosClose size={30} />
            </button>
          </div>
          <p className='text-[#717182]'>본인의 면접 경험을 공유해주세요</p>
        </section>

        <section className='space-y-5 mb-10'>
          <form className='flex flex-col gap-6'>
            <div className='flex gap-9'>
              <div className='flex flex-col gap-2'>
                <label className='font-medium'>
                  작성자 <span className='text-red-500'>*</span>
                </label>
                <input
                  type='text'
                  placeholder='예: 정찬원'
                  value='정찬원'
                  className='w-full bg-[#F3F3F5] px-4 py-3 rounded-lg border border-transparent focus:border-gray-300 focus:outline-none'
                />
              </div>
              <div className='flex flex-col gap-2'>
                <label className='font-medium'>
                  회사명 <span className='text-red-500'>*</span>
                </label>

                <input
                  type='text'
                  placeholder='예: 잡메이트'
                  className='w-full bg-[#F3F3F5] px-4 py-3 rounded-lg border border-transparent focus:border-gray-300 focus:outline-none'
                />
              </div>
            </div>

            <div className='flex flex-col gap-2'>
              <label className='font-medium'>
                지원 직군 <span className='text-red-500'>*</span>
              </label>

              <DropDown
                items={jobItems}
                selected={selectedJob}
                placeholder='직군 선택'
                onSelect={(question) => setSelectedJob(question)}
              />
            </div>

            <div className='flex flex-col gap-2'>
              <label className='font-medium'>
                면접 후기 <span className='text-red-500'>*</span>
              </label>

              <TextareaAutosize
                minRows={10}
                placeholder='면접 과정, 질문 내용, 분위기 등 자유롭게 작성해주세요'
                className='w-full bg-[#F3F3F5] px-4 py-3 rounded-lg border border-transparent focus:border-gray-300 focus:outline-none leading-6'
              />
            </div>

            <div className='flex flex-col gap-2'>
              <label className='font-medium'>
                💡 면접 준비 팁 <span className='text-red-500'>*</span>
              </label>

              <TextareaAutosize
                minRows={10}
                placeholder='면접 과정, 질문 내용, 분위기 등 자유롭게 작성해주세요'
                className='w-full bg-[#F3F3F5] px-4 py-3 rounded-lg border border-transparent focus:border-gray-300 focus:outline-none leading-6'
              />
            </div>
          </form>
        </section>

        <section className='flex items-center gap-3 sm:mb-5 mb-20'>
          <Button
            type='button'
            onClick={() => setISOpen(false)}
            className='bg-white border border-[#DADADA] px-4 py-3 w-[30%]'
          >
            취소
          </Button>
          <Button
            type='submit'
            onClick={handleCreate}
            className='bg-black text-white px-4 py-3 w-[70%]'
          >
            등록하기
          </Button>
        </section>
      </main>
    </div>
  );
};

export default ReviewAddPage;
