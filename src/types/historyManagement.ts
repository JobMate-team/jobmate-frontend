export interface HistoryRecord {
  id: number;
  created_at: string;
  user_name: string;
  job_category_name: string;
  question_title: string;

  company_name?: string;
  user_email?: string;
  answer?: string;
  ai_feedback?: string;
  model_answer?: string;
}

export interface HistoryResponse {
  resultType: string;
  error: {
    errorCode: string;
    reason: string;
    data: unknown;
  } | null;
  success: HistoryRecord[] | null;
}

export interface HistoryDetailItem {
  id: number;
  created_at: string;
  user_name: string;
  user_email: string;
  job_category_id: number;
  job_category_name: string;
  question_title: string;
  answer_text: string;
  ai_feedback: string;
  ai_model_answer: string;
}

export interface HistoryDetailResponse {
  resultType: string;
  error: {
    errorCode: string;
    reason: string;
    data: unknown;
  } | null;
  success: HistoryDetailItem | null;
}
