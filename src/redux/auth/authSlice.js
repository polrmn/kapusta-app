import { createSlice } from '@reduxjs/toolkit';
import { loginThunk, logoutThunk, refreshThunk, signUpThunk } from './authOperations';


const initialState = {
  isLoading: false,
  isLogin: false,
  error: null,
  userEmail: null,
  userId: null,
  userSid: null,
  accessToken: null,
  refreshToken: null,
  transactions: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: ({ addCase }) => {
    // signUp
    addCase(signUpThunk.pending, (state, { payload }) => {
      state.isLoading = true;
      console.log('signUpThunk.pending');
    });
    addCase(signUpThunk.fulfilled, (state, { payload }) => {
      console.log('signUpThunk.fulfilled');
    });
    addCase(signUpThunk.rejected, (state, { payload }) => {
      state.error = payload;
      state.isLoading = false;
      console.log('signUpThunk.rejected', payload);
    });
    // login
    addCase(loginThunk.pending, (state, { payload }) => {
      state.isLoading = true;
      console.log('loginThunk.pending');
    });
    addCase(loginThunk.fulfilled, (state, { payload }) => {
      state.accessToken = payload.accessToken;
      state.refreshToken = payload.refreshToken;
      state.userSid = payload.sid;
      state.userEmail = payload.userData.email;
      state.userId = payload.userData.id;
      state.transactions = payload.userData.transactions;
      state.isLoading = false;
      state.isLogin = true;
      console.log('loginThunk.fulfilled');
    });
    addCase(loginThunk.rejected, (state, { payload }) => {
      state.error = payload;
      state.isLoading = false;
      console.log('loginThunk.rejected', payload);
    });
    // logout
    addCase(logoutThunk.pending, (state, { payload }) => {
      console.log('logoutThunk.pending');
      state.isLoading = true;
    });
    addCase(logoutThunk.fulfilled, (state, { payload }) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.userSid = null;
      state.userEmail = null;
      state.userId = null;
      state.transactions = null;
      state.isLoading = false;
      state.isLogin = false;
      console.log('logoutThunk.fulfilled');
    });
    addCase(logoutThunk.rejected, (state, { payload }) => {
      state.error = payload;
      state.isLoading = false;
      console.log('logoutThunk.rejected', payload);
    });
    // refresh
    addCase(refreshThunk.pending, (state, { payload }) => {
      state.isLoading = true;
    });
    addCase(refreshThunk.fulfilled, (state, { payload }) => {
      console.log('refreshThunk.fulfilled');
    });
    addCase(refreshThunk.rejected, (state, { payload }) => {
      state.error = payload;
      state.isLoading = false;
      console.log('refreshThunk.rejected', payload);
    });
  },
});

export const authReducer = authSlice.reducer;
