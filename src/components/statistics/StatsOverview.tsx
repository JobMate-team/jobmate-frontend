import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import type { GrowthData } from '@/types/statistics';

interface StatsOverviewProps {
  coaching: GrowthData;
  newUsers: GrowthData;
  avgAnswerLength: string;
}

const StatsOverview = ({ coaching, newUsers, avgAnswerLength }: StatsOverviewProps) => {
  const renderGrowth = (growth: string) => {
    const value = parseInt(growth);
    const isPositive = value > 0;
    const isZero = value === 0;

    if (isZero) return <span className='text-gray-400 text-sm font-medium'>-</span>;

    return (
      <div
        className={`flex items-center text-sm font-medium gap-1 ${isPositive ? 'text-green-500' : 'text-red-500'}`}
      >
        {isPositive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
        <span>{growth}</span>
      </div>
    );
  };

  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
      {/* 이번 달 코칭 횟수 */}
      <div className='bg-white p-6 rounded-lg border border-gray-200 flex flex-col justify-between h-[140px]'>
        <div className='flex items-center justify-between'>
          <h3 className='text-gray-500 text-sm font-medium'>이번 달 코칭 횟수</h3>
          {renderGrowth(coaching.growth)}
        </div>
        <p className='text-3xl font-semibold text-gray-900'>{coaching.thisMonth}회</p>
      </div>

      {/* 신규 사용자 */}
      <div className='bg-white p-6 rounded-lg border border-gray-200 flex flex-col justify-between h-[140px]'>
        <div className='flex items-center justify-between'>
          <h3 className='text-gray-500 text-sm font-medium'>신규 사용자</h3>
          {renderGrowth(newUsers.growth)}
        </div>
        <p className='text-3xl font-semibold text-gray-900'>{newUsers.thisMonth}명</p>
      </div>

      {/* 평균 답변 길이 */}
      <div className='bg-white p-6 rounded-lg border border-gray-200 flex flex-col justify-between h-[140px]'>
        <div className='flex flex-col gap-1'>
          <h3 className='text-gray-500 text-sm font-medium'>평균 답변 길이</h3>
        </div>
        <div className='flex flex-col gap-2'>
          <p className='text-3xl font-semibold text-gray-900'>
            {Math.round(parseFloat(avgAnswerLength))}자
          </p>
          <p className='text-gray-400 text-xs'>적절한 답변 길이: 500-600자</p>
        </div>
      </div>
    </div>
  );
};

export default StatsOverview;
