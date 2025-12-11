import { axiosInstance } from './api';

export const postLogout = async (): Promise<void> => {
  try {
    const { data } = await axiosInstance.post('/auth/logout');

    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    const msg = err.response?.data?.message ?? '로그아웃 실패';
    throw new Error(msg);
  }
};
