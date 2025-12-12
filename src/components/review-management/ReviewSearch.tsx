import React from 'react';
import { FiSearch } from 'react-icons/fi';

interface ReviewSearchProps {
  searchTerm: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // eslint-disable-line no-unused-vars
}

const ReviewSearch: React.FC<ReviewSearchProps> = ({ searchTerm, onSearchChange }) => {
  return (
    <div className='relative mb-4 sm:mb-6'>
      <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
        <FiSearch className='text-gray-400' />
      </div>
      <input
        type='text'
        placeholder='작성자, 회사, 직군, 질문으로 검색...'
        value={searchTerm}
        onChange={onSearchChange}
        className='w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent transition-all'
      />
    </div>
  );
};

export default ReviewSearch;
