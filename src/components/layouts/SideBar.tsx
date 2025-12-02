import clsx from 'clsx';
import { Home, MessageSquare, History, FileText, User, Menu, PanelLeft } from 'lucide-react';
import { useState } from 'react';

const menuItems = [
  { id: 'home', icon: Home, label: '홈' },
  { id: 'tasks', icon: MessageSquare, label: '코칭' },
  { id: 'missions', icon: History, label: '히스토리' },
  { id: 'schedule', icon: FileText, label: '후기' },
  { id: 'mypage', icon: User, label: '마이' },
];

const SideBar = () => {
  const [activeMenu, setActiveMenu] = useState('home');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <aside
      className={clsx(
        'bg-white border-r border-gray-200 flex flex-col transition-all duration-150',
        isSidebarOpen ? 'w-64' : 'w-20',
      )}
    >
      {isSidebarOpen ? (
        <div className='p-4 border-b border-gray-200 flex flex-col space-y-2'>
          <div className='flex flex-row justify-between items-center'>
            <h1 className='leading-6 text-xl whitespace-nowrap'>JobMate.AI</h1>
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
          const isActive = activeMenu === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveMenu(item.id)}
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
    </aside>
  );
};

export default SideBar;
