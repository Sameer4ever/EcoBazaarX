import React, { useState } from 'react';
import { ChevronUp, Search } from 'lucide-react';

// A reusable component for each collapsible filter section
const FilterSection: React.FC<{ title: string; children: React.ReactNode; defaultOpen?: boolean }> = ({ title, children, defaultOpen = true }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-gray-200 py-6">
      <h3 className="-my-3 flow-root">
        <button
          type="button"
          className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="font-medium text-gray-900">{title}</span>
          <span className="ml-6 flex items-center">
            <ChevronUp className={`h-5 w-5 transition-transform duration-200 ${isOpen ? '' : 'rotate-180'}`} />
          </span>
        </button>
      </h3>
      {isOpen && (
        <div className="pt-6">
          <div className="space-y-4">{children}</div>
        </div>
      )}
    </div>
  );
};

// --- Define the props that the main sidebar will accept ---
interface FiltersSidebarProps {
  filters: {
    searchQuery: string;
    categories: string[];
    isZeroWasteProduct: boolean;
  };
  categories: string[];
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onCategoryChange: (category: string) => void;
  onZeroWasteChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

// --- Main Sidebar Component ---
const FiltersSidebar: React.FC<FiltersSidebarProps> = ({
  filters,
  categories,
  onSearchChange,
  onCategoryChange,
  onZeroWasteChange,
}) => {
  return (
    <aside className="w-full lg:w-1/4">
      <div className="p-6 bg-white rounded-lg shadow-md border border-gray-200">
        
        {/* Search Bar */}
        <div className="relative mb-4">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
                type="text"
                placeholder="Search by product name..."
                value={filters.searchQuery}
                onChange={onSearchChange}
                className="block w-full rounded-md border-gray-300 pl-10 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
        </div>
        
        <h2 className="text-xl font-bold mb-2 border-t pt-4">Filters</h2>

        {/* Zero Waste / Sustainable Filter */}
        <FilterSection title="Special Filters" defaultOpen={true}>
            <div className="flex items-center">
              <input
                id="filter-zero-waste"
                type="checkbox"
                checked={filters.isZeroWasteProduct}
                onChange={onZeroWasteChange}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <label htmlFor="filter-zero-waste" className="ml-3 text-sm text-gray-600 cursor-pointer">
                Zero Waste Product
              </label>
            </div>
        </FilterSection>

        {/* Category Filter */}
        <FilterSection title="Category">
          {categories.map((category) => (
            <div key={category} className="flex items-center">
              <input
                id={`filter-category-${category}`}
                type="checkbox"
                checked={filters.categories.includes(category)}
                onChange={() => onCategoryChange(category)}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <label htmlFor={`filter-category-${category}`} className="ml-3 text-sm text-gray-600 cursor-pointer">
                {category}
              </label>
            </div>
          ))}
        </FilterSection>

      </div>
    </aside>
  );
};

export default FiltersSidebar;

