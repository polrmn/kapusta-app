import { createSlice } from '@reduxjs/toolkit';


const initialState = {

};

export const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {},
});

export const transactionReducer = transactionSlice.reducer;
