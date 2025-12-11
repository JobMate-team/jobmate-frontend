import type { CommonResponse } from './common';

export type ResPonseLogout = CommonResponse<{
  message: string;
  userId: number;
}>;

export type ResPonseUserInfo = CommonResponse<{
  id: number;
  email: string;
  nickname: string;
  job_category_id: number;
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
