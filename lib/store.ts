import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from '@/store/slices/authSlice';
import { cartSlice } from '@/store/slices/cartSlice';
import { productsSlice } from '@/store/slices/productsSlice';
import { ordersSlice } from '@/store/slices/ordersSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authSlice.reducer,
      cart: cartSlice.reducer,
      products: productsSlice.reducer,
      orders: ordersSlice.reducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];