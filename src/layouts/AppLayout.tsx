import { Outlet, useNavigate } from 'react-router-dom';
import SideBar from '@/components/layouts/SideBar';
import MobileHeader from '@/components/layouts/MobileHeader';
import MobileFooter from '@/components/layouts/MobileFooter';
import Modal from '@/components/common/Modal';
import { useAtom } from 'jotai';
import { isLogoutModalAtom, isModalOpenAtom } from '@/atoms';
import { showToast } from '@/utils/toast';
import { useEffect } from 'react';
import LogoutModal from '@/components/ui/LogoutModal';

const AppLayout = () => {
  const [isModalOpen, setIsModalOpen] = useAtom(isModalOpenAtom);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useAtom(isLogoutModalAtom);

  const navigate = useNavigate();

  const handleDelete = () => {
    setIsModalOpen((prev) => !prev);
    showToast.success('삭제되었습니다');
  };

  const handleLogout = () => {
    setIsLogoutModalOpen(false);
    navigate('/');
    showToast.success('로그아웃에 성공했습니다');
  };

  useEffect(() => {
    if (!isModalOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsModalOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen, setIsModalOpen]);

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

      {isModalOpen && (
        <Modal
          title='모든 히스토리를 삭제하시겠습니까?'
          content='이 작업은 되돌릴 수 없습니다.'
          onCancel={() => setIsModalOpen(false)}
          onConfirm={handleDelete}
        />
      )}

      {isLogoutModalOpen && (
        <LogoutModal onCancel={() => setIsLogoutModalOpen(false)} onConfirm={handleLogout} />
      )}
    </div>
  );
};

export default AppLayout;
