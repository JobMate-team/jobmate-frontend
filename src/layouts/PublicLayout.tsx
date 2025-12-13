import { getUserInfo } from '@/api/auth';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const PublicLayout = () => {
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: ['auth-check'],
    queryFn: getUserInfo,
    retry: false,
  });

  useEffect(() => {
    if (isLoading) return;

    const user = data?.success;

    if (!user) return; // 로그인 안된 경우 그냥 렌더링

    // 로그인은 되어 있지만 직군 미선택이면 이동 금지
    if (user.job_category_id == null) return;

    // 로그인 + 직군 선택 완료 → 홈으로 이동
    navigate('/home', { replace: true });
  }, [data, isLoading, navigate]);

  return <Outlet />;
};

export default PublicLayout;
