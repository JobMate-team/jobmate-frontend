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
        'bg-white border-r border-gray-200 flex flex-col transition-all duration-300',
        isSidebarOpen ? 'w-64' : 'w-20',
      )}
    >
      {/* 상단 헤더 */}
      <div className='p-6 border-b border-gray-200 flex items-center justify-between'>
        {isSidebarOpen && (
          <div>
            <div className='flex flex-row gap-2'>
              <h1 className='text-xl font-bold text-gray-900'>JobMate.AI</h1>
            </div>

            <p className='text-sm text-gray-500 mt-1'>AI 면접 코칭 챗봇</p>
          </div>
        )}

        <button
          onClick={() => setIsSidebarOpen((prev) => !prev)}
          className='p-2 rounded-md hover:bg-gray-100'
        >
          {isSidebarOpen ? <PanelLeft size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* 메뉴 */}
      <nav className='flex-1 p-4'>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeMenu === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveMenu(item.id)}
              className={clsx(
                'w-full flex items-center transition-colors mb-2 rounded-lg px-4 py-3 gap-3',
                isActive ? 'bg-black text-white' : 'text-gray-700 hover:bg-gray-100',
              )}
            >
              <Icon className='w-5 h-5 min-w-5' />
              {isSidebarOpen && <span>{item.label}</span>}
            </button>
          );
        })}
      </nav>
    </aside>
  );
};

export default SideBar;
