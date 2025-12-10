import { Search } from 'lucide-react';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const SearchInput = ({ value, onChange, placeholder = '검색...', className = '' }: SearchInputProps) => {
  return (
    <div className={`relative ${className}`}>
      <div className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400'>
        <Search size={20} />
      </div>
      <input
        type='text'
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className='w-full bg-[#F3F3F5] rounded-xl py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-gray-200 transition-all text-sm'
      />
    </div>
  );
};

export default SearchInput;
