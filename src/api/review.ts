import { axiosInstance } from './api';

// 리뷰 데이터 인터페이스
export interface Review {
  id: number;
  company_name: string;
  content: string;
  content_preview: string;
  likes: number;
  created_at: string;
  user_name: string;
  job_category_name: string;
  tips?: string;
  user_email?: string;
}

// 상세 조회 응답 타입
interface ReviewDetailResponse {
  resultType: string;
  error: {
    errorCode: string;
    reason: string;
    data: unknown;
  } | null;
  success: {
    id: number;
    company_name: string;
    content: string;
    interview_tip: string;
    likes: number;
    created_at: string;
    user_name: string;
    user_email: string;
    job_category_name: string;
  } | null;
}

// 리뷰 삭제 응답 타입
interface ReviewDeleteResponse {
  resultType: string;
  error: {
    errorCode: string;
    reason: string;
    data: unknown;
  } | null;
  success: {
    message: string;
    reviewId: string;
  } | null;
}

// API 응답 타입 정의 (Common)
interface ReviewResponse {
  resultType: string;
  error: {
    errorCode: string;
    reason: string;
    data: unknown;
  } | null;
  success: Review[] | null;
}

/**
 * 면접 후기 상세 조회
 * @param reviewId 후기 ID
 */
export const fetchReviewDetail = async (reviewId: number): Promise<Review | null> => {
  try {
    const response = await axiosInstance.get<ReviewDetailResponse>(`/admin/reviews/${reviewId}`);

    if (response.data.resultType === 'SUCCESS' && response.data.success) {
      const data = response.data.success;
      // API 응답을 프론트엔드 Review 타입에 맞춰 변환
      return {
        id: data.id,
        company_name: data.company_name,
        content: data.content,
        content_preview: data.content ? data.content.substring(0, 50) : '', // preview 생성
        likes: data.likes,
        created_at: data.created_at,
        user_name: data.user_name,
        job_category_name: data.job_category_name,
        tips: data.interview_tip, // interview_tip -> tips 매핑
        user_email: data.user_email,
      };
    } else {
      console.error('Failed to fetch review detail:', response.data.error);
      return null;
    }
  } catch (error) {
    console.error('Error fetching review detail:', error);
    throw error;
  }
};

/**
 * 면접 후기 수정 요청 데이터
 */
interface UpdateReviewRequest {
  company_name: string;
  job_category_id: number;
  content: string;
  interview_tip?: string;
}

/**
 * 면접 후기 수정
 * @param id 후기 ID
 * @param data 수정할 데이터
 */
export const updateReview = async (
  id: number,
  data: UpdateReviewRequest,
): Promise<Review | null> => {
  try {
    const response = await axiosInstance.patch<ReviewDetailResponse>(`/admin/reviews/${id}`, data);

    if (response.data.resultType === 'SUCCESS' && response.data.success) {
      const result = response.data.success;
      return {
        id: result.id,
        company_name: result.company_name,
        content: result.content,
        content_preview: result.content ? result.content.substring(0, 50) : '',
        likes: result.likes,
        created_at: result.created_at,
        user_name: result.user_name,
        job_category_name: result.job_category_name,
        tips: result.interview_tip,
        user_email: result.user_email,
      };
    } else {
      console.error('Failed to update review:', response.data.error);
      return null;
    }
  } catch (error) {
    console.error('Error updating review:', error);
    throw error;
  }
};

/**
 * 면접 후기 삭제
 * @param reviewId 후기 ID
 */
export const deleteReview = async (reviewId: number): Promise<boolean> => {
  try {
    const response = await axiosInstance.delete<ReviewDeleteResponse>(`/admin/reviews/${reviewId}`);

    if (response.data.resultType === 'SUCCESS' && response.data.success) {
      return true;
    } else {
      // 에러 처리: 호출하는 쪽에서 에러 메시지를 띄우기 위해 여기서 에러를 던지거나 false를 리턴할 수 있음.
      // 여기서는 false를 리턴하고 콘솔에 로그를 남김.
      console.error('Failed to delete review:', response.data.error);
      // 필요하다면 에러 객체를 던져서 구체적인 에러 핸들링을 할 수 있음 e.g. throw response.data.error;
      throw response.data.error;
    }
  } catch (error) {
    console.error('Error deleting review:', error);
    throw error;
  }
};

/**
 * 면접 후기 리스트 조회 (전체 및 직군별)
 * @param jobCategoryId 직군 ID (선택사항, 없을 경우 전체 조회)
 */
export const fetchReviews = async (jobCategoryId?: number): Promise<Review[]> => {
  try {
    const url = jobCategoryId ? `/admin/reviews?jobCategoryId=${jobCategoryId}` : '/admin/reviews';
    const response = await axiosInstance.get<ReviewResponse>(url);

    if (response.data.resultType === 'SUCCESS' && response.data.success) {
      return response.data.success.map((review) => ({
        ...review,
        content_preview:
          review.content_preview || (review.content ? review.content.substring(0, 50) : ''),
      }));
    } else {
      // 에러 처리 혹은 빈 배열 반환
      console.error('Failed to fetch reviews:', response.data.error);
      return [];
    }
  } catch (error) {
    console.error('Error fetching reviews:', error);
    throw error;
  }
};
