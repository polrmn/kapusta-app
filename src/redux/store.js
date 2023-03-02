import { configureStore } from '@reduxjs/toolkit';

import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { transactionReducer } from './transaction/transactionSlice';
import { userReducer } from './user/userSlice';
import { authReducer } from './auth/authSlice';
import { dateReducer } from './dateSlice';

const persistConfig = {
  key: 'persisted-token',
  storage,
  whitelist: ['accessToken','userSid','refreshToken'],
};

const persistedReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    auth: persistedReducer,
    transaction: transactionReducer,
    user: userReducer,
    date: dateReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
