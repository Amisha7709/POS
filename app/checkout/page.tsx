'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { clearCart } from '@/store/slices/cartSlice';
import { createOrder } from '@/store/slices/ordersSlice';
import { updateStock } from '@/store/slices/productsSlice';
import Header from '@/components/Layout/Header';
import Sidebar from '@/components/Layout/Sidebar';
import OrderSummary from '@/components/Checkout/OrderSummary';
import PaymentMethod from '@/components/Checkout/PaymentMethod';
import Button from '@/components/UI/Button';
import LoadingSpinner from '@/components/UI/LoadingSpinner';
import { CheckCircle, ShoppingBag } from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isAuthenticated, loading: authLoading } = useAppSelector(state => state.auth);
  const { items, subtotal, tax, total, discount } = useAppSelector(state => state.cart);
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card'>('cash');
  const [customerName, setCustomerName] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderCompleted, setOrderCompleted] = useState(false);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, authLoading, router]);

  const handleCompleteOrder = async () => {
    if (items.length === 0) return;

    setIsProcessing(true);

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Update stock for each item
    items.forEach(item => {
      dispatch(updateStock({ id: item.id, quantity: item.quantity }));
    });

    // Create order
    dispatch(createOrder({
      items,
      subtotal,
      tax,
      total,
      discount,
      paymentMethod,
      customerName: customerName || undefined,
    }));

    dispatch(clearCart());

    setIsProcessing(false);
    setOrderCompleted(true);
  };

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

  if (orderCompleted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 p-6">
            <div className="max-w-2xl mx-auto mt-12">
              <div className="bg-white rounded-lg shadow p-8 text-center">
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
                <h1 className="text-2xl font-bold text-gray-900 mb-4">Order Completed!</h1>
                <p className="text-gray-600 mb-6">
                  Your order has been successfully processed. Redirecting to sales history...
                </p>
                <div className="flex justify-center space-x-4">
                  <Button onClick={() => router.push('/pos')} className='flex items-center'>
                    <ShoppingBag className="h-4 w-4 mr-2" />
                    New Sale
                  </Button>
                  <Button variant="outline" onClick={() => router.push('/sales-history')}>
                    View Orders
                  </Button>
                </div>
              </div>
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
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Checkout</h1>
            <p className="text-gray-600">Review order and complete payment</p>
          </div>

          {items.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <ShoppingBag className="h-16 w-16 text-gray-400 mx-auto mb-6" />
              <h2 className="text-xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
              <p className="text-gray-600 mb-6">Add products to your cart before checkout</p>
              <Button onClick={() => router.push('/pos')}>Back to POS</Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white rounded-lg shadow p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Customer Information</h2>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Customer Name (Optional)
                    </label>
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Enter customer name"
                      className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <OrderSummary
                  items={items}
                  subtotal={subtotal}
                  tax={tax}
                  total={total}
                  discount={discount}
                />
              </div>

              <div className="space-y-6">
                <PaymentMethod
                  selectedMethod={paymentMethod}
                  onSelect={setPaymentMethod}
                />

                <div className="bg-white rounded-lg shadow p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Complete Order</h2>
                  <div className="space-y-4">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total:</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                    <Button
                      onClick={handleCompleteOrder}
                      loading={isProcessing}
                      fullWidth
                      size="lg"
                      className="text-lg"
                    >
                      {paymentMethod === 'cash' ? 'Complete Sale' : 'Process Payment'}
                    </Button>
                    <Button
                      onClick={() => router.push('/pos')}
                      variant="secondary"
                      fullWidth
                    >
                      Back to Cart
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}