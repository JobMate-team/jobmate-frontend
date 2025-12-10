import type { HistoryRecord } from '@/types/historyManagement';
import HistoryItem from './HistoryItem';

interface HistoryListProps {
    records: HistoryRecord[];
    onViewDetail?: (id: number) => void;
}

const HistoryList = ({ records, onViewDetail }: HistoryListProps) => {
    if (records.length === 0) {
        return (
            <div className='text-center py-10 text-gray-500'>
                기록이 없습니다.
            </div>
        );
    }

    return (
        <div className='space-y-4'>
            {records.map((record) => (
                <HistoryItem
                    key={record.id}
                    record={record}
                    onViewDetail={onViewDetail}
                />
            ))}
        </div>
    );
};

export default HistoryList;
