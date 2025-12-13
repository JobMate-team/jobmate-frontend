import type { CommonResponse } from './common';

export type ResPonseLogout = CommonResponse<{
  message: string;
  userId: number;
}>;

export type ResPonseUserInfo = CommonResponse<{
  id: number;
  email: string;
  nickname?: string;
  name?: string;
  role?: string;
  job_category_id?: number;
  jobCategory?: {
    id: number;
    name: string;
  };
}>;

export type ResPonseJobCate = CommonResponse<{
  message: string;
}>;

export type ResponseAdminLogin = CommonResponse<{
  admin: {
    id: number;
    email: string;
    role: string;
  };
}>;
