'use client';

import React, { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAppSelector } from '@/store/hooks';
import Header from '@/components/Layout/Header';
import Sidebar from '@/components/Layout/Sidebar';
import LoadingSpinner from '@/components/UI/LoadingSpinner';
import { formatCurrency, formatDate } from '@/utils/helpers';
import { CreditCard, DollarSign, Calendar, Package, ArrowLeft } from 'lucide-react';
import Button from '@/components/UI/Button';

export default function OrderDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { isAuthenticated, loading: authLoading } = useAppSelector(state => state.auth);
  const { orders } = useAppSelector(state => state.orders);

  const orderId = params.id as string;
  const order = orders.find(o => o.id === orderId);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, authLoading, router]);

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 p-6">
            <div className="text-center py-12">
              <Package className="h-16 w-16 text-gray-400 mx-auto mb-6" />
              <h2 className="text-xl font-bold text-gray-900 mb-4">Order Not Found</h2>
              <p className="text-gray-600 mb-6">The order you're looking for doesn't exist.</p>
              <Button onClick={() => router.push('/sales-history')}>
                Back to Sales History
              </Button>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <div className="mb-6">
            <Button
              variant="outline"
              onClick={() => router.back()}
              className="mb-4 flex items-center"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <h1 className="text-2xl font-bold text-gray-900">Order Details</h1>
            <p className="text-gray-600">Order #{order.id}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow p-6 mb-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Order Items</h2>
                <div className="space-y-4">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex items-center justify-between border-b pb-4">
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">{item.name}</div>
                        <div className="text-sm text-gray-500">{item.category}</div>
                        {item.discount !== undefined && item.discount > 0 && (
                          <div className="text-sm text-green-600">{item.discount}% discount applied</div>
                        )}
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{formatCurrency(item.price * item.quantity)}</div>
                        <div className="text-sm text-gray-500">
                          {item.quantity} × {formatCurrency(item.price)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h2>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span>{formatCurrency(order.subtotal)}</span>
                  </div>
                  {order.discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span>-{formatCurrency(order.discount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax (8%)</span>
                    <span>{formatCurrency(order.tax)}</span>
                  </div>
                  <div className="flex justify-between text-xl font-bold pt-3 border-t">
                    <span>Total</span>
                    <span>{formatCurrency(order.total)}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Order Information</h2>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-gray-400 mr-3" />
                    <div>
                      <div className="text-sm text-gray-500">Order Date</div>
                      <div className="font-medium">{formatDate(order.createdAt)}</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    {order.paymentMethod === 'cash' ? (
                      <DollarSign className="h-5 w-5 text-gray-400 mr-3" />
                    ) : (
                      <CreditCard className="h-5 w-5 text-gray-400 mr-3" />
                    )}
                    <div>
                      <div className="text-sm text-gray-500">Payment Method</div>
                      <div className="font-medium capitalize">{order.paymentMethod}</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Package className="h-5 w-5 text-gray-400 mr-3" />
                    <div>
                      <div className="text-sm text-gray-500">Status</div>
                      <div className="font-medium capitalize">{order.status}</div>
                    </div>
                  </div>
                  {order.customerName && (
                    <div>
                      <div className="text-sm text-gray-500">Customer</div>
                      <div className="font-medium">{order.customerName}</div>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Actions</h2>
                <div className="space-y-3">
                  <Button
                    onClick={() => window.print()}
                    fullWidth
                    variant="outline"
                  >
                    Print Receipt
                  </Button>
                  <Button
                    onClick={() => router.push('/sales-history')}
                    fullWidth
                    variant="outline"
                  >
                    Back to Sales History
                  </Button>
                  <Button
                    onClick={() => router.push('/pos')}
                    fullWidth
                  >
                    New Sale
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}