import Button from '@/components/common/Button';
import DropDown from '@/components/ui/Dropdown';
import { jobItems, JOB_CATEGORY_MAP } from '@/data/coachItems';
import { showToast } from '@/utils/toast';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { IoIosClose } from 'react-icons/io';
import { useNavigate, useParams } from 'react-router-dom';
import TextareaAutosize from 'react-textarea-autosize';
import { fetchUserReviewDetail, updateReview } from '@/api/review';
import { useSetAtom } from 'jotai';
import { reviewRefreshAtom } from '@/atoms';

const ReviewEditPage = () => {
  const [isOpen, setISOpen] = useState(false);
  const { id } = useParams<{ id: string }>();
  const setReviewRefresh = useSetAtom(reviewRefreshAtom);
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [companyName, setCompanyName] = useState('');
  const [content, setContent] = useState('');
  const [tips, setTips] = useState('');
  const [authorName, setAuthorName] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetchUserReviewDetail(Number(id)).then((data) => {
        if (data) {
          setCompanyName(data.company_name);
          setContent(data.content);
          setTips(data.interview_tip || '');
          setSelectedJob(data.job_category_name);
          setAuthorName(data.nickname);
        }
      });
    }
  }, [id]);

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

  const handleUpdate = async () => {
    if (!companyName.trim()) {
      showToast.error('회사명을 입력해주세요.');
      return;
    }
    if (!selectedJob) {
      showToast.error('직군을 선택해주세요.');
      return;
    }
    if (!content.trim()) {
      showToast.error('면접 후기를 입력해주세요.');
      return;
    }
    if (!tips.trim()) {
      showToast.error('면접 준비 팁을 입력해주세요.');
      return;
    }

    if (!id) return;

    try {
      const response = await updateReview(Number(id), {
        company_name: companyName,
        job_category_id: JOB_CATEGORY_MAP[selectedJob] || 0,
        content: content,
        interview_tip: tips,
      });

      if (response) {
        showToast.success('수정되었습니다');
        setReviewRefresh((prev) => prev + 1);
        navigate('/review');
      } else {
        showToast.error('수정에 실패했습니다.');
      }
    } catch (error) {
      console.error(error);
      showToast.error('수정 중 오류가 발생했습니다.');
    }
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
            <h3 className='text-lg font-semibold'>면접 후기 수정</h3>
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
                  value={authorName}
                  readOnly
                  placeholder='작성자'
                  className='w-full bg-[#F3F3F5] px-4 py-3 rounded-lg border border-transparent focus:border-gray-300 focus:outline-none text-gray-500'
                />
              </div>
              <div className='flex flex-col gap-2'>
                <label className='font-medium'>
                  회사명 <span className='text-red-500'>*</span>
                </label>

                <input
                  type='text'
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
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
                value={content}
                onChange={(e) => setContent(e.target.value)}
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
                value={tips}
                onChange={(e) => setTips(e.target.value)}
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
            onClick={handleUpdate}
            className='bg-black text-white px-4 py-3 w-[70%]'
          >
            수정하기
          </Button>
        </section>
      </main>
    </div>
  );
};

export default ReviewEditPage;
