export interface PopularQuestion {
  id: number;
  content: string;
  used_count: number;
}

export interface JobCategoryDist {
  category: string;
  user_count: number;
}

export interface GrowthData {
  thisMonth: number;
  lastMonth: number;
  growth: string;
}

export interface MonthlyTrendItem {
  month: string;
  count: number;
}

export interface MonthlyTrend {
  coaching: MonthlyTrendItem[];
  reviews: MonthlyTrendItem[];
}

export interface StatisticsData {
  popularQuestions: PopularQuestion[];
  jobCategoryDist: JobCategoryDist[];
  coaching: GrowthData;
  newUsers: GrowthData;
  avgAnswerLength: string;
  monthlyTrend: MonthlyTrend;
}

export interface StatisticsError {
  errorCode: string;
  reason: string;
  data: unknown;
}

export interface StatisticsResponse {
  resultType: string;
  error: null | StatisticsError;
  success: StatisticsData;
}
