import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartState, CartItem, Product } from '@/types';
import { calculateCartTotals } from '@/utils/helpers';
import { DISCOUNT_CODES } from '@/utils/constants';
import { loadCartFromStorage, saveCartToStorage } from '@/lib/storage';

const savedCart = loadCartFromStorage();

const initialState: CartState = savedCart || {
  items: [],
  subtotal: 0,
  tax: 0,
  total: 0,
  discount: 0,
  discountType: null,
  discountCode: '',
};

const updateCartTotals = (state: CartState) => {
  const { subtotal, discount, tax, total } = calculateCartTotals(
    state.items,
    state.discount,
    state.discountType
  );
  state.subtotal = subtotal;
  state.discount = discount;
  state.tax = tax;
  state.total = total;
  saveCartToStorage(state);
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      
      if (existingItem) {
        if (existingItem.quantity < action.payload.stock) {
          existingItem.quantity += 1;
        }
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      
      updateCartTotals(state);
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      updateCartTotals(state);
    },
    updateQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
      const item = state.items.find(item => item.id === action.payload.id);
      if (item) {
        item.quantity = Math.max(1, action.payload.quantity);
        updateCartTotals(state);
      }
    },
    applyDiscount: (state, action: PayloadAction<string>) => {
      const code = action.payload.toUpperCase();
      const discount = DISCOUNT_CODES[code as keyof typeof DISCOUNT_CODES];
      
      if (discount) {
        state.discount = discount.value;
        state.discountType = discount.type as 'flat' | 'percentage'
        state.discountCode = code;
      } else {
        state.discount = 0;
        state.discountType = null;
        state.discountCode = '';
      }
      
      updateCartTotals(state);
    },
    clearDiscount: (state) => {
      state.discount = 0;
      state.discountType = null;
      state.discountCode = '';
      updateCartTotals(state);
    },
    clearCart: (state) => {
      state.items = [];
      state.discount = 0;
      state.discountType = null;
      state.discountCode = '';
      updateCartTotals(state);
    },
    setItemDiscount: (state, action: PayloadAction<{ id: number; discount: number }>) => {
      const item = state.items.find(item => item.id === action.payload.id);
      if (item) {
        item.discount = Math.min(100, Math.max(0, action.payload.discount));
        updateCartTotals(state);
      }
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  applyDiscount,
  clearDiscount,
  clearCart,
  setItemDiscount,
} = cartSlice.actions;

export default cartSlice.reducer;