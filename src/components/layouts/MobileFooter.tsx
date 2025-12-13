import { pageAtom } from '@/atoms';
import { adminMenuItems, menuItems } from '@/data/menuItems';
import type { MenuItem } from '@/types/MenuItem';
import clsx from 'clsx';
import { useSetAtom } from 'jotai';

import { useLocation, useNavigate } from 'react-router-dom';

const MobileFooter = () => {
  const setPage = useSetAtom(pageAtom);
  const isAdminMode = localStorage.getItem('adminMode') !== null;

  const itemsToRender = isAdminMode ? adminMenuItems : menuItems;

  const navigate = useNavigate();
  const location = useLocation();

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
    <nav className='fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 sm:hidden'>
      <div className='flex justify-around py-3'>
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
              className='flex flex-col items-center gap-1 px-3'
            >
              <Icon className={clsx('w-6 h-6', isActive ? 'text-black' : 'text-gray-500')} />
              <span
                className={clsx(
                  'text-xs whitespace-pre-line',
                  isActive ? 'text-black font-medium' : 'text-gray-500',
                )}
              >
                {isAdminMode
                  ? (() => {
                      const label = item.label.trim();

                      if (label.includes(' ')) {
                        return label.split(' ').join('\n');
                      } else if (label.length === 4) {
                        return label.slice(0, 2) + '\n' + label.slice(2);
                      } else if (label.length > 4) {
                        return label.slice(0, 3) + '\n' + label.slice(3);
                      }

                      return label;
                    })()
                  : item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileFooter;
