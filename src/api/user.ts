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

/**
 * 사용자 프로필 조회 응답 인터페이스
 */
interface GetUserProfileResponse {
  resultType: string;
  error: unknown;
  success: {
    id: number;
    email: string;
    nickname: string;
  };
}

/**
 * 사용자 프로필 조회 (GET /user/profile)
 * 작성자 이름을 가져오기 위해 사용
 */
export const getUserProfile = async () => {
  const response = await axiosInstance.get<GetUserProfileResponse>('/user/profile');
  if (response.data.resultType === 'SUCCESS') {
    return response.data.success;
  }
  return null;
};
