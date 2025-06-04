import React from 'react';
import { getCategories } from '../utils/quoteUtils';

interface CategoryFilterProps {
  selectedCategory: string | null;
  onCategorySelect: (category: string | null) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ 
  selectedCategory, 
  onCategorySelect 
}) => {
  const categories = getCategories();

  return (
    <div className="flex flex-wrap justify-center gap-2 mb-6">
      <button
        onClick={() => onCategorySelect(null)}
        className={`px-4 py-2 text-sm rounded-full transition-colors duration-300 ${
          selectedCategory === null
            ? 'bg-slate-800 text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        All
      </button>
      
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategorySelect(category)}
          className={`px-4 py-2 text-sm rounded-full transition-colors duration-300 ${
            selectedCategory === category
              ? 'bg-slate-800 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;