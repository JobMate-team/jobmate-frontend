import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import SearchBar from '@/components/common/SearchBar';
import DropDown from '@/components/ui/Dropdown';
import Pagination from '@/components/common/Pagination';
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
  const [stats, setStats] = useState<UserDashboardStats | null>(null);
  const [page, setPage] = useState(1);
  const LIMIT = 10;

  const {
    data: userData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['users', searchQuery, selectedJob],
    queryFn: () => {
      const jobCategoryIndex = selectedJob ? jobOptions.indexOf(selectedJob) : 0;
      const jobCategoryId = jobCategoryIndex > 0 ? jobCategoryIndex : undefined;
      return getUsers(searchQuery, jobCategoryId, 10000, 0);
    },
  });

  const adaptedUsers: UserTableUser[] =
    userData?.success?.map((user: ApiUser) => ({
      id: user.id,
      name: user.nickname,
      email: user.email,
      job: user.job_category_name || '미지정',
      joinDate: new Date(user.created_at)
        .toLocaleDateString('ko-KR', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        })
        .replace(/\. /g, '.')
        .slice(0, -1),
      coachingCount: user.coaching_count,
      reviewCount: user.review_count,
    })) || [];

  const totalItems = adaptedUsers.length;
  const displayedUsers = adaptedUsers.slice((page - 1) * LIMIT, page * LIMIT);

  useEffect(() => {
    setPage(1);
  }, [searchQuery, selectedJob]);

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
        ) : displayedUsers.length > 0 ? (
          <div className='flex-1 w-full flex flex-col gap-4'>
            <UserTable users={displayedUsers} />

            <Pagination
              totalItems={totalItems}
              itemsPerPage={LIMIT}
              currentPage={page}
              onPageChange={setPage}
            />
          </div>
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
