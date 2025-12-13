import { Outlet, useNavigate } from 'react-router-dom';
import SideBar from '@/components/layouts/SideBar';
import MobileHeader from '@/components/layouts/MobileHeader';
import MobileFooter from '@/components/layouts/MobileFooter';
import Modal from '@/components/common/Modal';
import { useAtom, useSetAtom } from 'jotai';
import { jobItems } from '@/data/coachItems';
import {
  isAdminLoginModalAtom,
  isLogoutModalAtom,
  isModalOpenAtom,
  historyRefreshAtom,
  userProfileAtom,
} from '@/atoms';
import { showToast } from '@/utils/toast';
import { useEffect } from 'react';
import LogoutModal from '@/components/ui/LogoutModal';
import AdminLoginModal from '@/components/ui/AdminLoginModal';
import { getUserInfo, postLogout } from '@/api/auth';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { deleteAllHistory } from '@/api/history';

const AppLayout = () => {
  const [isModalOpen, setIsModalOpen] = useAtom(isModalOpenAtom);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useAtom(isLogoutModalAtom);
  const [isAdminLoginModalOpen, setIsAdminLoginModalOpen] = useAtom(isAdminLoginModalAtom);
  const setHistoryRefresh = useSetAtom(historyRefreshAtom);

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const setUserProfile = useSetAtom(userProfileAtom);

  const { data, isLoading } = useQuery({
    queryKey: ['auth-check'],
    queryFn: getUserInfo,
    retry: false,
  });

  useEffect(() => {
    if (isLoading) return;
    if (!data?.success) {
      navigate('/login', { replace: true });
    } else {
      // job_category_id를 내 프로필 형식(UserProfile)에 맞게 변환
      const val = data.success;

      // 닉네임 처리: nickname이 없으면 name 사용
      const displayName = val.nickname || val.name || '';

      // 직무 처리: jobCategory 객체가 있으면 사용, 없으면 ID로 매핑
      let jobCategoryObj = val.jobCategory;
      if (!jobCategoryObj && val.job_category_id) {
        const jobName = jobItems[val.job_category_id - 1] || '기타';
        jobCategoryObj = {
          id: val.job_category_id,
          name: jobName,
        };
      }

      setUserProfile({
        id: val.id,
        email: val.email,
        nickname: displayName,
        role: val.role,
        jobCategory: jobCategoryObj || { id: 0, name: '미설정' },
      });
    }
  }, [data, isLoading, navigate, setUserProfile]);

  const handleDelete = async () => {
    try {
      const response = await deleteAllHistory();
      if (response.resultType === 'SUCCESS') {
        setIsModalOpen(false);
        showToast.success('모든 히스토리가 삭제되었습니다.');
        setHistoryRefresh((prev) => prev + 1);
        navigate('/history');
      } else {
        showToast.error(response.error?.reason || '삭제에 실패했습니다.');
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error('Failed to delete all history:', error);
      showToast.error('삭제 중 오류가 발생했습니다.');
      setIsModalOpen(false);
    }
  };

  const handleLogout = () => {
    postLogout();
    setIsLogoutModalOpen(false);
    localStorage.removeItem('adminMode');
    queryClient.clear();
    navigate('/login');
    showToast.success('로그아웃에 성공했습니다');
  };

  useEffect(() => {
    // 모달 3종 중 하나라도 열려있으면 ESC 감지 작동
    const isAnyModalOpen = isModalOpen || isLogoutModalOpen || isAdminLoginModalOpen;

    if (!isAnyModalOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsModalOpen(false);
        setIsLogoutModalOpen(false);
        setIsAdminLoginModalOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [
    isModalOpen,
    isLogoutModalOpen,
    isAdminLoginModalOpen,
    setIsModalOpen,
    setIsLogoutModalOpen,
    setIsAdminLoginModalOpen,
  ]);

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
          content='이 작업은 되돌릴 수 없습니다. 모든 면접 답변 기록이 영구적으로 삭제됩니다.'
          onCancel={() => setIsModalOpen(false)}
          onConfirm={handleDelete}
        />
      )}

      {isLogoutModalOpen && (
        <LogoutModal onCancel={() => setIsLogoutModalOpen(false)} onConfirm={handleLogout} />
      )}

      {isAdminLoginModalOpen && <AdminLoginModal />}
    </div>
  );
};

export default AppLayout;
