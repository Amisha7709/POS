import React, { useState } from 'react';
import { CartItem as CartItemType } from '@/types';
import { formatCurrency } from '@/utils/helpers';
import { useAppDispatch } from '@/store/hooks';
import { removeFromCart, updateQuantity, setItemDiscount } from '@/store/slices/cartSlice';
import { Minus, Plus, Trash2, Percent } from 'lucide-react';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const dispatch = useAppDispatch();
  const [showDiscountInput, setShowDiscountInput] = useState(false);
  const [discountInput, setDiscountInput] = useState(item.discount?.toString() || '');

  const handleQuantityChange = (change: number) => {
    const newQuantity = item.quantity + change;
    if (newQuantity >= 1 && newQuantity <= item.stock) {
      dispatch(updateQuantity({ id: item.id, quantity: newQuantity }));
    }
  };

  const handleRemove = () => {
    dispatch(removeFromCart(item.id));
  };

  const handleDiscountSubmit = () => {
    const discount = parseFloat(discountInput);
    if (!isNaN(discount) && discount >= 0 && discount <= 100) {
      dispatch(setItemDiscount({ id: item.id, discount }));
      setShowDiscountInput(false);
    }
  };

  const itemTotal = item.price * item.quantity;
  const discountedTotal = item.discount ? itemTotal * (1 - item.discount / 100) : itemTotal;

  return (
    <div className="flex items-center justify-between p-4 border-b">
      <div className="flex-1">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h4 className="font-medium text-gray-900">{item.name}</h4>
            <p className="text-sm text-gray-500">{item.category}</p>
          </div>
          <button
            onClick={handleRemove}
            className="text-red-500 hover:text-red-700 p-1"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center border rounded-lg">
              <button
                onClick={() => handleQuantityChange(-1)}
                className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                disabled={item.quantity <= 1}
              >
                <Minus className="h-3 w-3" />
              </button>
              <span className="px-3 py-1 text-sm font-medium">{item.quantity}</span>
              <button
                onClick={() => handleQuantityChange(1)}
                className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                disabled={item.quantity >= item.stock}
              >
                <Plus className="h-3 w-3" />
              </button>
            </div>
            
            <button
              onClick={() => setShowDiscountInput(!showDiscountInput)}
              className={`flex items-center text-sm ${
                item.discount ? 'text-green-600' : 'text-gray-500'
              }`}
            >
              <Percent className="h-3 w-3 mr-1" />
              {item.discount ? `${item.discount}% off` : 'Add discount'}
            </button>
          </div>
          
          <div className="text-right">
            <div className="font-medium text-gray-900">
              {formatCurrency(discountedTotal)}
            </div>
            <div className="text-sm text-gray-500">
              {formatCurrency(item.price)} each
              {item.discount !== undefined && item.discount > 0 && (
                <span className="ml-2 text-green-600">
                  Save {formatCurrency(itemTotal - discountedTotal)}
                </span>
              )}
            </div>
          </div>
        </div>
        
        {showDiscountInput && (
          <div className="mt-3 flex items-center space-x-2">
            <input
              type="number"
              min="0"
              max="100"
              step="1"
              value={discountInput}
              onChange={(e) => setDiscountInput(e.target.value)}
              className="border rounded px-2 py-1 text-sm w-24"
              placeholder="Discount %"
            />
            <button
              onClick={handleDiscountSubmit}
              className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
            >
              Apply
            </button>
            <button
              onClick={() => {
                setShowDiscountInput(false);
                setDiscountInput('');
              }}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartItem;