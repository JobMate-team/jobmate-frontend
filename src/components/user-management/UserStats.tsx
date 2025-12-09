interface StatCardProps {
    label: string;
    value: string;
}

const StatCard = ({ label, value }: StatCardProps) => {
    return (
        <div className='bg-white border border-gray-200 rounded-xl p-6 flex flex-col justify-between min-h-[140px] shadow-sm'>
            <span className='text-gray-500 text-sm font-medium'>{label}</span>
            <span className='text-4xl font-semibold text-gray-900 mt-2'>{value}</span>
        </div>
    );
};

const UserStats = () => {
    return (
        <div className='w-full lg:w-72 flex flex-col gap-4'>
            <StatCard label='전체 사용자' value='8' />
            <StatCard label='총 코칭 횟수' value='258' />
            <StatCard label='총 후기 수' value='60' />
            <StatCard label='오늘 활동' value='13' />
        </div>
    );
};

export default UserStats;
