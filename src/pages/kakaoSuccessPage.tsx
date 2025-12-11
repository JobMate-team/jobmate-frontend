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
    if (!isLoading) {
      if (data?.success.job_category_id == null) {
        navigate('/role'); // 최초 로그인 시 직무 선택 페이지 이동
        showToast.success('직무를 선택해주세요.');
      } else if (data) {
        navigate('/'); // 로그인 성공 & role 있음 -> 홈 이동
        showToast.success('로그인에 성공하였습니다.');
      } else if (isError) {
        navigate('/login'); // 로그인 실패 -> 로그인 페이지
        showToast.error('로그인에 실패하였습니다.');
      }
    }
  }, [data, isError, isLoading, navigate]);

  return (
    <main className='flex flex-col items-center justify-center min-h-screen gap-5'>
      <div className='w-24 h-24 border-8 border-gray-700 border-t-transparent rounded-full animate-spin'></div>
      <p className='text-[#6D7280] font-medium text-lg'>Loading...</p>
    </main>
  );
};

export default KakaoSuccessPage;
