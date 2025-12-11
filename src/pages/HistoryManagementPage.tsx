import { useState } from 'react';
import HistorySearch from '@/components/history-management/HistorySearch';
import HistoryList from '@/components/history-management/HistoryList';
import HistoryDetailModal from '@/components/history-management/HistoryDetailModal';
import { MOCK_HISTORY_RESPONSE } from '@/data/mockHistoryManagement';
import type { HistoryRecord } from '@/types/historyManagement';

const HistoryManagementPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRecord, setSelectedRecord] = useState<HistoryRecord | null>(null);

    const records = MOCK_HISTORY_RESPONSE.success || [];

    // 검색 기능
    const filteredRecords = records.filter((record) =>
        record.question_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.job_category_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // 상세보기
    const handleViewDetail = (id: number) => {
        const record = records.find((r) => r.id === id);
        if (record) {
            setSelectedRecord(record);
        }
    };

    return (
        <div className='flex flex-col gap-6 max-w-5xl'>
            <div className='flex flex-col gap-2'>
                <h1 className='text-xl font-bold text-gray-900'>히스토리</h1>
                <p className='text-sm text-gray-500'>사용자들의 면접 연습 기록을 관리합니다</p>
            </div>

            {/* 검색 섹션 */}
            <div className='bg-white p-6 rounded-lg border border-gray-200 shadow-sm'>
                <HistorySearch
                    value={searchTerm}
                    onChange={setSearchTerm}
                />
            </div>

            {/* 목록 섹션 */}
            <div className='bg-white p-6 rounded-lg border border-gray-200 shadow-sm min-h-[500px]'>
                <div className='mb-6'>
                    <h2 className='text-lg font-bold text-gray-900'>연습 기록</h2>
                    <p className='text-sm text-gray-500'>최근 면접 연습 기록을 확인하세요</p>
                </div>
                <HistoryList
                    records={filteredRecords}
                    onViewDetail={handleViewDetail} // 핸들러 전달
                />
            </div>

            {/* 상세 모달 */}
            {selectedRecord && (
                <HistoryDetailModal
                    record={selectedRecord}
                    onClose={() => setSelectedRecord(null)}
                />
            )}
        </div>
    );
};

export default HistoryManagementPage;
