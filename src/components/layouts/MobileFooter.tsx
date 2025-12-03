import { Home, MessageSquare, History, FileText, User } from 'lucide-react';
import clsx from 'clsx';
import { useState } from 'react';

const menuItems = [
  { id: 'home', icon: Home, label: '홈' },
  { id: 'tasks', icon: MessageSquare, label: '코칭' },
  { id: 'missions', icon: History, label: '히스토리' },
  { id: 'schedule', icon: FileText, label: '후기' },
  { id: 'mypage', icon: User, label: '마이' },
];

const MobileFooter = () => {
  const [activeMenu, setActiveMenu] = useState('home');

  return (
    <nav className='fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 sm:hidden'>
      <div className='flex justify-around py-3'>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeMenu === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveMenu(item.id)}
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
