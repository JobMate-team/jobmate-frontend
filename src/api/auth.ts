import { axiosInstance } from './api';

export const postLogout = async (): Promise<void> => {
  const { data } = await axiosInstance.post('/auth/logout');
  return data;
};

export const getUserInfo = async () => {
  const { data } = await axiosInstance.get('/auth/me');
  return data;
};
