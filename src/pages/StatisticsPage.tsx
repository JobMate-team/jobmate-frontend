import StatsOverview from '@/components/statistics/StatsOverview';
import MonthlyTrendChart from '@/components/statistics/MonthlyTrendChart';
import PopularQuestions from '@/components/statistics/PopularQuestions';
import UserDistributionChart from '@/components/statistics/UserDistributionChart';
import { MOCK_STATISTICS_DATA } from '@/data/mockStatistics';
import { Outlet } from 'react-router-dom';

const StatisticsPage = () => {
  const { success: data } = MOCK_STATISTICS_DATA;

  return (
    <div className='space-y-5 pb-30'>
      <div className='hidden sm:flex flex-col mt-10'>
        <h1 className='text-2xl font-semibold mb-2'>통계</h1>
        <p className=' text-[#717182] mb-6'>서비스 사용 현황과 통계를 확인합니다</p>
      </div>

      {/* 상단 카드 */}
      <StatsOverview
        coaching={data.coaching}
        newUsers={data.newUsers}
        avgAnswerLength={data.avgAnswerLength}
      />

      {/* 월별 추이 차트 */}
      <MonthlyTrendChart monthlyTrend={data.monthlyTrend} />

      {/* 하단 그리드 */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        <PopularQuestions popularQuestions={data.popularQuestions} />
        <UserDistributionChart jobCategoryDist={data.jobCategoryDist} />
      </div>

      <Outlet />
    </div>
  );
};

export default StatisticsPage;
