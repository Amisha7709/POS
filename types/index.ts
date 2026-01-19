export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  stock: number;
  description?: string;
}

export interface CartItem extends Product {
  quantity: number;
  discount?: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
  discount: number;
  paymentMethod: 'cash' | 'card';
  status: 'pending' | 'completed' | 'cancelled';
  createdAt: string;
  customerName?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'cashier';
  token?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

export interface CartState {
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
  discount: number;
  discountType: 'percentage' | 'flat' | null;
  discountCode: string;
}

export interface ProductState {
  products: Product[];
  filteredProducts: Product[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
}

export interface OrdersState {
  orders: Order[];
  loading: boolean;
  error: string | null;
  currentOrder: Order | null;
}