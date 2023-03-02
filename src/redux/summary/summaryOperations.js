// import { createAsyncThunk } from '@reduxjs/toolkit';

// import { getExpenseAPI, getIncomeAPI } from 'services/transactionService';

// export const getIncome = createAsyncThunk(
//   'transition/getIncome',
//   async (_, { rejectWithValue }) => {
//     try {
//       const data = await getIncomeAPI();
//       return data;
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// export const getExpense = createAsyncThunk(
//   'transition/getExpense',
//   async (_, { rejectWithValue }) => {
//     try {
//       const data = await getExpenseAPI();
//       return data;
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );
