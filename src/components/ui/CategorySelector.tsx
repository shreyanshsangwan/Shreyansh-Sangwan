import React from 'react';
import { Category } from '../../data/mockData';
import { Package, Smartphone, FileText, Shirt, Utensils } from 'lucide-react';

interface CategorySelectorProps {
  categories: Category[];
  selectedCategory: string;
  onSelect: (categoryId: string) => void;
}

const iconMap: Record<string, React.ReactNode> = {
  FileText: <FileText className="w-6 h-6" />,
  Smartphone: <Smartphone className="w-6 h-6" />,
  Shirt: <Shirt className="w-6 h-6" />,
  Utensils: <Utensils className="w-6 h-6" />,
  Package: <Package className="w-6 h-6" />,
};

export const CategorySelector: React.FC<CategorySelectorProps> = ({ categories, selectedCategory, onSelect }) => {
  return (
    <div className="grid grid-cols-3 gap-3">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onSelect(category.id)}
          className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all ${
            selectedCategory === category.id
              ? 'border-orange-500 bg-orange-50 text-orange-600'
              : 'border-gray-200 bg-white text-gray-600 hover:border-orange-200'
          }`}
        >
          <div className={`mb-2 ${selectedCategory === category.id ? 'text-orange-500' : 'text-gray-400'}`}>
            {iconMap[category.icon] || <Package className="w-6 h-6" />}
          </div>
          <span className="text-xs font-medium">{category.name}</span>
        </button>
      ))}
    </div>
  );
};
