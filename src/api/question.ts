import { axiosInstance } from './api';
import type { CommonResponse } from '@/types/common';

export interface QuestionTemplate {
  id: number;
  question_type: string;
  content: string;
  job_category_name: string;
}

export interface QuestionJobCategoryStats {
  job_category_id: number;
  job_category_name: string;
  count: number;
}

export interface QuestionStats {
  total: number;
  categories: QuestionJobCategoryStats[];
}

export interface QuestionTemplateData {
  list: QuestionTemplate[];
  stats: QuestionStats;
}

export type ResponseQuestionTemplates = CommonResponse<QuestionTemplateData>;

export const getQuestionTemplates = async (): Promise<ResponseQuestionTemplates> => {
  const { data } = await axiosInstance.get('/admin/question-templates');
  return data;
};

export interface CreateQuestionBody {
  content: string;
  job_category_id: number;
  question_type: string;
}

export interface CreateQuestionResponseData {
  message: string;
  question: {
    id: number;
    content: string;
    job_category_id: number;
    question_type: string;
    source_type: string;
    created_at: string;
  };
}

export type ResponseCreateQuestion = CommonResponse<CreateQuestionResponseData>;

export const postQuestionTemplate = async (
  body: CreateQuestionBody,
): Promise<ResponseCreateQuestion> => {
  const { data } = await axiosInstance.post('/admin/question-templates', body);
  return data;
};

export interface UpdateQuestionBody {
  content: string;
  job_category_id: number;
  question_type: string;
}

export interface UpdateQuestionResponseData {
  message: string;
  question: {
    id: number;
    content: string;
    job_category_id: number;
    question_type: string;
    source_type: string;
    created_at: string;
  };
}

export type ResponseUpdateQuestion = CommonResponse<UpdateQuestionResponseData>;

export const patchQuestionTemplate = async (
  id: number,
  body: UpdateQuestionBody,
): Promise<ResponseUpdateQuestion> => {
  const { data } = await axiosInstance.patch(`/admin/question-templates/${id}`, body);
  return data;
};

export interface DeleteQuestionResponseData {
  message: string;
  deleted_id: string;
}

export type ResponseDeleteQuestion = CommonResponse<DeleteQuestionResponseData>;

export const deleteQuestionTemplate = async (id: number): Promise<ResponseDeleteQuestion> => {
  const { data } = await axiosInstance.delete(`/admin/question-templates/${id}`);
  return data;
};
