import { createSlice } from '@reduxjs/toolkit';
import {getTransactionsThunk} from './transactionOperations'

const initialState = {

};

export const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {},
  extraReducers: builder => {
     builder
      .addCase(getTransactionsThunk.pending, state => {
        state.isLoading = true;
      })
      .addCase(getTransactionsThunk.fulfilled, (state,{payload}) => {
        state.isLoading = false;
        state.items = payload
      })
      .addCase(getTransactionsThunk.rejected, (state,{payload}) => {
        state.isLoading = false;
        state.error = payload
      })

  }

});

export const transactionReducer = transactionSlice.reducer;
 console.log(createSlice);