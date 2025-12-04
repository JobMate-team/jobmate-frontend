import { pageAtom } from '@/atoms';
import { menuItems } from '@/data/menuItems';
import type { MenuItem } from '@/types/MenuItem';
import clsx from 'clsx';
import { useSetAtom } from 'jotai';
import { Menu, PanelLeft } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const SideBar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const setPage = useSetAtom(pageAtom);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 768px)');

    const handleResize = () => {
      setIsSidebarOpen(mediaQuery.matches);
    };

    handleResize(); // 초기 실행
    mediaQuery.addEventListener('change', handleResize);

    return () => mediaQuery.removeEventListener('change', handleResize); // cleanUp
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
        'hidden sm:flex bg-white border-r border-gray-200 flex-col transition-all duration-150',
        isSidebarOpen ? 'w-64' : 'w-20',
      )}
    >
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

      <nav className='flex-1 p-4'>
        {menuItems.map((item) => {
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

      {isSidebarOpen && (
        <div className='p-4 border-t border-gray-200'>
          <div className='flex items-center gap-3 p-2 rounded-lg hover:bg-gray-200 cursor-pointer transition-all duration-150'>
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
        </div>
      )}
    </aside>
  );
};

export default SideBar;
