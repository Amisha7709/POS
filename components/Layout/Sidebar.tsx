import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAppSelector } from '@/store/hooks';
import {
  LayoutDashboard,
  ShoppingCart,
  CreditCard,
  History,
  Settings,
  Users,
} from 'lucide-react';

const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const { user } = useAppSelector(state => state.auth);

  const adminRoutes = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/pos', label: 'POS Billing', icon: ShoppingCart },
    { href: '/checkout', label: 'Checkout', icon: CreditCard },
    { href: '/sales-history', label: 'Sales History', icon: History },
    { href: '/users', label: 'Users', icon: Users },
    { href: '/settings', label: 'Settings', icon: Settings },
  ];

  const cashierRoutes = [
    { href: '/pos', label: 'POS Billing', icon: ShoppingCart },
    { href: '/checkout', label: 'Checkout', icon: CreditCard },
    { href: '/sales-history', label: 'Sales History', icon: History },
  ];

  const routes = user?.role === 'admin' ? adminRoutes : cashierRoutes;

  return (
    <aside className="bg-gray-800 text-white w-64 min-h-screen">
      <nav className="mt-5">
        {routes.map((route) => {
          const isActive = pathname === route.href;
          return (
            <Link
              key={route.href}
              href={route.href}
              className={`flex items-center px-4 py-3 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              <route.icon className="h-5 w-5 mr-3" />
              {route.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;