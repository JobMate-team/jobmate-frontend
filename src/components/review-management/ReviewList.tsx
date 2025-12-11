
import ReviewItem from './ReviewItem';
import type { Review } from '../../data/mockReviews';

interface ReviewListProps {
    reviews: Review[];
    onView: (review: Review) => void;
    onEdit: (review: Review) => void;
    onDelete: (review: Review) => void;
}

export default function ReviewList({ reviews, onView, onEdit, onDelete }: ReviewListProps) {
    if (reviews.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <p>등록된 후기가 없습니다.</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {reviews.map((review) => (
                <ReviewItem
                    key={review.id}
                    review={review}
                    onView={() => onView(review)}
                    onEdit={() => onEdit(review)}
                    onDelete={() => onDelete(review)}
                />
            ))}
        </div>
    );
};
