import { Search } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void; // eslint-disable-line no-unused-vars
  placeholder?: string;
}

const SearchBar = ({ value, onChange, placeholder = '검색...' }: SearchBarProps) => {
  return (
    <div className='relative w-full'>
      <div className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400'>
        <Search size={20} />
      </div>
      <input
        type='text'
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className='w-full bg-[#F3F3F5] rounded-xl py-3 pl-12 pr-4 outline-none border border-gray-200 focus:ring-1 focus:ring-gray-200 transition-all text-sm'
      />
    </div>
  );
};

export default SearchBar;
