import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { OrdersState, Order, CartItem } from '@/types';
import { generateOrderId, formatDate } from '@/utils/helpers';

const initialState: OrdersState = {
  orders: [],
  loading: false,
  error: null,
  currentOrder: null,
};

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    createOrder: (state, action: PayloadAction<{
      items: CartItem[];
      subtotal: number;
      tax: number;
      total: number;
      discount: number;
      paymentMethod: 'cash' | 'card';
      customerName?: string;
    }>) => {
      const newOrder: Order = {
        id: generateOrderId(),
        ...action.payload,
        status: 'completed',
        createdAt: new Date().toISOString(),
      };
      state.orders.unshift(newOrder);
      state.currentOrder = newOrder;
    },
    setOrders: (state, action: PayloadAction<Order[]>) => {
      state.orders = action.payload;
    },
    setCurrentOrder: (state, action: PayloadAction<Order | null>) => {
      state.currentOrder = action.payload;
    },
  },
});

export const { createOrder, setOrders, setCurrentOrder } = ordersSlice.actions;

export default ordersSlice.reducer;