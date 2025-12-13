import type { SaveHistoryResponse } from '@/types/history';
import { axiosInstance } from './api';

export interface HistoryItem {
  history_id: number;
  coaching_id: number;
  created_at: string;
  job_category_id: number;
  question_content: string;
  answer_text: string;
  ai_feedback: string;
}

export interface HistoryListResponse {
  resultType: string;
  error: {
    errorCode: string;
    reason: string;
    data: unknown;
  } | null;
  success: {
    message: string;
    data: HistoryItem[];
  } | null;
}

export const postHistory = async (coaching_id: number): Promise<SaveHistoryResponse> => {
  const response = await axiosInstance.post('/history', {
    coachingId: coaching_id,
  });
  return response.data;
};

export const fetchHistoryList = async (): Promise<HistoryListResponse> => {
  const response = await axiosInstance.get('/history');
  return response.data;
};

export interface HistoryDetail extends HistoryItem {
  question_id: number;
  ai_model_answer: string;
}

export interface HistoryDetailResponse {
  resultType: string;
  error: {
    errorCode: string;
    reason: string;
    data: unknown;
  } | null;
  success: {
    message: string;
    data: HistoryDetail;
  } | null;
}

export const fetchHistoryDetail = async (id: number): Promise<HistoryDetailResponse> => {
  const response = await axiosInstance.get(`/history/${id}`);
  return response.data;
};

export interface HistoryDeleteResponse {
  resultType: string;
  error: {
    errorCode: string;
    reason: string;
    data: unknown;
  } | null;
  success: {
    message: string;
    data: {
      deleted: boolean;
      historyId: string;
    };
  } | null;
}

export const deleteHistory = async (id: number): Promise<HistoryDeleteResponse> => {
  const response = await axiosInstance.delete(`/history/${id}`);
  return response.data;
};

export interface HistoryDeleteAllResponse {
  resultType: string;
  error: {
    errorCode: string;
    reason: string;
    data: unknown;
  } | null;
  success: {
    message: string;
    data: {
      deleted: boolean;
      deletedCount: number;
    };
  } | null;
}

export const deleteAllHistory = async (): Promise<HistoryDeleteAllResponse> => {
  const response = await axiosInstance.delete('/history/all');
  return response.data;
};
