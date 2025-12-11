import { useState, useEffect } from 'react';
import { AxiosError } from 'axios';
import StatsOverview from '@/components/statistics/StatsOverview';
import MonthlyTrendChart from '@/components/statistics/MonthlyTrendChart';
import PopularQuestions from '@/components/statistics/PopularQuestions';
import UserDistributionChart from '@/components/statistics/UserDistributionChart';
import { getStatistics } from '@/api/stats';
import type { StatisticsData } from '@/types/statistics';

const StatisticsPage = () => {
  const [stats, setStats] = useState<StatisticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        setIsLoading(true);
        const response = await getStatistics();
        if (response.resultType === 'SUCCESS') {
          setStats(response.success);
        } else {
          setError(response.error?.reason || '데이터를 불러오는데 실패했습니다.');
        }
      } catch (err) {
        const error = err as AxiosError<{ error: { errorCode: string } }>;
        // If it's an admin only error (403 or handled by interceptor/backend specific response)
        if (
          error.response?.status === 403 ||
          error.response?.data?.error?.errorCode === 'ADMIN_ONLY'
        ) {
          setError('관리자 전용 페이지입니다.');
        } else {
          setError('데이터를 불러오는데 실패했습니다.');
        }
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStatistics();
  }, []);

  if (isLoading) {
    return (
      <div className='flex items-center justify-center min-h-[400px]'>
        <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500'></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='flex flex-col items-center justify-center min-h-[400px]'>
        <p className='text-red-500 font-medium text-lg'>{error}</p>
        <button
          onClick={() => window.location.reload()}
          className='mt-4 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors'
        >
          새로고침
        </button>
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div className='flex flex-col gap-6'>
      <div className='flex flex-col gap-2'>
        <h1 className='text-xl font-bold text-gray-900'>통계</h1>
        <p className='text-sm text-gray-500'>서비스 사용 현황과 통계를 확인합니다</p>
      </div>

      {/* 상단 카드 */}
      <StatsOverview
        coaching={stats.coaching}
        newUsers={stats.newUsers}
        avgAnswerLength={stats.avgAnswerLength}
      />

      {/* 월별 추이 차트 */}
      <MonthlyTrendChart monthlyTrend={stats.monthlyTrend} />

      {/* 하단 그리드 */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        <PopularQuestions popularQuestions={stats.popularQuestions} />
        <UserDistributionChart jobCategoryDist={stats.jobCategoryDist} />
      </div>
    </div>
  );
};

export default StatisticsPage;
