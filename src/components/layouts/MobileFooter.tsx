import { pageAtom } from '@/atoms';
import { menuItems } from '@/data/menuItems';
import clsx from 'clsx';
import { useSetAtom } from 'jotai';

import { useLocation, useNavigate } from 'react-router-dom';

const MobileFooter = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const setPage = useSetAtom(pageAtom);

  return (
    <nav className='fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 sm:hidden'>
      <div className='flex justify-around py-3'>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.path === '/' ? location.pathname === '/' : location.pathname.startsWith(item.path);

          return (
            <button
              key={item.id}
              onClick={() => {
                if (item.path === '/coaching') {
                  setPage(1);
                }
                navigate(item.path);
              }}
              className='flex flex-col items-center gap-1 px-3'
            >
              <Icon className={clsx('w-6 h-6', isActive ? 'text-black' : 'text-gray-500')} />
              <span
                className={clsx('text-xs', isActive ? 'text-black font-medium' : 'text-gray-500')}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileFooter;
