import { axiosInstance } from './api';

export interface User {
  id: number;
  nickname: string;
  email: string;
  job_category_name: string | null;
  created_at: string;
  coaching_count: number;
  review_count: number;
}

export interface UserDashboardStats {
  total_users: number;
  total_coaching: number;
  total_reviews: number;
  today_activity: number;
}

interface GetUsersResponse {
  resultType: string;
  error: unknown;
  success: User[];
}

interface GetUserStatsResponse {
  resultType: string;
  error: unknown;
  success: UserDashboardStats;
}

export const getUsers = async (search?: string, jobCategory?: number) => {
  const params: { search?: string; jobCategory?: number } = {};
  if (search) params.search = search;
  if (jobCategory) params.jobCategory = jobCategory;

  const response = await axiosInstance.get<GetUsersResponse>('/admin/users', {
    params,
  });
  return response.data;
};

export const getUserStats = async () => {
  const response = await axiosInstance.get<GetUserStatsResponse>('/admin/users/dashboard');
  return response.data;
};
