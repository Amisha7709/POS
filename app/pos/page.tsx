'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/store/hooks';
import Header from '@/components/Layout/Header';
import Sidebar from '@/components/Layout/Sidebar';
import ProductList from '@/components/Products/ProductList';
import Cart from '@/components/Cart/Cart';
import LoadingSpinner from '@/components/UI/LoadingSpinner';
import { Search } from 'lucide-react';
import { useAppDispatch } from '@/store/hooks';
import { searchProducts } from '@/store/slices/productsSlice';

export default function POSPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isAuthenticated, loading } = useAppSelector(state => state.auth);
  const { searchQuery } = useAppSelector(state => state.products);

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
            <h1 className="text-2xl font-bold text-gray-900 mb-2">POS Billing</h1>
            <p className="text-gray-600">Search products and manage cart</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search products by name or category..."
                    value={searchQuery}
                    onChange={(e) => dispatch(searchProducts(e.target.value))}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <ProductList />
            </div>

            <div>
              <Cart />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}