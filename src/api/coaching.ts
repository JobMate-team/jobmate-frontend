import type { JobCategoryResponse } from '@/types/coaching';
import { axiosInstance } from './api';

export const getCategories = async (): Promise<JobCategoryResponse> => {
  return axiosInstance.get('/coach/job-category');
};
