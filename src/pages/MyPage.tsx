import { useNavigate } from 'react-router-dom';
import { RightIcon } from '@/assets';
import { User, Briefcase, Shield, Moon, LogOut, ChevronDown } from 'lucide-react';
import clsx from 'clsx';
import { useState } from 'react';
import { IoIosClose } from 'react-icons/io';
import { jobItems } from '@/data/coachItems';
import DropDown from '@/components/ui/Dropdown';
import { useAtom, useSetAtom } from 'jotai';
import { isAdminLoginModalAtom, isAdminModeAtom, isLogoutModalAtom } from '@/atoms';
import Button from '@/components/common/Button';
import { showToast } from '@/utils/toast';

const MyPage = () => {
  const [isDark, setIsDark] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isChangeJob, setIsChangeJob] = useState(false);
  const [selectedJob, setSelectedJob] = useState<string | null>(null);

  const setIsAdminModalOpen = useSetAtom(isAdminLoginModalAtom);
  const [isAdminMode] = useAtom(isAdminModeAtom);
  const setIsModalOpen = useSetAtom(isLogoutModalAtom);

  const navigate = useNavigate();

  const handleProfileSave = () => {
    setIsEditOpen(false);
    showToast.success('저장되었습니다');
  };

  const handleJobSave = () => {
    if (!selectedJob) {
      showToast.error('직무를 선택해주세요');
      return;
    }
    setIsChangeJob(false);
    setSelectedJob(null);
    showToast.success('저장되었습니다');
  };

  const handleChangeMode = () => {
    if (isAdminMode) {
      setIsModalOpen(true);
    } else {
      setIsAdminModalOpen(true);
    }
  };

  return (
    <div
      className='fixed inset-0 bg-black/40 flex justify-center items-center'
      onClick={() => {
        navigate(-1);
      }}
    >
      <main
        onClick={(e) => e.stopPropagation()}
        className='relative bg-white sm:rounded-xl flex flex-col overflow-y-auto px-5 py-8 sm:w-140 w-full sm:h-[80%] h-full hide-scrollbar'
      >
        <div className='absolute top-0 left-0 w-full h-[40%] bg-black sm:rounded-t-xl sm:border max-sm:border-none border-[#3b3b3b]' />

        <div className='relative z-10 space-y-10 max-sm:mb-20'>
          <section className='flex items-center justify-between mb-10'>
            <h2 className='text-xl text-white'>마이페이지</h2>
            <button
              onClick={() => navigate(-1)}
              className='max-sm:hidden text-white rounded-full hover:text-gray-300 transition'
            >
              <IoIosClose size={35} />
            </button>
          </section>

          <section className='bg-white rounded-xl p-5 py-10 flex items-center gap-4 shadow-md'>
            <div className='w-15 h-15 bg-black text-white rounded-full flex items-center justify-center text-2xl font-medium'>
              정
            </div>
            <div className='flex flex-col'>
              <div className='flex items-center gap-2'>
                <p className='font-semibold text-lg'>정찬원</p>
                <div className='bg-[#F3F3F5] items-center px-3 py-1 text-sm font-medium rounded-xl border border-gray-300'>
                  IT
                </div>
              </div>
              <p className='mt-2'>example.example.com</p>
            </div>
          </section>

          <section className='bg-white rounded-xl p-5 shadow-md border border-black/10'>
            <article className='flex flex-col gap-4'>
              <div className='flex gap-4'>
                <div className='bg-[#DBEAFE] rounded-[10px] p-3 flex items-center justify-center font-semibold'>
                  <User className='text-[#155DFC]' />
                </div>
                <div className='sm:text-lg flex items-center justify-between w-full'>
                  <p>프로필 수정</p>
                  <button
                    type='button'
                    onClick={() => setIsEditOpen((prev) => !prev)}
                    className='text-[#99A1AF] hover:brightness-80 rounded-full p-1 transition cursor-pointer'
                  >
                    <ChevronDown
                      size={24}
                      className={clsx(isEditOpen ? 'rotate-180' : 'rotate-0')}
                    />
                  </button>
                </div>
              </div>

              {isEditOpen && (
                <form className='space-y-4 mt-2'>
                  <label className='font-medium'>이름</label>
                  <input
                    type='text'
                    placeholder='정찬원'
                    value='정찬원'
                    className='w-full bg-[#F3F3F5] px-4 py-3 rounded-lg border border-transparent focus:border-gray-300 focus:outline-none mt-2'
                  />

                  <p className='font-medium mt-2'>이메일</p>
                  <div className='w-full bg-[#F3F3F5] p-4 rounded-lg mt-2'>example.example.com</div>

                  <div className='flex justify-end'>
                    <Button
                      type='submit'
                      onClick={handleProfileSave}
                      className='bg-black text-white p-3 w-20'
                    >
                      저장
                    </Button>
                  </div>
                </form>
              )}
            </article>

            <div className='h-px w-full my-5 bg-gray-200' />

            <article className='flex flex-col gap-4'>
              <div className='flex items-center gap-4'>
                <div className='bg-[#F3E8FF] rounded-[10px] p-3 flex items-center justify-center font-semibold'>
                  <Briefcase className='text-[#9810FA]' />
                </div>
                <div className='sm:text-lg flex items-center justify-between w-full'>
                  <p>지원 직군 변경</p>
                  <button
                    type='button'
                    onClick={() => setIsChangeJob((prev) => !prev)}
                    className='text-[#99A1AF] hover:brightness-80 rounded-full p-1 transition cursor-pointer'
                  >
                    <ChevronDown
                      size={24}
                      className={clsx(isChangeJob ? 'rotate-180' : 'rotate-0')}
                    />
                  </button>
                </div>
              </div>

              {isChangeJob && (
                <div className='flex flex-col gap-4 mt-2'>
                  <DropDown
                    items={jobItems}
                    selected={selectedJob}
                    placeholder='직군 선택'
                    onSelect={(question) => setSelectedJob(question)}
                  />
                  <div className='flex justify-end'>
                    <Button
                      type='submit'
                      onClick={handleJobSave}
                      className='bg-black text-white p-3 w-20'
                    >
                      저장
                    </Button>
                  </div>
                </div>
              )}
            </article>
          </section>

          <section className='bg-white rounded-xl p-5 shadow-md border border-black/10'>
            <article className='flex items-center gap-4'>
              <div className='bg-[#F3F4F6] rounded-[10px] p-3 flex items-center justify-center font-semibold'>
                <Moon className='text-[#4A5565]' />
              </div>
              <div className='sm:text-lg flex items-center justify-between w-full'>
                <p>다크모드</p>
                <button
                  type='button'
                  onClick={() => setIsDark((prev) => !prev)}
                  className={clsx(
                    'relative bg-[#CBCED4] w-12 h-7 rounded-full p-1 transition-all duration-300 ease-in-outfocus:outline-none',
                    isDark
                      ? 'bg-linear-to-r from-purple-600 to-indigo-600 focus:ring-purple-500/50'
                      : 'bg-linear-to-r from-blue-400 to-cyan-400 focus:ring-blue-400/50',
                  )}
                >
                  <div
                    className={clsx(
                      'w-5 h-5 bg-white rounded-full shadow-lg transform transition-all duration-300 ease-in-out flex items-center justify-center',
                      isDark ? 'translate-x-5' : 'translate-x-0',
                    )}
                  ></div>
                </button>
              </div>
            </article>

            <div className='h-px w-full my-5 bg-gray-200' />

            <article className='flex items-center gap-4'>
              <div
                className={clsx(
                  'rounded-[10px] p-3 flex items-center justify-center font-semibold',
                  isAdminMode ? 'bg-[#DBEAFE]' : 'bg-[#FFE2E2]',
                )}
              >
                <Shield className={clsx(isAdminMode ? 'text-[#155DFC]' : 'text-[#E7000B]')} />
              </div>
              <div className='sm:text-lg flex items-center justify-between w-full'>
                <p>{isAdminMode ? '일반 사용자 모드' : '관리자 모드'}</p>
                <button
                  type='button'
                  onClick={handleChangeMode}
                  className='hover:brightness-80 rounded-full p-1 transition cursor-pointer outline-none'
                >
                  <RightIcon className='h-4 w-4' />
                </button>
              </div>
            </article>
          </section>

          <section className='bg-white rounded-xl p-5 shadow-md border border-black/10'>
            <article className='flex items-center gap-4'>
              <div className='px-3 py-1 flex items-center justify-center font-semibold'>
                <LogOut className='text-[#FB2C36]' />
              </div>
              <div className='sm:text-lg flex items-center justify-between w-full'>
                <p>로그아웃</p>
                <button
                  type='button'
                  onClick={() => setIsModalOpen(true)}
                  className='hover:brightness-80 rounded-full p-1 transition cursor-pointer outline-none'
                >
                  <RightIcon className='h-4 w-4' />
                </button>
              </div>
            </article>
          </section>

          <section className='text-center text-[#6A7282] mt-12'>
            <p>JobMate.AI v1.0.0</p>
            <p className='mt-3'>© 2025 코치봇스</p>
          </section>
        </div>
      </main>
    </div>
  );
};

export default MyPage;
