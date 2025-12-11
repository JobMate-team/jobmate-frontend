import type { CommonResponse } from './common';

export type JobCategory = {
  id: number;
  name: string;
};

export type JobCategoryResponse = CommonResponse<{
  jobCategories: JobCategory[];
}>;
