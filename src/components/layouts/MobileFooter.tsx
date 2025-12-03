import { menuItems } from '@/data/menuItems';
import clsx from 'clsx';

import { useLocation, useNavigate } from 'react-router-dom';

const MobileFooter = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className='fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 sm:hidden'>
      <div className='flex justify-around py-3'>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className='flex flex-col items-center gap-1'
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
