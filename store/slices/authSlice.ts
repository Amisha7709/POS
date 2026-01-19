import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, User } from '@/types';
import { MOCK_USERS } from '@/utils/constants';
import { loadAuthFromStorage, saveAuthToStorage, clearStorage } from '@/lib/storage';

const savedAuth = loadAuthFromStorage();

const initialState: AuthState = savedAuth || {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
      saveAuthToStorage(state);
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      clearStorage();
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions;

export const login = (email: string, password: string) => async (dispatch: any) => {
  try {
    dispatch(loginStart());
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const user = MOCK_USERS.find(u => u.email === email && u.password === password);
    
    if (user) {
      const { password: _, ...userWithoutPassword } = user;
      dispatch(loginSuccess(userWithoutPassword as User));
    } else {
      dispatch(loginFailure('Invalid email or password'));
    }
  } catch (error) {
    dispatch(loginFailure('Login failed. Please try again.'));
  }
};

export default authSlice.reducer;