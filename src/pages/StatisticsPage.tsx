import StatsOverview from '@/components/statistics/StatsOverview';
import MonthlyTrendChart from '@/components/statistics/MonthlyTrendChart';
import PopularQuestions from '@/components/statistics/PopularQuestions';
import UserDistributionChart from '@/components/statistics/UserDistributionChart';
import { MOCK_STATISTICS_DATA } from '@/data/mockStatistics';

const StatisticsPage = () => {
    const { success: data } = MOCK_STATISTICS_DATA;

    return (
        <div className='flex flex-col gap-6'>
            <div className='flex flex-col gap-2'>
                <h1 className='text-xl font-bold text-gray-900'>통계</h1>
                <p className='text-sm text-gray-500'>서비스 사용 현황과 통계를 확인합니다</p>
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
        </div>
    );
};

export default StatisticsPage;
