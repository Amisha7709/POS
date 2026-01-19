import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { applyDiscount, clearDiscount, clearCart } from '@/store/slices/cartSlice';
import { formatCurrency } from '@/utils/helpers';
import CartItem from './CartItem';
import EmptyState from '@/components/UI/EmptyState';
import Button from '@/components/UI/Button';
import { ShoppingCart, Tag, X } from 'lucide-react';

const Cart: React.FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { items, subtotal, tax, total, discount, discountCode } = useAppSelector(state => state.cart);
  const [discountInput, setDiscountInput] = useState('');

  const handleApplyDiscount = () => {
    if (discountInput.trim()) {
      dispatch(applyDiscount(discountInput));
      setDiscountInput('');
    }
  };

  const handleCheckout = () => {
    router.push('/checkout');
  };

  if (items.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <EmptyState type="cart" />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <ShoppingCart className="h-6 w-6 text-blue-600 mr-2" />
            <h2 className="text-xl font-bold text-gray-900">Shopping Cart</h2>
            <span className="ml-2 text-sm text-gray-500">({items.length} items)</span>
          </div>
          <Button
            variant="danger"
            size="sm"
            onClick={() => dispatch(clearCart())}
          >
            Clear All
          </Button>
        </div>
        
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>
      </div>
      
      <div className="p-6">
        <div className="mb-4">
          <div className="flex items-center mb-2">
            <Tag className="h-5 w-5 text-gray-500 mr-2" />
            <h3 className="font-medium text-gray-700">Apply Discount Code</h3>
          </div>
          <div className="flex space-x-2">
            <input
              type="text"
              value={discountInput}
              onChange={(e) => setDiscountInput(e.target.value)}
              placeholder="Enter discount code"
              className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Button onClick={handleApplyDiscount}>
              Apply
            </Button>
          </div>
          {discountCode && (
            <div className="mt-2 flex items-center justify-between text-sm">
              <span className="text-green-600">
                Applied: {discountCode} ({discount > 0 ? formatCurrency(discount) : '0% off'})
              </span>
              <button
                onClick={() => dispatch(clearDiscount())}
                className="text-red-500 hover:text-red-700 flex items-center"
              >
                <X className="h-3 w-3 mr-1" />
                Remove
              </button>
            </div>
          )}
        </div>
        
        <div className="border-t pt-4 space-y-3">
          <div className="flex justify-between text-gray-600">
            <span>Subtotal</span>
            <span>{formatCurrency(subtotal)}</span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between text-green-600">
              <span>Discount</span>
              <span>-{formatCurrency(discount)}</span>
            </div>
          )}
          <div className="flex justify-between text-gray-600">
            <span>Tax (8%)</span>
            <span>{formatCurrency(tax)}</span>
          </div>
          <div className="flex justify-between text-xl font-bold text-gray-900 pt-3 border-t">
            <span>Total</span>
            <span>{formatCurrency(total)}</span>
          </div>
        </div>
        
        <div className="mt-6">
          <Button
            onClick={handleCheckout}
            fullWidth
            size="lg"
            className="text-lg"
          >
            Proceed to Checkout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Cart;