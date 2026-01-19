'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/store/hooks';
import Header from '@/components/Layout/Header';
import Sidebar from '@/components/Layout/Sidebar';
import LoadingSpinner from '@/components/UI/LoadingSpinner';
import { DollarSign, Package, TrendingUp, Users } from 'lucide-react';

export default function Page() {
  const router = useRouter();
  const { isAuthenticated, loading, user } = useAppSelector(state => state.auth);
  const { orders } = useAppSelector(state => state.orders);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const stats = [
    {
      title: 'Total Sales',
      value: '$12,548',
      change: '+12.5%',
      icon: DollarSign,
      color: 'bg-green-500',
    },
    {
      title: 'Total Orders',
      value: '1,248',
      change: '+8.2%',
      icon: Package,
      color: 'bg-blue-500',
    },
    {
      title: 'Average Order Value',
      value: '$78.50',
      change: '+5.3%',
      icon: TrendingUp,
      color: 'bg-purple-500',
    },
    {
      title: 'Today\'s Revenue',
      value: '$2,456',
      change: '+15.7%',
      icon: Users,
      color: 'bg-orange-500',
    },
  ];

  const recentOrders = orders.slice(0, 5);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600">Welcome back, {user?.name}!</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                      <p className="text-sm text-green-600 mt-1">{stat.change} from last month</p>
                    </div>
                    <div className={`${stat.color} p-3 rounded-full`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Recent Orders</h2>
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between border-b pb-4">
                    <div>
                      <p className="font-medium text-gray-900">{order.id}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900">${order.total.toFixed(2)}</p>
                      <p className="text-sm text-gray-500 capitalize">{order.paymentMethod}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h2>
              <div className="space-y-4">
                <button
                  onClick={() => router.push('/pos')}
                  className="w-full text-left p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="font-medium text-gray-900">Start New Sale</div>
                  <div className="text-sm text-gray-500">Begin a new point of sale transaction</div>
                </button>
                <button
                  onClick={() => router.push('/sales-history')}
                  className="w-full text-left p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="font-medium text-gray-900">View Sales History</div>
                  <div className="text-sm text-gray-500">Browse completed orders and reports</div>
                </button>
                {user?.role === 'admin' && (
                  <button
                    onClick={() => router.push('/settings')}
                    className="w-full text-left p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="font-medium text-gray-900">System Settings</div>
                    <div className="text-sm text-gray-500">Manage users and system preferences</div>
                  </button>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}