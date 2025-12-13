import type React from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import clsx from 'clsx';

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  // eslint-disable-next-line no-unused-vars
  onPageChange: (page: number) => void;
  className?: string;
}

const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
  className,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (totalPages <= 1) return null;

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  return (
    <div className={clsx('flex justify-center items-center gap-2 mt-8', className)}>
      <button
        type='button'
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className='p-2 rounded-lg hover:bg-gray-100 disabled:opacity-30 disabled:hover:bg-transparent transition-colors'
      >
        <FaAngleLeft className='text-gray-500' size={14} />
      </button>

      <div className='flex items-center gap-1'>
        {getPageNumbers().map((page) => (
          <button
            key={page}
            type='button'
            onClick={() => handlePageChange(page)}
            className={clsx(
              'w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium transition-colors',
              currentPage === page ? 'bg-black text-white' : 'text-gray-600 hover:bg-gray-100',
            )}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        type='button'
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className='p-2 rounded-lg hover:bg-gray-100 disabled:opacity-30 disabled:hover:bg-transparent transition-colors'
      >
        <FaAngleRight className='text-gray-500' size={14} />
      </button>
    </div>
  );
};

export default Pagination;
