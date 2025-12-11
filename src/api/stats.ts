import { axiosInstance } from './api';
import type { StatisticsResponse } from '@/types/statistics';

export const getStatistics = async (): Promise<StatisticsResponse> => {
  const response = await axiosInstance.get<StatisticsResponse>('/admin/stats');
  return response.data;
};
