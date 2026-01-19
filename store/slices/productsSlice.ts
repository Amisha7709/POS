import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { ProductState, Product } from '@/types';
import { MOCK_PRODUCTS } from '@/utils/constants';

const initialState: ProductState = {
  products: MOCK_PRODUCTS,
  filteredProducts: MOCK_PRODUCTS,
  loading: false,
  error: null,
  searchQuery: '',
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
      state.filteredProducts = action.payload;
    },
    searchProducts: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      if (!action.payload.trim()) {
        state.filteredProducts = state.products;
      } else {
        const query = action.payload.toLowerCase();
        state.filteredProducts = state.products.filter(product =>
          product.name.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query)
        );
      }
    },
    updateStock: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
      const product = state.products.find(p => p.id === action.payload.id);
      if (product) {
        product.stock = Math.max(0, product.stock - action.payload.quantity);
      }
    },
  },
});

export const { setProducts, searchProducts, updateStock } = productsSlice.actions;

export default productsSlice.reducer;