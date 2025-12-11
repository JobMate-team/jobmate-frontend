import { useState, useEffect } from 'react';
import type { Review } from '../../data/mockReviews';
import { FiX, FiSave } from 'react-icons/fi';

interface ReviewDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  review: Review | null;
  mode: 'view' | 'edit';
  onSave: (updatedReview: Review) => void; // eslint-disable-line no-unused-vars
}

export default function ReviewDetailModal({
  isOpen,
  onClose,
  review,
  mode,
  onSave,
}: ReviewDetailModalProps) {
  const [editedReview, setEditedReview] = useState<Review | null>(null);

  useEffect(() => {
    setEditedReview(review);
  }, [review]);

  if (!isOpen || !review || !editedReview) return null;

  const isEdit = mode === 'edit';

  const handleSave = () => {
    if (editedReview) {
      onSave(editedReview);
      onClose();
    }
  };

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4'>
      <div className='bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto relative animate-fade-in'>
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className='absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors'
        >
          <FiX size={24} />
        </button>

        <div className='p-4 sm:p-8 space-y-6 sm:space-y-8'>
          {/* 작성자 섹션 */}
          <div>
            <h3 className='text-sm font-bold text-gray-900 mb-2'>작성자</h3>
            <div className='bg-gray-100 p-3 rounded-md text-gray-700'>{review.user_name}</div>
          </div>

          {/* 회사 및 직군 섹션 */}
          <div>
            <h3 className='text-sm font-bold text-gray-900 mb-2'>회사 & 직군</h3>
            <div className='bg-gray-50 p-3 rounded-md text-gray-700'>
              {review.company_name} - {review.job_category_name}
            </div>
          </div>

          {/* 내용 섹션 */}
          <div>
            <h3 className='text-sm font-bold text-gray-900 mb-2'>후기 내용</h3>
            {isEdit ? (
              <textarea
                value={editedReview.content}
                onChange={(e) => setEditedReview({ ...editedReview, content: e.target.value })}
                className='w-full bg-gray-50 p-4 rounded-md text-gray-700 outline-none focus:ring-2 focus:ring-blue-500 min-h-[150px] resize-none leading-relaxed'
              />
            ) : (
              <div className='bg-gray-50 p-4 rounded-md text-gray-700 leading-relaxed whitespace-pre-wrap'>
                {review.content}
              </div>
            )}
          </div>

          {/* 팁 섹션 */}
          <div>
            <h3 className='text-sm font-bold text-gray-900 mb-2'>면접 준비 팁</h3>
            {isEdit ? (
              <textarea
                value={editedReview.tips}
                onChange={(e) => setEditedReview({ ...editedReview, tips: e.target.value })}
                className='w-full bg-gray-50 p-4 rounded-md text-gray-700 outline-none focus:ring-2 focus:ring-blue-500 min-h-[120px] resize-none leading-relaxed'
              />
            ) : (
              <div className='bg-gray-50 p-4 rounded-md text-gray-700 leading-relaxed whitespace-pre-wrap'>
                {review.tips || '등록된 팁이 없습니다.'}
              </div>
            )}
          </div>
        </div>

        {/* 바닥글 (수정 모드) */}
        {isEdit && (
          <div className='px-4 pb-4 sm:px-8 sm:pb-8 flex justify-end'>
            <button
              onClick={handleSave}
              className='bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition-colors flex items-center gap-2'
            >
              <FiSave />
              저장
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
