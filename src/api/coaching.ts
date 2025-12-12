import type { JobCategoryResponse } from '@/types/coaching';
import { axiosInstance } from './api';
import type { HistoryResponse, HistoryDetailResponse } from '@/types/historyManagement';

// 직군 카테고리 조회
export const getCategories = async (): Promise<JobCategoryResponse> => {
  const { data } = await axiosInstance.get('/coach/job-category');
  return data;
};

// 전체 코칭 세션(히스토리) 리스트 조회
export const getCoachingHistory = async (): Promise<HistoryResponse> => {
  const { data } = await axiosInstance.get('/admin/coaching');
  return data;
};

// 코칭 상세 조회
export const getCoachingHistoryDetail = async (id: number): Promise<HistoryDetailResponse> => {
  const { data } = await axiosInstance.get(`/admin/coaching/${id}`);
  return data;
};
