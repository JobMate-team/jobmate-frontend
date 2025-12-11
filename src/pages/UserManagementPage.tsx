import { useState } from 'react';
import SearchBar from '@/components/common/SearchBar';
import DropDown from '@/components/ui/Dropdown';
import UserTable from '@/components/user-management/UserTable';
import UserStats from '@/components/user-management/UserStats';

import { jobItems } from '@/data/coachItems';

import { MOCK_USERS } from '@/data/mockUsers';
import { Outlet } from 'react-router-dom';

const jobOptions = ['전체 직군', ...jobItems];

const UserManagementPage = () => {
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredUsers = MOCK_USERS.filter((user) => {
    // 직군 필터
    const isJobMatch = !selectedJob || selectedJob === '전체 직군' || user.job === selectedJob;

    // 검색 필터
    const searchLower = searchQuery.toLowerCase();
    const isSearchMatch =
      user.name.toLowerCase().includes(searchLower) ||
      user.email.toLowerCase().includes(searchLower);

    return isJobMatch && isSearchMatch;
  });

  return (
    <div className='flex flex-col gap-8 h-full'>
      <div className='flex flex-col gap-2'>
        <h1 className='text-2xl font-bold'>사용자 관리</h1>
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
            bgColor='bg-[#F3F3F5] w-full'
            SmPadding='py-3'
          />
        </div>
      </div>

      {/* 사용자 목록 컴포넌트 */}
      <div className='flex gap-6 flex-col lg:flex-row items-start'>
        {filteredUsers.length > 0 ? (
          <UserTable users={filteredUsers} />
        ) : (
          <div className='flex-1 w-full flex flex-col items-center justify-center bg-white border border-gray-200 rounded-xl min-h-[400px] text-gray-500'>
            <p className='mt-4 text-lg font-medium'>검색 결과가 없습니다</p>
            <p className='text-sm text-gray-400 mt-2'>다른 검색어나 필터를 시도해보세요.</p>
          </div>
        )}

        {/* 통계 컴포넌트 */}
        <UserStats />
      </div>

      <Outlet />
    </div>
  );
};

export default UserManagementPage;
