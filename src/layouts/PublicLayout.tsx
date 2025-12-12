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
    if (data?.success) {
      navigate('/home', { replace: true });
    } else return;
  }, [data, isLoading, navigate]);

  return <Outlet />;
};

export default PublicLayout;
