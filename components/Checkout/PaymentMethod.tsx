import React from 'react';
import { CreditCard, DollarSign } from 'lucide-react';

interface PaymentMethodProps {
  selectedMethod: 'cash' | 'card';
  onSelect: (method: 'cash' | 'card') => void;
}

const PaymentMethod: React.FC<PaymentMethodProps> = ({ selectedMethod, onSelect }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Payment Method</h2>
      
      <div className="space-y-4">
        <button
          onClick={() => onSelect('cash')}
          className={`w-full p-4 border rounded-lg flex items-center justify-between transition-colors ${
            selectedMethod === 'cash'
              ? 'border-blue-600 bg-blue-50'
              : 'border-gray-300 hover:border-gray-400'
          }`}
        >
          <div className="flex items-center">
            <DollarSign className="h-5 w-5 mr-3 text-gray-600" />
            <div className="text-left">
              <div className="font-medium text-gray-900">Cash</div>
              <div className="text-sm text-gray-500">Pay with cash</div>
            </div>
          </div>
          {selectedMethod === 'cash' && (
            <div className="h-4 w-4 rounded-full bg-blue-600"></div>
          )}
        </button>
        
        <button
          onClick={() => onSelect('card')}
          className={`w-full p-4 border rounded-lg flex items-center justify-between transition-colors ${
            selectedMethod === 'card'
              ? 'border-blue-600 bg-blue-50'
              : 'border-gray-300 hover:border-gray-400'
          }`}
        >
          <div className="flex items-center">
            <CreditCard className="h-5 w-5 mr-3 text-gray-600" />
            <div className="text-left">
              <div className="font-medium text-gray-900">Credit/Debit Card</div>
              <div className="text-sm text-gray-500">Pay with card</div>
            </div>
          </div>
          {selectedMethod === 'card' && (
            <div className="h-4 w-4 rounded-full bg-blue-600"></div>
          )}
        </button>
      </div>
      
      {selectedMethod === 'card' && (
        <div className="mt-6 p-4 border border-gray-300 rounded-lg">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Card Number
              </label>
              <input
                type="text"
                placeholder="1234 5678 9012 3456"
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Expiry Date
                </label>
                <input
                  type="text"
                  placeholder="MM/YY"
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  CVV
                </label>
                <input
                  type="text"
                  placeholder="123"
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentMethod;