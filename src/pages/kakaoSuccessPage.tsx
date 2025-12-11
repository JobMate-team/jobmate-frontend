import { useAuth } from '@/context/AuthContext';
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const KakaoSuccessPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const accessToken = params.get('accessToken');
    const refreshToken = params.get('refreshToken');

    if (!accessToken) {
      navigate('/login');
      return;
    }

    login(accessToken, refreshToken || undefined);
    navigate('/'); // 메인 페이지 이동
  }, [location.search, login, navigate]);

  return (
    <main className='flex flex-col items-center justify-center min-h-screen gap-5'>
      <div className='w-24 h-24 border-8 border-gray-700 border-t-transparent rounded-full animate-spin'></div>
      <p className='text-[#6D7280] font-medium text-lg'>Loading...</p>
    </main>
  );
};

export default KakaoSuccessPage;
