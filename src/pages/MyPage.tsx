import { useNavigate } from 'react-router-dom';
import { RightIcon } from '@/assets';
import { User, Briefcase, Shield, Moon, LogOut } from 'lucide-react';
import clsx from 'clsx';
import { useState } from 'react';
import { IoIosClose } from 'react-icons/io';

const MyPage = () => {
  const navigate = useNavigate();

  const [isDark, setIsDark] = useState(false);

  return (
    <div
      className='fixed inset-0 bg-black/40 flex justify-center items-center'
      onClick={() => {
        navigate(-1);
      }}
    >
      <main
        onClick={(e) => e.stopPropagation()}
        className='bg-black rounded-xl flex flex-col overflow-y-auto px-5 py-8 space-y-10 sm:w-140 w-full sm:h-[80%] h-full hide-scrollbar'
      >
        <section className='flex items-center justify-between mb-10'>
          <h2 className='text-xl text-white'>마이페이지</h2>
          <button
            onClick={() => navigate(-1)}
            className='text-white rounded-full hover:text-gray-300 transition'
          >
            <IoIosClose size={30} />
          </button>
        </section>

        <section className='bg-white rounded-xl p-5 pb-10 flex items-center gap-4 shadow-md'>
          <div className='w-15 h-15 bg-black text-white rounded-full flex items-center justify-center text-2xl font-medium'>
            정
          </div>
          <div className='flex flex-col'>
            <div className='flex items-center gap-2'>
              <p className='font-semibold text-lg'>정찬원</p>
              <div className='bg-black text-white items-center px-3 py-1 text-sm rounded-lg'>
                개발
              </div>
            </div>
            <p className='mt-2'>example.example.com</p>
          </div>
        </section>

        <section className='bg-white rounded-xl p-5 shadow-md'>
          <article className='flex items-center gap-4'>
            <div className='bg-[#DBEAFE] text-white rounded-[10px] p-3 flex items-center justify-center font-semibold'>
              <User className='text-[#155DFC]' />
            </div>
            <div className='sm:text-lg flex items-center justify-between w-full'>
              <p>프로필 수정</p>
              <button
                type='button'
                className='bg-white hover:brightness-90 rounded-full p-1 transition cursor-pointer'
              >
                <RightIcon className='h-4 w-4' />
              </button>
            </div>
          </article>

          <div className='h-px w-full my-5 bg-gray-200' />

          <article className='flex items-center gap-4'>
            <div className='bg-[#F3E8FF] text-white rounded-[10px] p-3 flex items-center justify-center font-semibold'>
              <Briefcase className='text-[#9810FA]' />
            </div>
            <div className='sm:text-lg flex items-center justify-between w-full'>
              <p>지원 직무 변경</p>
              <button
                type='button'
                className='bg-white hover:brightness-90 rounded-full p-1 transition cursor-pointer'
              >
                <RightIcon className='h-4 w-4' />
              </button>
            </div>
          </article>
        </section>

        <section className='bg-white rounded-xl p-5 shadow-md'>
          <article className='flex items-center gap-4'>
            <div className='bg-[#F3F4F6] text-white rounded-[10px] p-3 flex items-center justify-center font-semibold'>
              <Moon className='text-[#4A5565]' />
            </div>
            <div className='sm:text-lg flex items-center justify-between w-full'>
              <p>다크모드</p>
              <button
                onClick={() => setIsDark((prev) => !prev)}
                className={clsx(
                  'relative bg-[#CBCED4] w-12 h-7 rounded-full p-1 transition-all duration-300 ease-in-outfocus:outline-none',
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
            <div className='bg-[#FFE2E2] text-white rounded-[10px] p-3 flex items-center justify-center font-semibold'>
              <Shield className='text-[#E7000B]' />
            </div>
            <div className='sm:text-lg flex items-center justify-between w-full'>
              <p>관리자 모드</p>
              <button
                type='button'
                className='bg-white hover:brightness-90 rounded-full p-1 transition cursor-pointer'
              >
                <RightIcon className='h-4 w-4' />
              </button>
            </div>
          </article>
        </section>

        <section className='bg-white rounded-xl p-5 shadow-md'>
          <article className='flex items-center gap-4'>
            <div className='px-3 py-1 flex items-center justify-center font-semibold'>
              <LogOut className='text-[#FB2C36]' />
            </div>
            <div className='sm:text-lg flex items-center justify-between w-full'>
              <p>로그아웃</p>
              <button
                type='button'
                className='bg-white hover:brightness-90 rounded-full p-1 transition cursor-pointer'
              >
                <RightIcon className='h-4 w-4' />
              </button>
            </div>
          </article>
        </section>

        <section className='text-center text-[#6A7282] mt-6'>
          <p>JobMate.AI v1.0.0</p>
          <p className='mt-1'>© 2025 코치봇스</p>
        </section>
      </main>
    </div>
  );
};

export default MyPage;
