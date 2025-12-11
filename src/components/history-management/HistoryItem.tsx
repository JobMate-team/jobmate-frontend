import type { HistoryRecord } from '@/types/historyManagement';
import { Eye, Calendar } from 'lucide-react';

interface HistoryItemProps {
    record: HistoryRecord;
    onViewDetail?: (id: number) => void;
}

const HistoryItem = ({ record, onViewDetail }: HistoryItemProps) => {
    const formattedDate = new Date(record.created_at).toISOString().split('T')[0];

    return (
        <div className='bg-white border border-gray-200 rounded-xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-gray-300 transition-colors'>
            <div className='flex flex-col gap-3'>
                {/* 뱃지 */}
                <div>
                    <span className='inline-flex items-center px-2 py-1 rounded-lg text-xs font-medium bg-white text-gray-600 border border-gray-200'>
                        {record.job_category_name}
                    </span>
                </div>

                {/* 제목 */}
                <h3 className='text-base font-medium text-gray-900'>
                    {record.question_title}
                </h3>

                {/* 날짜 */}
                <div className='flex items-center text-sm text-gray-500 gap-1.5'>
                    <Calendar size={14} />
                    <span>{formattedDate}</span>
                </div>
            </div>

            {/* 액션 */}
            <button
                type='button'
                onClick={() => onViewDetail?.(record.id)}
                className='flex items-center gap-1.5 text-sm font-medium text-gray-700 hover:text-black transition-colors md:self-center self-end'
            >
                <Eye size={16} />
                <span>상세보기</span>
            </button>
        </div>
    );
};

export default HistoryItem;
