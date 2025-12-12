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

export type TempFeedbackRequest = {
  job_category_id: number;
  role_id: number;
  company_id: number;
  question_id: number;
  question_source: string;
  user_answer: string;
};

export type HandFeedbackRequest = {
  job_category_id: number;
  role_id: number;
  company_id: number;
  question_source: string;
  question: string;
  user_answer: string;
};

export type TempFeedback = {
  요약된_인재상: string;
  기업_맞춤_조언: string;
  전체_총평: string;
  개선포인트: string[];
  모범_답변_예시: string;
};

export type HandFeedback = {
  전체_총평: string;
  개선포인트: string[];
  모범_답변_예시: string;
};

export type AIFeedbackResponse<T> = CommonResponse<{
  session_id: number;
  user_answer: string;
  question: string;
  company: string;
  job_family: string;
  role: string;
  ai_feedback: T;
  message: string;
}>;

export type TempFeedbackResponse = AIFeedbackResponse<TempFeedback>;
export type HandFeedbackResponse = AIFeedbackResponse<HandFeedback>;
