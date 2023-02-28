import { createAsyncThunk } from '@reduxjs/toolkit';

export const thunkName = createAsyncThunk(
  'signature/thunkName',
  async (data, { rejectWithValue }) => {
    try {
      
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
