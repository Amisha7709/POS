'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/store/hooks';
import Header from '@/components/Layout/Header';
import Sidebar from '@/components/Layout/Sidebar';
import SalesHistory from '@/components/Sales/SalesHistory';
import LoadingSpinner from '@/components/UI/LoadingSpinner';

export default function SalesHistoryPage() {
  const router = useRouter();
  const { isAuthenticated, loading } = useAppSelector(state => state.auth);

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

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Sales History</h1>
            <p className="text-gray-600">View and manage completed orders</p>
          </div>

          <SalesHistory />
        </main>
      </div>
    </div>
  );
}