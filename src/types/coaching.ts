import type { CommonResponse } from './common';

export type JobCategory = {
  id: number;
  name: string;
};

export type JobCategoryResponse = CommonResponse<{
  jobCategories: JobCategory[];
}>;

export type QuestionItem = {
  id: number;
  text: string;
  question_type: string;
};

export type QuestionResponse = CommonResponse<{
  jobCategoryId: string;
  count: number;
  questions: QuestionItem[];
}>;

export type CompaniesItem = {
  id: number;
  name: string;
};

export type CompaniesResponse = CommonResponse<{
  count: number;
  companies: CompaniesItem[];
}>;
