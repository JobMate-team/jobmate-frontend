import { createContext, type PropsWithChildren, useContext, useState } from 'react';
import { postLogout } from '../api/auth';
import { useMutation } from '@tanstack/react-query';
import { showToast } from '@/utils/toast';

interface AuthContextType {
  accessToken: string | null;
  refreshToken: string | null;
  // eslint-disable-next-line no-unused-vars
  login: (accessToken: string, refreshToken?: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [accessToken, setAccessToken] = useState<string | null>(() =>
    localStorage.getItem('accessToken'),
  );
  const [refreshToken, setRefreshToken] = useState<string | null>(() =>
    localStorage.getItem('refreshToken'),
  );

  // 로그인 함수
  const login = (accessToken: string, refreshToken?: string) => {
    setAccessToken(accessToken);
    setRefreshToken(refreshToken || null);

    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken || '');
    showToast.success('로그인에 성공했습니다');
  };

  // 로그아웃
  const logoutMutation = useMutation({
    mutationFn: postLogout,
    onSuccess: () => {
      setAccessToken(null);
      setRefreshToken(null);
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');

      window.location.href = '/login';
    },
    onError: (error) => {
      console.error('로그아웃 오류:', error);
      showToast.error('로그아웃 실패');
      window.location.href = '/';
    },
  });

  const logout = () => logoutMutation.mutate();

  return (
    <AuthContext.Provider value={{ accessToken, refreshToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth는 AuthProvider 내부에서만 사용 가능합니다.');
  }
  return context;
};
