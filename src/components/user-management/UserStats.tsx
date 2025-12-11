import { type UserDashboardStats } from '@/api/user';

interface StatCardProps {
  label: string;
  value: string | number;
}

const StatCard = ({ label, value }: StatCardProps) => {
  return (
    <div className='bg-white border border-gray-200 rounded-xl p-6 flex flex-col justify-between min-h-[140px] shadow-sm'>
      <span className='text-gray-500 text-sm font-medium'>{label}</span>
      <span className='text-4xl font-semibold text-gray-900 mt-2'>{value}</span>
    </div>
  );
};

interface UserStatsProps {
  stats?: UserDashboardStats | null;
}

const UserStats = ({ stats }: UserStatsProps) => {
  return (
    <div className='w-full lg:w-72 flex flex-col gap-4'>
      <StatCard label='전체 사용자' value={stats?.total_users ?? '-'} />
      <StatCard label='총 코칭 횟수' value={stats?.total_coaching ?? '-'} />
      <StatCard label='총 후기 수' value={stats?.total_reviews ?? '-'} />
      <StatCard label='오늘 활동' value={stats?.today_activity ?? '-'} />
    </div>
  );
};

export default UserStats;
