import type { ResPonseJobCate, ResPonseLogout, ResPonseUserInfo } from '@/types/auth';
import { axiosInstance } from './api';

export const postLogout = async (): Promise<ResPonseLogout> => {
  const { data } = await axiosInstance.post('/auth/logout');
  return data;
};

export const getUserInfo = async (): Promise<ResPonseUserInfo> => {
  const { data } = await axiosInstance.get('/auth/me');
  return data;
};

export const patchJobCate = async (job_category_id: number): Promise<ResPonseJobCate> => {
  const { data } = await axiosInstance.patch('/auth/me/job-category', {
    job_category_id,
  });
  return data;
};
