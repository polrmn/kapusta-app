import { createSlice } from '@reduxjs/toolkit';
import { addBalance } from 'redux/user/userOperations';
import { getUserThunk, googleAuthThunk, loginThunk, logoutThunk, refreshThunk, signUpThunk } from './authOperations';


const initialState = {
  isLoading: false,
  isLogin: false,
  error: null,
  userEmail: null,
  userSid: null,
  accessToken: null,
  refreshToken: null,
  transactions: null,
  balance: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: ({ addCase }) => {
    // signUp
    addCase(signUpThunk.pending, (state, { payload }) => {
      state.isLoading = true;
      // console.log('signUpThunk.pending');
    });
    addCase(signUpThunk.fulfilled, (state, { payload }) => {
      // console.log('signUpThunk.fulfilled');
      state.error = null;
    });
    addCase(signUpThunk.rejected, (state, { payload }) => {
      state.error = payload;
      state.isLoading = false;
      // console.log('signUpThunk.rejected', payload);
    });
    // login
    addCase(loginThunk.pending, (state, { payload }) => {
      state.isLoading = true;
      // console.log('loginThunk.pending');
    });
    addCase(loginThunk.fulfilled, (state, { payload }) => {
      state.accessToken = payload.accessToken;
      state.refreshToken = payload.refreshToken;
      state.userSid = payload.sid;
      state.userEmail = payload.userData.email;
      state.transactions = payload.userData.transactions;
      state.isLoading = false;
      state.isLogin = true;
      state.error = null;
      // console.log('loginThunk.fulfilled');
    });
    addCase(loginThunk.rejected, (state, { payload }) => {
      state.error = payload;
      state.isLoading = false;
      // console.log('loginThunk.rejected', payload);
    });
    // logout
    addCase(logoutThunk.pending, (state, { payload }) => {
      // console.log('logoutThunk.pending');
      state.isLoading = true;
    });
    addCase(logoutThunk.fulfilled, (state, { payload }) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.userSid = null;
      state.userEmail = null;
      state.transactions = null;
      state.isLoading = false;
      state.isLogin = false;
      state.error = null;
      // console.log('logoutThunk.fulfilled');
    });
    addCase(logoutThunk.rejected, (state, { payload }) => {
      state.error = payload;
      state.isLoading = false;
      // console.log('logoutThunk.rejected', payload);
    });
    // refresh
    addCase(refreshThunk.pending, (state, { payload }) => {
      state.isLoading = true;
    });
    addCase(refreshThunk.fulfilled, (state, { payload }) => {
      // console.log('refreshThunk.fulfilled');
      state.error = null;
    });
    addCase(refreshThunk.rejected, (state, { payload }) => {
      state.error = payload;
      state.isLoading = false;
      // console.log('refreshThunk.rejected');
    });
    // get User
    addCase(getUserThunk.pending, (state, { payload }) => {
      state.isLoading = true;
      // console.log('getUserThunk.pending');
    });
    addCase(getUserThunk.fulfilled, (state, { payload }) => {
      state.userEmail = payload.email
      state.isLogin = true
      state.isLoading = false;
      state.transactions = payload.transactions;
      state.balance = payload.balance;
      state.error = null;
      // console.log('getUserThunk.fulfilled');

    });
    addCase(getUserThunk.rejected, (state, { payload }) => {
      state.error = payload;
      state.isLoading = false;
      console.log('getUserThunk.rejected', payload);
    });
    // google auth
    addCase(googleAuthThunk.fulfilled, (state, { payload }) => {
      state.accessToken = payload.accessToken;
      state.userSid = payload.sid;
      state.refreshToken = payload.refreshToken;
      state.userEmail = null;
      state.transactions = null;
      state.isLoading = false;
      state.isLogin = false;
      state.error = null;
    })
    // balance
    addCase(addBalance.fulfilled, (state, action) => {
      state.balance = action.payload.newBalance;
    });
  },
});

export const authReducer = authSlice.reducer;
