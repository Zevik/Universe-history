import React from 'react';
import { motion } from 'framer-motion';
import { Filter, Star, Globe, Leaf, User, Building, Cpu } from 'lucide-react';

interface FilterPanelProps {
  categories: Array<{ id: string; name: string; color: string }>;
  selectedCategories: string[];
  onCategoryToggle: (categoryId: string) => void;
}

const categoryIcons = {
  universe: Star,
  earth: Globe,
  life: Leaf,
  human: User,
  civilization: Building,
  modern: Cpu
};

const FilterPanel: React.FC<FilterPanelProps> = ({
  categories,
  selectedCategories,
  onCategoryToggle
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-md p-4 border border-gray-200"
    >
      <div className="flex items-center gap-3 mb-4">
        <Filter className="w-5 h-5 text-gray-600" />
        <h3 className="font-semibold text-gray-800">סינון לפי קטגוריות</h3>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => {
          const isSelected = selectedCategories.includes(category.id);
          const Icon = categoryIcons[category.id as keyof typeof categoryIcons] || Star;
          
          return (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onCategoryToggle(category.id)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg border-2 transition-all duration-200 ${
                isSelected
                  ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-md'
                  : 'border-gray-200 bg-gray-50 text-gray-600 hover:border-gray-300 hover:bg-gray-100'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="text-sm font-medium">{category.name}</span>
            </motion.button>
          );
        })}
      </div>
      
      <div className="mt-3 flex items-center justify-between text-sm text-gray-500">
        <span>{selectedCategories.length} מתוך {categories.length} קטגוריות נבחרו</span>
        <button
          onClick={() => {
            if (selectedCategories.length === categories.length) {
              // Deselect all
              categories.forEach(cat => {
                if (selectedCategories.includes(cat.id)) {
                  onCategoryToggle(cat.id);
                }
              });
            } else {
              // Select all
              categories.forEach(cat => {
                if (!selectedCategories.includes(cat.id)) {
                  onCategoryToggle(cat.id);
                }
              });
            }
          }}
          className="text-blue-600 hover:text-blue-800 underline"
        >
          {selectedCategories.length === categories.length ? 'בטל הכל' : 'בחר הכל'}
        </button>
      </div>
    </motion.div>
  );
};

export default FilterPanel;
