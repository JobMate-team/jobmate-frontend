import { Search } from 'lucide-react';

interface HistorySearchProps {
  value: string;
  onChange: (value: string) => void; // eslint-disable-line no-unused-vars
  placeholder?: string;
}

const HistorySearch = ({
  value,
  onChange,
  placeholder = '이름, 이메일, 직무로 검색...',
}: HistorySearchProps) => {
  return (
    <div className='relative w-full'>
      <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
        <Search className='h-5 w-5 text-gray-400' />
      </div>
      <input
        type='text'
        className='block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg leading-5 bg-gray-50 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-1 focus:ring-black focus:border-black sm:text-sm transition duration-150 ease-in-out'
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default HistorySearch;
