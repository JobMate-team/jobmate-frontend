import axios, { type InternalAxiosRequestConfig } from 'axios';

interface CustomInternalAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

let refreshPromise: Promise<void> | null = null;

export const baseURL = import.meta.env.VITE_API_URL;

if (!baseURL) {
  console.error(
    '[axiosInstance] VITE_API_URL 이 설정되어 있지 않습니다. .env.local 을 확인하세요.',
  );
}

// 인스턴스 정의
export const axiosInstance = axios.create({
  baseURL,
  withCredentials: true, // 쿠키 허용
});

// 응답 인터셉터 : 401에러 발생 -> refresh토큰을 통한 토큰 갱신
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log('error', error);
    const request: CustomInternalAxiosRequestConfig = error.config;

    if (!request || request.url?.includes('/auth/refresh')) {
      return Promise.reject(error);
    }

    // 401 에러면서, 아직 재시도 하지 않은 요청
    if (error.response && error.response.status === 401 && !request._retry) {
      request._retry = true; // 재시도 플래그 설정 -> 요청을 한번만 보내도록 함

      if (!refreshPromise) {
        refreshPromise = (async () => {
          try {
            // ✅ 여기서 refreshToken은 body로 보내지 않는다.
            //    쿠키에 있는 refreshToken을 서버가 읽게 하는 것.
            await axiosInstance.post('/auth/refresh');
            // 성공하면 쿠키에 새 accessToken/refreshToken 이 심어짐
          } catch (err) {
            // 리프레시 실패 → 로그인 페이지로 이동
            console.error('토큰 리프레시 실패', err);

            const PUBLIC_ROUTES = ['/', '/login', '/role', '/kakao/success'];

            const currentPath = window.location.pathname;

            if (!PUBLIC_ROUTES.includes(currentPath)) {
              window.location.href = '/login';
            }
            throw err;
          } finally {
            // 다음 401 때를 위해 초기화
            refreshPromise = null;
          }
        })();
      }

      try {
        await refreshPromise;
        return axiosInstance(request);
      } catch (err) {
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  },
);
