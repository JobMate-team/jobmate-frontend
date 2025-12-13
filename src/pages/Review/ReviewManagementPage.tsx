import { useState, useEffect, useCallback } from 'react';
import { showToast } from '@/utils/toast';
import ReviewCategory from '@/components/review-management/ReviewCategory';
import ReviewSearch from '@/components/review-management/ReviewSearch';
import ReviewList from '@/components/review-management/ReviewList';
import ReviewDetailModal from '@/components/review-management/ReviewDetailModal';
import ReviewDeleteModal from '@/components/review-management/ReviewDeleteModal';
import { Outlet } from 'react-router-dom';
import { CATEGORIES } from '@/data/mockReviews';
import {
  fetchReviews,
  fetchReviewDetail,
  updateReview,
  deleteReview,
  type Review,
} from '@/api/review';
import { jobItems } from '@/data/coachItems';

export default function ReviewManagementPage() {
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [searchTerm, setSearchTerm] = useState('');
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // 모달 상태
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'view' | 'edit'>('view');

  // 리뷰 데이터 조회 함수 분리
  const loadReviews = useCallback(async () => {
    setIsLoading(true);
    try {
      let categoryId: number | undefined;
      if (selectedCategory !== '전체') {
        const index = jobItems.indexOf(selectedCategory);
        if (index !== -1) {
          categoryId = index + 1;
        }
      }
      const data = await fetchReviews(categoryId);
      setReviews(data);
    } catch (error) {
      console.error('Failed to load reviews:', error);
    } finally {
      setIsLoading(false);
    }
  }, [selectedCategory]);

  useEffect(() => {
    loadReviews();
  }, [loadReviews]);

  // 클라이언트 사이드 검색 필터링
  const filteredReviews = reviews.filter((review) => {
    const searchLower = searchTerm.toLowerCase();
    const companyName = review.company_name?.toLowerCase() || '';
    const userName = review.user_name?.toLowerCase() || '';
    const content = review.content?.toLowerCase() || '';
    const jobCategoryName = review.job_category_name?.toLowerCase() || '';

    return (
      companyName.includes(searchLower) ||
      userName.includes(searchLower) ||
      content.includes(searchLower) ||
      jobCategoryName.includes(searchLower)
    );
  });

  // 핸들러
  const handleView = async (review: Review) => {
    try {
      const detail = await fetchReviewDetail(review.id);
      if (detail) {
        setSelectedReview(detail);
        setModalMode('view');
        setIsModalOpen(true);
      } else {
        showToast.error('상세 정보를 불러올 수 없습니다.');
      }
    } catch (error) {
      console.error('Failed to fetch review detail:', error);
      showToast.error('상세 정보를 불러오는 중 오류가 발생했습니다.');
    }
  };

  const handleEdit = async (review: Review) => {
    try {
      const detail = await fetchReviewDetail(review.id);
      if (detail) {
        setSelectedReview(detail);
        setModalMode('edit');
        setIsModalOpen(true);
      } else {
        showToast.error('상세 정보를 불러올 수 없습니다.');
      }
    } catch (error) {
      console.error('Failed to fetch review detail:', error);
      showToast.error('상세 정보를 불러오는 중 오류가 발생했습니다.');
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedReview(null);
  };

  const handleSaveReview = async (updatedReview: Review) => {
    // 직군 이름으로 ID 찾기
    const categoryIndex = jobItems.indexOf(updatedReview.job_category_name);
    // jobItems에 없으면 기본값 1(기획) 혹은 에러 처리. 여기서는 1로 가정하거나 jobItems가 0-indexed이므로 +1
    // 만약 사용자가 직군을 수정할 수 없다면 원본 데이터의 ID를 가져와야 하는데,
    // Review interface에 job_category_id가 없으므로 name으로 역추적.
    // 사용자가 임의의 직군으로 수정했다면 에러가 날 수 있음.

    // 만약 직군이 jobItems에 없다면 기본값 처리 혹은 에러
    const jobCategoryId = categoryIndex !== -1 ? categoryIndex + 1 : 1;

    try {
      const result = await updateReview(updatedReview.id, {
        company_name: updatedReview.company_name,
        job_category_id: jobCategoryId,
        content: updatedReview.content,
        interview_tip: updatedReview.tips,
      });

      if (result) {
        showToast.success('후기가 수정되었습니다.');
        setIsModalOpen(false);
        // 리스트 새로고침
        loadReviews();
      } else {
        showToast.error('후기 수정에 실패했습니다.');
      }
    } catch (error) {
      console.error('Failed to update review:', error);
      showToast.error('후기 수정 중 오류가 발생했습니다.');
    }
  };

  // 삭제 모달 상태
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [reviewToDelete, setReviewToDelete] = useState<Review | null>(null);

  const handleDelete = (review: Review) => {
    setReviewToDelete(review);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (reviewToDelete) {
      try {
        await deleteReview(reviewToDelete.id);
        showToast.success('면접 후기가 정상적으로 삭제되었습니다.');
        // 리스트 새로고침
        loadReviews();
      } catch (err: unknown) {
        const error = err as { errorCode?: string };
        console.error('Failed to delete review:', error);
        if (error?.errorCode === 'NOT_FOUND') {
          showToast.error('삭제하려는 면접 후기를 찾을 수 없습니다.');
        } else if (error?.errorCode === 'ADMIN_ONLY') {
          showToast.error('관리자 권한이 필요합니다.');
        } else {
          showToast.error('면접 후기 삭제에 실패했습니다.');
        }
      }
    }
    setIsDeleteModalOpen(false);
    setReviewToDelete(null);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setReviewToDelete(null);
  };

  return (
    <div className='px-4 sm:px-8 max-w-7xl mx-auto mt-10'>
      <div className='max-sm:hidden mb-8'>
        <h1 className='text-2xl font-bold text-gray-900 mb-2'>면접 후기</h1>
        <p className='text-[#717182]'>사용자가 작성한 면접 후기를 관리합니다</p>
      </div>

      <ReviewCategory
        categories={CATEGORIES}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      <ReviewSearch searchTerm={searchTerm} onSearchChange={(e) => setSearchTerm(e.target.value)} />

      <div className='flex-1 overflow-auto'>
        {isLoading ? (
          <div className='flex items-center justify-center h-64'>
            <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900'></div>
          </div>
        ) : (
          <ReviewList
            reviews={filteredReviews}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </div>

      <ReviewDetailModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        review={selectedReview}
        mode={modalMode}
        onSave={handleSaveReview}
      />

      <ReviewDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
      />

      <Outlet />
    </div>
  );
}
