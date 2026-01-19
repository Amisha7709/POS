import React from 'react';
import { useAppSelector } from '@/store/hooks';
import ProductCard from './ProductCard';
import EmptyState from '@/components/UI/EmptyState';
import LoadingSpinner from '@/components/UI/LoadingSpinner';

const ProductList: React.FC = () => {
  const { filteredProducts, loading, searchQuery } = useAppSelector(state => state.products);

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (filteredProducts.length === 0) {
    return (
      <EmptyState
        type={searchQuery ? 'search' : 'products'}
        message={searchQuery ? `No results for "${searchQuery}"` : undefined}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;