import { isAdminModeAtom, isLogoutModalAtom, pageAtom } from '@/atoms';
import { adminMenuItems, menuItems } from '@/data/menuItems';
import type { MenuItem } from '@/types/MenuItem';
import clsx from 'clsx';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { LogOut, Menu, PanelLeft, Shield } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const SideBar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const setPage = useSetAtom(pageAtom);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useAtom(isLogoutModalAtom);
  const isAdminMode = useAtomValue(isAdminModeAtom);

  const navigate = useNavigate();
  const location = useLocation();

  const itemsToRender = isAdminMode ? adminMenuItems : menuItems;

  // --- ref 생성 ---
  const profileButtonRef = useRef<HTMLDivElement>(null);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  // --- 외부 클릭 시 메뉴 닫기 ---
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(e.target as Node) &&
        profileButtonRef.current &&
        !profileButtonRef.current.contains(e.target as Node)
      ) {
        setIsProfileMenuOpen(false);
      }
    };

    if (isProfileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
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

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 768px)');

    const handleResize = () => {
      setIsSidebarOpen(mediaQuery.matches);
    };

    handleResize();
    mediaQuery.addEventListener('change', handleResize);

    return () => mediaQuery.removeEventListener('change', handleResize);
  }, []);

  const handleMenuClick = (item: MenuItem) => {
    const segments = location.pathname.split('/').filter(Boolean);

    if (item.path === '/coaching') {
      setPage(1);
    }

    if (item.path === '/my') {
      const topLevel = '/' + (segments[0] || '');
      const target = topLevel === '/' ? '/my' : `${topLevel}/my`;
      navigate(target);
      return;
    }

    navigate(item.path);
  };

  return (
    <aside
      className={clsx(
        'relative hidden sm:flex bg-white border-r border-gray-200 flex-col transition-all duration-150',
        isSidebarOpen ? 'w-64' : 'w-20',
      )}
    >
      {/* 헤더 */}
      {isSidebarOpen ? (
        <div className='p-4 border-b border-gray-200 flex flex-col space-y-2'>
          <div className='flex flex-row justify-between items-center'>
            <h1 className='leading-6 font-semibold text-xl whitespace-nowrap'>JobMate.AI</h1>
            <button
              type='button'
              onClick={() => setIsSidebarOpen((prev) => !prev)}
              className='rounded-full p-2 hover:bg-gray-200 transition-colors'
            >
              <PanelLeft size={20} />
            </button>
          </div>
        </div>
      ) : (
        <div className='p-4 border-b border-gray-200 pl-[22px]'>
          <button
            type='button'
            onClick={() => setIsSidebarOpen((prev) => !prev)}
            className='rounded-full p-2 hover:bg-gray-200 transition-colors'
          >
            <Menu size={20} />
          </button>
        </div>
      )}

      {/* 메뉴 */}
      <nav className='flex-1 p-4'>
        {itemsToRender.map((item) => {
          const Icon = item.icon;
          const segments = location.pathname.split('/').filter(Boolean);
          const last = segments[segments.length - 1];
          const currentPathForActive = last === 'my' ? '/my' : `/${segments[0] || ''}`;
          const isActive = item.path === currentPathForActive;

          return (
            <button
              key={item.id}
              onClick={() => handleMenuClick(item)}
              className={clsx(
                'w-full flex items-center mb-2 rounded-lg py-3 transition-colors px-3.5 gap-3',
                isActive ? 'bg-black text-white' : 'hover:bg-gray-200',
              )}
            >
              <Icon className='w-5 h-5 min-w-5' />
              {isSidebarOpen && <span className='whitespace-nowrap'>{item.label}</span>}
            </button>
          );
        })}
      </nav>

      {/* 프로필 버튼 */}
      {isSidebarOpen && (
        <div className='p-4 border-t border-gray-200'>
          {!isAdminMode ? (
            <div
              ref={profileButtonRef}
              onClick={() => setIsProfileMenuOpen((prev) => !prev)}
              className='flex items-center gap-3 p-2 rounded-lg hover:bg-gray-200 cursor-pointer transition'
            >
              <div className='w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center font-semibold text-sm text-gray-500'>
                정
              </div>
              <div
                className={clsx(
                  'flex flex-col overflow-hidden transition-all duration-200',
                  isSidebarOpen ? 'opacity-100 translate-x-0 w-32' : 'opacity-0 -translate-x-2 w-0',
                )}
              >
                <span className='text-sm font-medium whitespace-nowrap'>정찬원</span>
                <span className='text-xs text-gray-500 whitespace-nowrap'>myemail@example.com</span>
              </div>
            </div>
          ) : (
            <div
              ref={profileButtonRef}
              onClick={() => setIsProfileMenuOpen((prev) => !prev)}
              className='flex items-center gap-3 p-2 rounded-lg hover:bg-gray-200 cursor-pointer transition'
            >
              <div className='bg-[#FFE2E2] text-white w-8 h-8 rounded-full p-2 flex items-center justify-center font-semibold'>
                <Shield className='text-[#E7000B]' />
              </div>
              <p>관리자 모드</p>
            </div>
          )}
        </div>
      )}

      {/* 프로필 메뉴 */}
      {isProfileMenuOpen && isSidebarOpen && (
        <div
          ref={profileMenuRef}
          className='absolute bottom-20 left-4 right-4 bg-white shadow-lg rounded-lg border border-[#DADADA] p-3 '
        >
          {!isAdminMode ? (
            <div className='flex items-center gap-3 p-2'>
              <div className='w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center font-semibold text-sm text-gray-500'>
                정
              </div>
              <div className='flex flex-col'>
                <span className='text-sm font-medium whitespace-nowrap'>정찬원</span>
                <span className='text-xs text-gray-500 whitespace-nowrap'>myemail@example.com</span>
              </div>
            </div>
          ) : (
            <div className='flex items-center gap-3 p-2'>
              <div className='bg-[#FFE2E2] text-white w-8 h-8 rounded-full p-2 flex items-center justify-center font-semibold'>
                <Shield className='text-[#E7000B]' />
              </div>
              <p>관리자 모드</p>
            </div>
          )}
          <div className='h-px w-full my-3 bg-gray-200' />
          <button
            type='button'
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
    </aside>
  );
};

export default SideBar;
