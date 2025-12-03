import { Outlet } from 'react-router-dom';
import SideBar from '@/components/layouts/SideBar';
import MobileHeader from '@/components/layouts/MobileHeader';
import MobileFooter from '@/components/layouts/MobileFooter';

const AppLayout = () => {
  return (
    <div className='flex h-screen bg-gray-50'>
      <SideBar />

      <main className='flex-1 overflow-auto'>
        <MobileHeader />

        <div className='max-w-6xl mx-auto sm:p-8 pt-8 p-4'>
          <Outlet />
        </div>
      </main>

      <MobileFooter />
    </div>
  );
};

export default AppLayout;
