import type {
  ResponseAdminLogin,
  ResPonseJobCate,
  ResPonseLogout,
  ResPonseUserInfo,
} from '@/types/auth';
import { axiosInstance } from './api';

export const postLogout = async (): Promise<ResPonseLogout> => {
  const { data } = await axiosInstance.post('/auth/logout');
  return data;
};

export const getUserInfo = async (): Promise<ResPonseUserInfo> => {
  const { data } = await axiosInstance.get('/user/profile');
  return data;
};

export const patchJobCate = async (job_category_id: number): Promise<ResPonseJobCate> => {
  const { data } = await axiosInstance.patch('/auth/me/job-category', {
    job_category_id,
  });
  return data;
};

export const postAdminLogin = async (body: {
  email: string;
  password: string;
}): Promise<ResponseAdminLogin> => {
  const { data } = await axiosInstance.post('/admin/login', body);
  return data;
};
