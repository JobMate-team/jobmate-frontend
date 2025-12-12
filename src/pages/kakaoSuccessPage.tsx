import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getUserInfo } from '@/api/auth';
import { showToast } from '@/utils/toast';

const KakaoSuccessPage = () => {
  const navigate = useNavigate();

  const { data, isError, isLoading } = useQuery({
    queryKey: ['userInfo'],
    queryFn: getUserInfo,
  });

  useEffect(() => {
    if (isLoading) return;

    // 1) 에러 → 로그인 이동
    if (isError) {
      navigate('/login', { replace: true });
      showToast.error('로그인에 실패하였습니다.');
      return;
    }

    // data.success가 없는 경우도 에러로 취급
    const user = data?.success;
    if (!user) {
      navigate('/login', { replace: true });
      showToast.error('로그인에 실패하였습니다.');
      return;
    }

    // 2) 직무 선택 필요 → /role
    if (user.job_category_id == null) {
      navigate('/role', { replace: true });
      showToast.success('직무를 선택해주세요.');
      return;
    }

    // 3) 정상 로그인 → 홈 이동
    navigate('/home', { replace: true });
    showToast.success('로그인에 성공하였습니다.');
  }, [data, isError, isLoading, navigate]);

  return (
    <main className='flex flex-col items-center justify-center min-h-screen gap-5'>
      <div className='w-24 h-24 border-8 border-gray-700 border-t-transparent rounded-full animate-spin'></div>
      <p className='text-[#6D7280] font-medium text-lg'>Loading...</p>
    </main>
  );
};

export default KakaoSuccessPage;
