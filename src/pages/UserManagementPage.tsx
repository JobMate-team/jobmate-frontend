import { useState, useEffect } from 'react';
import SearchBar from '@/components/common/SearchBar';
import DropDown from '@/components/ui/Dropdown';
import UserTable, { type User as UserTableUser } from '@/components/user-management/UserTable';
import UserStats from '@/components/user-management/UserStats';
import { jobItems } from '@/data/coachItems';
import { Outlet } from 'react-router-dom';
import UpScrollButton from '@/components/ui/UpScrollButton';
import { getUsers, getUserStats, type User as ApiUser, type UserDashboardStats } from '@/api/user';

const jobOptions = ['전체 직군', ...jobItems];

const UserManagementPage = () => {
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState<UserTableUser[]>([]);
  const [stats, setStats] = useState<UserDashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const jobCategoryIndex = selectedJob ? jobOptions.indexOf(selectedJob) : 0;
        const jobCategoryId = jobCategoryIndex > 0 ? jobCategoryIndex : undefined;

        const response = await getUsers(searchQuery, jobCategoryId);

        if (response && response.success) {
          const adaptedUsers: UserTableUser[] = response.success.map((user: ApiUser) => ({
            id: user.id,
            name: user.nickname,
            email: user.email,
            job: user.job_category_name || '미지정', // Handle null job category
            joinDate: new Date(user.created_at)
              .toLocaleDateString('ko-KR', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
              })
              .replace(/\. /g, '.')
              .slice(0, -1), // Format: 2024.12.09
            coachingCount: user.coaching_count,
            reviewCount: user.review_count,
          }));
          setUsers(adaptedUsers);
        }
      } catch (err) {
        setError(err);
        console.error('Failed to fetch users:', err);
      } finally {
        setIsLoading(false);
      }
    };

    const timer = setTimeout(() => {
      fetchUsers();
    }, 300); // Simple debounce
    return () => clearTimeout(timer);
  }, [searchQuery, selectedJob]);

  // Separate effect for stats to avoid refetching on search/filter if not needed,
  // or fetch once on mount. Usually dashboard stats might not change with search/filter unless specified.
  // The API spec implies /admin/users/dashboard is a global stat, not filtered.
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await getUserStats();
        if (response && response.success) {
          setStats(response.success);
        }
      } catch (err) {
        console.error('Failed to fetch user stats:', err);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className='space-y-8 pb-30'>
      <div className='hidden sm:flex flex-col gap-2 mt-10'>
        <h1 className='text-2xl font-semibold'>사용자 관리</h1>
        <p className='text-gray-500'>서비스 사용자 정보를 관리합니다</p>
      </div>

      {/* 상단 필터 */}
      <div className='flex gap-6 flex-col lg:flex-row'>
        <div className='flex-1'>
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder='이름, 이메일로 검색...'
          />
        </div>
        <div className='w-full lg:w-72'>
          <DropDown
            items={jobOptions}
            selected={selectedJob}
            placeholder='전체 직군'
            onSelect={setSelectedJob}
            bgColor='bg-gray-200/50 w-full'
            SmPadding='py-3'
          />
        </div>
      </div>

      {/* 사용자 목록 컴포넌트 */}
      <div className='flex gap-6 flex-col lg:flex-row items-start'>
        {isLoading ? (
          <div className='flex-1 w-full flex flex-col items-center justify-center bg-white border border-gray-200 rounded-xl min-h-[400px] text-gray-500'>
            <p className='mt-4 text-lg font-medium'>로딩 중...</p>
          </div>
        ) : error ? (
          <div className='flex-1 w-full flex flex-col items-center justify-center bg-white border border-gray-200 rounded-xl min-h-[400px] text-red-500'>
            <p className='mt-4 text-lg font-medium'>데이터를 불러오는데 실패했습니다.</p>
            <p className='text-sm text-gray-400 mt-2'>잠시 후 다시 시도해주세요.</p>
          </div>
        ) : users.length > 0 ? (
          <UserTable users={users} />
        ) : (
          <div className='flex-1 w-full flex flex-col items-center justify-center bg-white border border-gray-200 rounded-xl min-h-[400px] text-gray-500'>
            <p className='mt-4 text-lg font-medium'>검색 결과가 없습니다</p>
            <p className='text-sm text-gray-400 mt-2'>다른 검색어나 필터를 시도해보세요.</p>
          </div>
        )}

        {/* 통계 컴포넌트 */}
        <UserStats stats={stats} />
      </div>

      <UpScrollButton />
      <Outlet />
    </div>
  );
};

export default UserManagementPage;
