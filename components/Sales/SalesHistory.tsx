import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { setOrders } from '@/store/slices/ordersSlice';
import { formatCurrency, formatDate } from '@/utils/helpers';
import { CreditCard, DollarSign, Eye } from 'lucide-react';
import Button from '@/components/UI/Button';
import EmptyState from '@/components/UI/EmptyState';
import { Order } from '@/types';

const SalesHistory: React.FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { orders } = useAppSelector(state => state.orders);

  useEffect(() => {
  const mockOrders: Order[] = Array.from({ length: 10 }, (_, i) => ({
    id: `ORD-${1000 + i}`,
    items: [],
    subtotal: Math.random() * 1000 + 100,
    tax: Math.random() * 100 + 10,
    total: Math.random() * 1000 + 100,
    discount: Math.random() * 50,
    paymentMethod: Math.random() > 0.5 ? 'cash' : 'card',
    status: 'completed',
    createdAt: new Date(Date.now() - i * 86400000).toISOString(),
    customerName: `Customer ${i + 1}`,
  }))

  dispatch(setOrders(mockOrders))
}, [dispatch])

  const handleViewDetails = (orderId: string) => {
    router.push(`/order-details/${orderId}`);
  };

  if (orders.length === 0) {
    return <EmptyState type="orders" />;
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-6 border-b">
        <h2 className="text-xl font-bold text-gray-900">Sales History</h2>
        <p className="text-gray-600 mt-1">View all completed orders</p>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date & Time
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Payment
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-blue-600">{order.id}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{formatDate(order.createdAt)}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{order.customerName}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {order.paymentMethod === 'cash' ? (
                      <DollarSign className="h-4 w-4 text-green-600 mr-2" />
                    ) : (
                      <CreditCard className="h-4 w-4 text-blue-600 mr-2" />
                    )}
                    <span className="text-sm text-gray-900 capitalize">
                      {order.paymentMethod}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-bold text-gray-900">
                    {formatCurrency(order.total)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Button
                    variant="blue"
                    size="sm"
                    onClick={() => handleViewDetails(order.id)}
                    className="flex items-center"
                  >
                    <Eye className="h-3 w-3 mr-2" />
                    View Details
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SalesHistory;