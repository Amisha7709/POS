import React from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { logout } from '@/store/slices/authSlice';
import { ShoppingCart, User, LogOut } from 'lucide-react';
import Button from '@/components/UI/Button';

const Header: React.FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user, isAuthenticated } = useAppSelector(state => state.auth);
  const { items } = useAppSelector(state => state.cart);

  const handleLogout = () => {
    dispatch(logout());
    router.push('/login');
  };

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <ShoppingCart className="h-8 w-8 text-blue-600" />
            <h1 className="ml-2 text-xl font-bold text-gray-900">POS System</h1>
          </div>

          {isAuthenticated && user && (
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <User className="h-5 w-5 text-gray-500 mr-2" />
                <div className="text-sm">
                  <p className="text-gray-500 capitalize">{user.role}</p>
                </div>
              </div>
              
              {user.role === 'admin' && (
                <div className="text-sm text-gray-600">
                  Cart: {items.length} items
                </div>
              )}

              <Button
                variant="danger"
                size="sm"
                onClick={handleLogout}
                className="flex items-center"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;