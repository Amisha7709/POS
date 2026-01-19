import React from 'react';
import { ShoppingCart, Package, Search } from 'lucide-react';

interface EmptyStateProps {
  type: 'cart' | 'products' | 'orders' | 'search';
  message?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ type, message }) => {
  const config = {
    cart: {
      icon: ShoppingCart,
      title: 'Your cart is empty',
      description: 'Add products to get started',
    },
    products: {
      icon: Package,
      title: 'No products found',
      description: 'Try adjusting your search',
    },
    orders: {
      icon: Package,
      title: 'No orders yet',
      description: 'Your completed orders will appear here',
    },
    search: {
      icon: Search,
      title: 'No results found',
      description: 'Try a different search term',
    },
  };

  const { icon: Icon, title, description } = config[type];

  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <Icon className="w-16 h-16 text-gray-400 mb-4" />
      <h3 className="text-lg font-semibold text-gray-700 mb-2">{message || title}</h3>
      <p className="text-gray-500">{description}</p>
    </div>
  );
};

export default EmptyState;