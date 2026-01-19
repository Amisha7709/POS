import React from 'react';
import { Product } from '@/types';
import { formatCurrency } from '@/utils/helpers';
import Button from '@/components/UI/Button';
import { useAppDispatch } from '@/store/hooks';
import { addToCart } from '@/store/slices/cartSlice';
import { Package } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-gray-800 text-lg">{product.name}</h3>
          <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-xl">
            {product.category}
          </span>
        </div>
        
        <p className="text-gray-600 text-sm mb-4">{product.description}</p>
        
        <div className="flex items-center justify-between mb-4">
          <div className="text-2xl font-bold text-green-700">
            {formatCurrency(product.price)}
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Package className="h-4 w-4 mr-1 text-yellow-800" />
            {product.stock} in stock
          </div>
        </div>
        
        <Button
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          fullWidth
          className="flex items-center justify-center"
        >
          {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;