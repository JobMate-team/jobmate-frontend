import axios, { type InternalAxiosRequestConfig } from 'axios';

interface CustomInternalAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

let refreshPromise: Promise<string> | null = null;

export const baseURL = import.meta.env.VITE_API_URL;

if (!baseURL) {
  console.error(
    '[axiosInstance] VITE_API_URL 이 설정되어 있지 않습니다. .env.local 을 확인하세요.',
  );
}

export const axiosInstance = axios.create({
  baseURL,
  withCredentials: true, // 쿠키 허용
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    console.error('request 실패', error);
    return Promise.reject(error);
  },
);

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
            const refreshToken = localStorage.getItem('refreshToken');

            const { data } = await axiosInstance.post('/v1/auth/refresh', {
              refresh: refreshToken,
            });

            const newAccessToken = data.data.accessToken;
            const newRefreshToken = data.data.refreshToken;

            // 저장
            localStorage.setItem('accessToken', newAccessToken);
            localStorage.setItem('refreshToken', newRefreshToken);

            console.log('엑세스 토큰 요청 성공');

            return data.data.accessToken;
          } catch (error) {
            console.error('refreshToken 갱신 실패', error);

            // 토큰 삭제
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');

            window.location.href = '/signin';
          } finally {
            refreshPromise = null;
          }
        })();
      }

      return refreshPromise.then((newAccessToken) => {
        if (!newAccessToken) return Promise.reject(error);

        request.headers = request.headers ?? {};
        request.headers.Authorization = `Bearer ${newAccessToken}`;

        request.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance.request(request);
      });
    }
    return Promise.reject(error);
  },
);
