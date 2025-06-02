import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './productsSlice';
import paymentReducer from './paymentSlice';
import transactionReducer from './transactionSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    payment: paymentReducer,
    transaction: transactionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
