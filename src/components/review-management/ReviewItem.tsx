import type { Review } from '../../data/mockReviews';
import { FiThumbsUp, FiEye, FiEdit2, FiTrash2 } from 'react-icons/fi';

interface ReviewItemProps {
    review: Review;
    onView: () => void;
    onEdit: () => void;
    onDelete: () => void;
}

export default function ReviewItem({ review, onView, onEdit, onDelete }: ReviewItemProps) {
    // YYYY-MM-DD 만 표시되도록 날짜 문자열 포맷팅
    const formattedDate = new Date(review.created_at).toISOString().split('T')[0];

    return (
        <div className="bg-white border border-gray-100 rounded-xl p-5 mb-4 hover:shadow-sm transition-shadow">
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4 sm:gap-0">
                <div className="flex-1 w-full">
                    <div className="flex space-x-2 mb-2">
                        {/* 왼쪽 뱃지: 직군 카테고리 */}
                        <span className="px-2 py-1 bg-gray-100 rounded-md text-xs font-medium text-gray-600">
                            {review.job_category_name}
                        </span>
                        {/* 오른쪽 뱃지: 회사명 */}
                        <span className="px-2 py-1 bg-gray-100 rounded-md text-xs font-medium text-gray-600">
                            {review.company_name}
                        </span>
                    </div>
                    {/* 제목으로 사용할 내용 미리보기 */}
                    <h3 className="text-lg font-semibold text-gray-800 mb-2 leading-snug break-words">
                        {review.content_preview}
                    </h3>
                    <div className="flex flex-wrap items-center text-sm text-gray-500 gap-y-1 gap-x-3 mb-3">
                        <div className="flex items-center space-x-1">
                            <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center text-xs text-gray-600">
                                {review.user_name[0]}
                            </div>
                            <span>{review.user_name}</span>
                        </div>
                        <span className="hidden sm:inline">|</span>
                        <span>{formattedDate}</span>
                    </div>
                    <div className="flex items-center text-gray-400 text-sm">
                        <FiThumbsUp className="mr-1" />
                        <span>{review.likes}</span>
                    </div>
                </div>

                <div className="flex flex-row sm:flex-col space-x-2 sm:space-x-0 sm:space-y-2 w-full sm:w-auto sm:ml-4 sm:self-start sm:min-w-[80px]">
                    <button
                        onClick={onView}
                        className="flex items-center justify-center flex-1 sm:flex-none px-3 py-2 sm:py-1.5 border border-gray-200 rounded-lg text-xs text-gray-600 hover:bg-gray-50 transition-colors"
                    >
                        <FiEye className="mr-1.5" />
                        보기
                    </button>
                    <button
                        onClick={onEdit}
                        className="flex items-center justify-center flex-1 sm:flex-none px-3 py-2 sm:py-1.5 border border-gray-200 rounded-lg text-xs text-gray-600 hover:bg-gray-50 transition-colors"
                    >
                        <FiEdit2 className="mr-1.5" />
                        수정
                    </button>
                    <button
                        onClick={onDelete}
                        className="flex items-center justify-center flex-1 sm:flex-none px-3 py-2 sm:py-1.5 border border-red-200 rounded-lg text-xs text-red-500 hover:bg-red-50 transition-colors"
                    >
                        <FiTrash2 className="mr-1.5" />
                        삭제
                    </button>
                </div>
            </div>
        </div>
    );
};
