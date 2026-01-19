import React from 'react';
import { CartItem } from '@/types';
import { formatCurrency } from '@/utils/helpers';
import { Package } from 'lucide-react';

interface OrderSummaryProps {
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
  discount: number;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  items,
  subtotal,
  tax,
  total,
  discount,
}) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
      
      <div className="space-y-4 mb-6">
        {items.map((item) => {
          const itemTotal = item.price * item.quantity;
          const discountedTotal = item.discount ? itemTotal * (1 - item.discount / 100) : itemTotal;
          
          return (
            <div key={item.id} className="flex items-center justify-between py-2 border-b">
              <div className="flex items-center">
                <Package className="h-4 w-4 text-gray-400 mr-3" />
                <div>
                  <h4 className="font-medium text-gray-900">{item.name}</h4>
                  <p className="text-sm text-gray-500">
                    {item.quantity} × {formatCurrency(item.price)}
                    {item.discount !== undefined && item.discount > 0 && (
                      <span className="ml-2 text-green-600">({item.discount}% off)</span>
                    )}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium">{formatCurrency(discountedTotal)}</div>
                {item.discount !== undefined && item.discount > 0 && (
                  <div className="text-sm text-gray-500 line-through">
                    {formatCurrency(itemTotal)}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="space-y-3 border-t pt-4">
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
          <span>Total Amount</span>
          <span>{formatCurrency(total)}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;