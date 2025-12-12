import type { CommonItem, CommonResponse } from './common';

export type JobCategoryResponse = CommonResponse<{
  jobCategories: CommonItem[];
}>;

export type QuestionItem = {
  id: number;
  text: string;
  question_type: string;
};

export type QuestionResponse = CommonResponse<{
  jobCategoryId: number;
  count: number;
  questions: QuestionItem[];
}>;

export type JobRoleResponse = CommonResponse<{
  jobCategoryId: number;
  roles: CommonItem[];
}>;

export type CompaniesResponse = CommonResponse<{
  count: number;
  companies: CommonItem[];
}>;

export type RecommendQuestionItem = {
  category: string;
  question: string;
};

export type RecommendQuestionResponse = CommonResponse<{
  job_family: string;
  job: string;
  company: string;
  questions: RecommendQuestionItem[];
}>;
