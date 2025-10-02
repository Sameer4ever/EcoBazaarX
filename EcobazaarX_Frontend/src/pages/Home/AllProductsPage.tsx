import React, { useState, useMemo, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import ProductCard from '@/components/Products/ProductCard';
import FiltersSidebar from '@/components/Products/FiltersSidebar';
import Header from '@/components/HomePage/Header';
import Footer from '@/components/HomePage/Footer';
import { LoaderCircle, AlertTriangle } from 'lucide-react';
import type { Product } from '@/types/Product';

// API fetching function
const fetchProducts = async (): Promise<Product[]> => {
  const response = await fetch('http://localhost:8081/api/products');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const PREDEFINED_CATEGORIES = [
  "Apparel & Accessories",
  "Home & Garden",
  "Beauty & Personal Care",
  "Electronics",
  "Books & Media",
  "Groceries",
];

const AllProductsPage: React.FC = () => {
  const { data: products, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  // Filter state
  const [filters, setFilters] = useState({
    searchQuery: '',
    categories: [] as string[],
    isZeroWasteProduct: false,
  });

  // Sorting state
  const [sortBy, setSortBy] = useState('default');

  const availableCategories = PREDEFINED_CATEGORIES;

  // Combined filtering and sorting
  const processedProducts = useMemo(() => {
    if (!products) return [];

    let filtered = products.filter((product) => {
      if (!PREDEFINED_CATEGORIES.includes(product.category)) return false;

      const searchMatch = product.name.toLowerCase().includes(filters.searchQuery.toLowerCase());
      const categoryMatch = filters.categories.length === 0 || filters.categories.includes(product.category);
      const zeroWasteMatch = !filters.isZeroWasteProduct || Boolean(product.isZeroWasteProduct);

      return searchMatch && categoryMatch && zeroWasteMatch;
    });

    // Sorting
    if (sortBy === 'price-asc') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      filtered.sort((a, b) => b.price - a.price);
    }

    return filtered;
  }, [products, filters, sortBy]);

  // Filter handlers
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({ ...prev, searchQuery: event.target.value }));
  };
  const handleZeroWasteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({ ...prev, isZeroWasteProduct: event.target.checked }));
  };
  const handleCategoryChange = (category: string) => {
    setFilters(prev => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category],
    }));
  };

  // Sorting handler
  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(event.target.value);
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center h-96">
          <LoaderCircle className="animate-spin h-12 w-12 text-indigo-600" />
          <p className="mt-4 text-lg text-gray-600">Loading Products...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex flex-col items-center justify-center h-96 bg-red-50 rounded-lg p-8">
          <AlertTriangle className="h-12 w-12 text-red-500" />
          <p className="mt-4 text-lg font-semibold text-red-700">Failed to load products.</p>
          <p className="text-sm text-gray-600">
            Could not connect to the server. Please try again later.
          </p>
        </div>
      );
    }

    return (
      <>
        <div className="flex justify-between items-center mb-6">
          <p className="text-sm text-gray-600">
            Showing {processedProducts.length} of {products?.length || 0} products.
          </p>
          <select 
            value={sortBy} 
            onChange={handleSortChange}
            className="border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="default">Default Sorting</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
        {processedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
            {processedProducts.map((product) => (
              <ProductCard key={product.productId} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-96 bg-gray-50 rounded-lg shadow-inner p-8">
            <h3 className="text-2xl font-semibold text-gray-700">No Products Found</h3>
            <p className="text-gray-500 mt-2">
              Try adjusting your filters to find what you're looking for.
            </p>
          </div>
        )}
      </>
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            Our Entire Collection
          </h1>
        </div>
        <div className="flex flex-col lg:flex-row gap-8">
          <FiltersSidebar
            filters={filters}
            categories={availableCategories}
            onSearchChange={handleSearchChange}
            onCategoryChange={handleCategoryChange}
            onZeroWasteChange={handleZeroWasteChange}
          />
          <div className="w-full lg:w-3/4">
            {renderContent()}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AllProductsPage;
