import type { JobCategoryResponse } from '@/types/coaching';
import { axiosInstance } from './api';

export const getCategories = async (): Promise<JobCategoryResponse> => {
  const { data } = await axiosInstance.get('/coach/job-category');
  return data;
};
