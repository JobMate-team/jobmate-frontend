import type { JSX } from 'react';
import { HiSpeakerphone } from 'react-icons/hi';
import {
  IoIosBrush,
  IoIosFlask,
  IoMdBriefcase,
  IoMdDesktop,
  IoMdPaper,
  IoMdPeople,
  IoMdStats,
} from 'react-icons/io';

export interface User {
  id: number;
  name: string;
  email: string;
  job: string;
  joinDate: string;
  coachingCount: number;
  reviewCount: number;
}

interface UserTableProps {
  users: User[];
}

const JOB_EMOJI: Record<string, JSX.Element> = {
  기획: <IoMdPaper />,
  IT: <IoMdDesktop />,
  마케팅: <HiSpeakerphone />,
  디자인: <IoIosBrush />,
  영업: <IoMdBriefcase />,
  인사: <IoMdPeople />,
  재무: <IoMdStats />,
  연구: <IoIosFlask />,
};

const UserTable = ({ users }: UserTableProps) => {
  return (
    <div className='flex flex-col w-full max-w-full'>
      <div className='sm:hidden text-xs text-gray-400 mb-2 flex items-center gap-1'>
        <span className='animate-pulse'>↔</span> 가로로 스크롤하여 내용을 확인하세요
      </div>
      <div className='bg-white border border-gray-200 rounded-xl overflow-hidden overflow-x-auto w-full'>
        <table className='w-full text-left border-collapse whitespace-nowrap'>
          <thead>
            <tr className='bg-gray-50/50 border-b border-gray-200 text-sm font-medium text-gray-500'>
              <th className='py-4 px-6'>사용자</th>
              <th className='py-4 px-6 text-center'>직군</th>
              <th className='py-4 px-6 text-center'>가입일</th>
              <th className='py-4 px-6 text-center'>코칭 횟수</th>
              <th className='py-4 px-6 text-center'>후기</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-100'>
            {users.map((user) => (
              <tr key={user.id} className='hover:bg-gray-50/50 transition-colors'>
                <td className='py-4 px-6'>
                  <div className='flex items-center gap-4'>
                    <div className='w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-bold text-sm'>
                      {user.name[0]}
                    </div>
                    <div className='flex flex-col'>
                      <span className='font-bold text-gray-900'>{user.name}</span>
                      <span className='text-sm text-gray-400 font-normal'>{user.email}</span>
                    </div>
                  </div>
                </td>
                <td className='py-4 px-6 text-center'>
                  <div className='inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-gray-200 bg-white text-xs font-medium text-gray-600'>
                    <span>{JOB_EMOJI[user.job]}</span>
                    {user.job}
                  </div>
                </td>
                <td className='py-4 px-6 text-center text-sm text-gray-600'>
                  <div className='inline-flex items-center gap-1.5'>{user.joinDate}</div>
                </td>
                <td className='py-4 px-6 text-center'>
                  <span className='inline-flex items-center justify-center min-w-8 h-7 px-2 rounded-lg bg-blue-50 text-blue-600 text-sm font-semibold'>
                    {user.coachingCount}
                  </span>
                </td>
                <td className='py-4 px-6 text-center'>
                  <span className='inline-flex items-center justify-center min-w-8 h-7 px-2 rounded-lg bg-purple-50 text-purple-600 text-sm font-semibold'>
                    {user.reviewCount}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;
