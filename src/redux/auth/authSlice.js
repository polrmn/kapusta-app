import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  isLoading: false,
  error: null,
  user: null,
  token: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
});

export const authReducer = authSlice.reducer;
