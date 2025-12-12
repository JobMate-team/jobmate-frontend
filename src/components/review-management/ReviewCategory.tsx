import React from 'react';

interface ReviewCategoryProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void; // eslint-disable-line no-unused-vars
}

const ReviewCategory: React.FC<ReviewCategoryProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <div className='flex space-x-2 mb-6 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:pb-0 scrollbar-hide'>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelectCategory(category)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap shrink-0 ${
            selectedCategory === category
              ? 'bg-[#0f172a] text-white'
              : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default ReviewCategory;
