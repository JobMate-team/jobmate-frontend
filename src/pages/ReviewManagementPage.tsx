import { useState } from 'react';
import ReviewCategory from '../components/review-management/ReviewCategory';
import ReviewSearch from '../components/review-management/ReviewSearch';
import ReviewList from '../components/review-management/ReviewList';
import ReviewDetailModal from '../components/review-management/ReviewDetailModal';
import ReviewDeleteModal from '../components/review-management/ReviewDeleteModal';
import { MOCK_REVIEWS, CATEGORIES, type Review } from '../data/mockReviews';

export default function ReviewManagementPage() {
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [searchTerm, setSearchTerm] = useState('');

  // 모달 상태
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'view' | 'edit'>('view');

  // 필터 로직
  const filteredReviews = MOCK_REVIEWS.filter((review) => {
    const matchesCategory =
      selectedCategory === '전체' || review.job_category_name === selectedCategory;
    const matchesSearch =
      review.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.user_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.job_category_name.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  // 핸들러
  const handleView = (review: Review) => {
    setSelectedReview(review);
    setModalMode('view');
    setIsModalOpen(true);
  };

  const handleEdit = (review: Review) => {
    setSelectedReview(review);
    setModalMode('edit');
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedReview(null);
  };

  const handleSaveReview = (updatedReview: Review) => {
    // 추후 api
    console.log('Saved Review:', updatedReview);
  };

  // 삭제 모달 상태
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [reviewToDelete, setReviewToDelete] = useState<Review | null>(null);

  const handleDelete = (review: Review) => {
    setReviewToDelete(review);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (reviewToDelete) {
      console.log('Deleted Review:', reviewToDelete);
      // 추후 api
    }
    setIsDeleteModalOpen(false);
    setReviewToDelete(null);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setReviewToDelete(null);
  };

  return (
    <div className='p-4 sm:p-8 max-w-7xl mx-auto'>
      <div className='mb-8'>
        <h1 className='text-2xl font-bold text-gray-900 mb-2'>면접 후기</h1>
        <p className='text-gray-500'>사용자가 작성한 면접 후기를 관리합니다</p>
      </div>

      <ReviewCategory
        categories={CATEGORIES}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      <ReviewSearch searchTerm={searchTerm} onSearchChange={(e) => setSearchTerm(e.target.value)} />

      <div className='flex-1 overflow-auto'>
        <ReviewList
          reviews={filteredReviews}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
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
    </div>
  );
}
