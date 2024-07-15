import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: localStorage.getItem('isAuthenticated') === 'true',
    error: null,
  },
  reducers: {
    login: (state) => {
      state.isAuthenticated = true;
      state.error = null;
      localStorage.setItem('isAuthenticated', 'true');
    },
    loginFailed(state, action) {
      state.isAuthenticated = false;
      state.error = action.payload;
      localStorage.removeItem('isAuthenticated');
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.error = null;
      localStorage.removeItem('isAuthenticated');
    },
    clearError: (state) => {
      state.error = null;
    },
    checkAuthStatus: (state) => {
      state.isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    },
  },
});

export const { login, loginFailed, logout, clearError, checkAuthStatus } = authSlice.actions;
export default authSlice.reducer;