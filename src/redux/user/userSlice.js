import { createSlice } from '@reduxjs/toolkit';
import { addBalance } from './userOperations';


const initialState = {
  newBalance: null,
  isLoading: false,
  error: null,

};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},

  extraReducers: builder => {

    builder.addCase(addBalance.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addBalance.fulfilled, (state, action) => {
      state.newBalance = action.payload.newBalance;
      state.isLoading = false;
    });
    builder.addCase(addBalance.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    });
  }
});

export const userReducer = userSlice.reducer;
