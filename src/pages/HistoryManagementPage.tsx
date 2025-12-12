import { useState, useEffect, useCallback } from 'react';
import HistorySearch from '@/components/history-management/HistorySearch';
import HistoryList from '@/components/history-management/HistoryList';
import HistoryDetailModal from '@/components/history-management/HistoryDetailModal';
import { getCoachingHistory, getCoachingHistoryDetail } from '@/api/coaching';
import type { HistoryRecord } from '@/types/historyManagement';
import { Outlet } from 'react-router-dom';
import { showToast } from '@/utils/toast';
import UpScrollButton from '@/components/ui/UpScrollButton';

const HistoryManagementPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRecord, setSelectedRecord] = useState<HistoryRecord | null>(null);
  const [records, setRecords] = useState<HistoryRecord[]>([]);
  const [loading, setLoading] = useState(false);

  // useCallback으로 메모이제이션하여 의존성 배열 문제 해결
  const fetchHistory = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getCoachingHistory();
      if (data.resultType === 'SUCCESS' && data.success) {
        setRecords(data.success);
      } else {
        // API 에러 처리
        const errorMessage = data.error?.reason || '데이터를 불러오는데 실패했습니다.';
        showToast.error(errorMessage);
      }
    } catch (err: unknown) {
      console.error('Failed to fetch history:', err);
      const error = err as { response?: { data?: { error?: { reason?: string } } } };

      if (error.response?.data?.error?.reason) {
        showToast.error(error.response.data.error.reason);
      } else {
        showToast.error('히스토리 목록을 불러오는데 실패했습니다.');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  // 검색 기능
  const filteredRecords = records.filter((record) => {
    const title = record.question_title?.toLowerCase() || '';
    const category = record.job_category_name?.toLowerCase() || '';
    const search = searchTerm.toLowerCase();

    return title.includes(search) || category.includes(search);
  });

  // 상세보기
  const handleViewDetail = async (id: number) => {
    try {
      const data = await getCoachingHistoryDetail(id);
      if (data.resultType === 'SUCCESS' && data.success) {
        // 상세 조회 성공 시 모달 열기
        const detail = data.success;
        const mappedRecord: HistoryRecord = {
          ...detail,
          answer: detail.answer_text,
          model_answer: detail.ai_model_answer,
        };
        setSelectedRecord(mappedRecord);
      } else {
        const errorMessage = data.error?.reason || '상세 정보를 불러올 수 없습니다.';
        showToast.error(errorMessage);
      }
    } catch (err: unknown) {
      console.error('Failed to fetch detail:', err);
      const error = err as { response?: { data?: { error?: { reason?: string } } } };

      if (error.response?.data?.error?.reason) {
        showToast.error(error.response.data.error.reason);
      } else {
        showToast.error('상세 정보를 불러오는 중 오류가 발생했습니다.');
      }
    }
  };

  return (
    <div className='space-y-5 max-w-5xl mx-auto pb-30'>
      <div className='hidden sm:flex flex-col gap-2 my-10'>
        <h1 className='text-2xl font-bold text-gray-900'>히스토리</h1>
        <p className='text-[#717182]'>사용자들의 면접 연습 기록을 관리합니다</p>
      </div>

      {/* 검색 섹션 */}
      <div className='bg-white p-6 rounded-lg border border-gray-200'>
        <HistorySearch value={searchTerm} onChange={setSearchTerm} />
      </div>

      {/* 목록 섹션 */}
      <div className='bg-white p-6 rounded-lg border border-gray-200 min-h-[500px]'>
        <div className='mb-6'>
          <h2 className='text-lg font-bold text-gray-900'>연습 기록</h2>
          <p className='text-sm text-gray-500'>최근 면접 연습 기록을 확인하세요</p>
        </div>
        {loading ? (
          <div className='flex items-center justify-center h-64'>
            <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900'></div>
          </div>
        ) : (
          <HistoryList records={filteredRecords} onViewDetail={handleViewDetail} />
        )}
      </div>

      {/* 상세 모달 */}
      {selectedRecord && (
        <HistoryDetailModal record={selectedRecord} onClose={() => setSelectedRecord(null)} />
      )}

      <UpScrollButton />
      <Outlet />
    </div>
  );
};

export default HistoryManagementPage;
