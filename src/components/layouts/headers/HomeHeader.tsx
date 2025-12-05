import { useState, useEffect, useRef } from 'react';
import { LogOut } from 'lucide-react';
import { useAtom } from 'jotai';
import { isLogoutModalAtom } from '@/atoms';

const HomeHeader = () => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useAtom(isLogoutModalAtom);

  // ref 생성
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        menuRef.current &&
        !menuRef.current.contains(target) &&
        buttonRef.current &&
        !buttonRef.current.contains(target)
      ) {
        setIsProfileMenuOpen(false);
      }
    };

    if (isProfileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isProfileMenuOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsLogoutModalOpen(false);
      }
    };

    if (isLogoutModalOpen) {
      document.addEventListener('keydown', handleEsc);
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogoutModalOpen]);

  return (
    <div className='relative flex justify-between items-center p-4 bg-black'>
      <h3 className='text-white text-2xl font-semibold'>JobMate.AI</h3>

      {/* 프로필 버튼 */}
      <button
        ref={buttonRef}
        type='button'
        className='w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center font-semibold text-lg text-gray-500'
        onClick={() => setIsProfileMenuOpen((prev) => !prev)}
      >
        정
      </button>

      {/* 프로필 메뉴 */}
      {isProfileMenuOpen && (
        <div
          ref={menuRef}
          className='absolute top-15 right-2 mt-2 w-56 bg-white shadow-lg rounded-lg border border-[#DADADA] p-3'
        >
          <div className='flex items-center gap-3 p-2'>
            <div className='w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center font-semibold text-sm text-gray-500'>
              정
            </div>
            <div className='flex flex-col'>
              <span className='text-sm font-medium whitespace-nowrap'>정찬원</span>
              <span className='text-xs text-gray-500 whitespace-nowrap'>myemail@example.com</span>
            </div>
          </div>

          <div className='h-px w-full my-3 bg-gray-200' />
          <button
            className='w-full text-left text-sm px-3 py-2 rounded-lg hover:bg-red-50 mt-2 flex items-center font-medium gap-2 text-red-600'
            onClick={() => {
              setIsLogoutModalOpen(true);
              setIsProfileMenuOpen(false);
            }}
          >
            <LogOut size={16} />
            로그아웃
          </button>
        </div>
      )}
    </div>
  );
};

export default HomeHeader;
