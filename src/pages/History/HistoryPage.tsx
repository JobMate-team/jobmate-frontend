import { RightIcon } from '@/assets';
import { isModalOpenAtom, historyRefreshAtom } from '@/atoms';
import Button from '@/components/common/Button';
import { useSetAtom, useAtomValue } from 'jotai';
import { FaRegTrashAlt } from 'react-icons/fa';
import { FiCalendar } from 'react-icons/fi';
import { Outlet, useNavigate } from 'react-router-dom';
import UpScrollButton from '@/components/ui/UpScrollButton';
import { fetchHistoryList } from '@/api/history';
import { jobItems } from '@/data/coachItems';
import { showToast } from '@/utils/toast';
import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';

interface HistoryItemState {
  id: number;
  category: string;
  date: string;
  question: string;
  answer: string;
}

const HistoryPage = () => {
  const setIsModalOpen = useSetAtom(isModalOpenAtom);
  const refreshTrigger = useAtomValue(historyRefreshAtom);
  const [isSortOrder, setIsSortOrder] = useState(false);
  const navigate = useNavigate();

  const getJobCategoryName = (id: number) => {
    return jobItems[id - 1] || '알 수 없음';
  };

  const {
    data: historyItems = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['historyList', refreshTrigger],
    queryFn: async () => {
      const response = await fetchHistoryList();

      if (response.resultType === 'SUCCESS' && response.success) {
        return response.success.data.map<HistoryItemState>((item) => ({
          id: item.history_id,
          category: getJobCategoryName(item.job_category_id),
          date: new Date(item.created_at)
            .toLocaleDateString('ko-KR', {
              year: '2-digit',
              month: 'numeric',
              day: 'numeric',
            })
            .replace(/\s/g, ''),
          question: item.question_content,
          answer: item.answer_text,
        }));
      }

      if (response.error?.errorCode !== 'NOT_FOUND') {
        showToast.error(response.error?.reason || '히스토리를 불러오는데 실패했습니다.');
      }

      return [];
    },
    staleTime: 0,
  });

  const sortedItems = useMemo(() => {
    return [...historyItems].sort((a, b) => (isSortOrder ? b.id - a.id : a.id - b.id));
  }, [historyItems, isSortOrder]);

  if (isLoading) {
    return <div className='text-center py-10 text-gray-500'>불러오는 중...</div>;
  }

  return (
    <div className='space-y-5 relative pb-30'>
      <section className='hidden sm:flex items-center justify-between'>
        <div className='flex flex-col mt-10'>
          <h3 className='text-2xl font-semibold mb-2'>히스토리</h3>
          <p className='text-[#717182] mb-6'>과거 연습 기록을 확인하고 발전 과정을 추적하세요</p>
        </div>

        <Button
          type='button'
          className='bg-white font-medium text-sm px-2.5 py-2 border border-[#E5E5E5]'
          onClick={() => setIsModalOpen((prev) => !prev)}
        >
          <FaRegTrashAlt size={16} />
          전체 삭제
        </Button>
      </section>

      {sortedItems.length > 0 && (
        <div className='flex justify-end'>
          <button
            type='button'
            onClick={() => setIsSortOrder((prev) => !prev)}
            className='text-sm px-3 text-gray-700'
          >
            {isSortOrder ? '최신순' : '오래된순'}
          </button>
        </div>
      )}

      {sortedItems.length === 0 ? (
        <div className='text-center py-10 text-gray-500'>저장된 히스토리가 없습니다.</div>
      ) : (
        sortedItems.map((item) => (
          <div
            key={item.id}
            className='bg-white rounded-xl px-6 py-5 border border-[#E5E5E5] flex flex-col gap-4'
          >
            <div className='flex items-center justify-between mb-2'>
              <div className='bg-black text-white text-xs font-medium p-1 px-4 rounded-lg'>
                {item.category}
              </div>
              <p className='text-[#6A7282] flex items-center gap-1'>
                <FiCalendar size={18} />
                {item.date}
              </p>
            </div>

            <p>{item.question}</p>

            <button
              type='button'
              onClick={() =>
                navigate(`/history/${item.id}`, { replace: true, state: { fromHistory: true } })
              }
              className='flex items-center gap-2 justify-between'
            >
              <p className='line-clamp-1 text-[#99A1AF]'>{item.answer}</p>
              <RightIcon className='h-4 min-w-4' />
            </button>
          </div>
        ))
      )}

      <UpScrollButton />
      <Outlet context={{ loadHistory: refetch }} />
    </div>
  );
};

export default HistoryPage;
