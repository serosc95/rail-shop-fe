import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './productsSlice';
import paymentReducer from './paymentSlice';
import transactionReducer from './transactionSlice';
import checkoutReducer from './checkoutSlice';


export const store = configureStore({
  reducer: {
    products: productsReducer,
    payment: paymentReducer,
    transaction: transactionReducer,
    checkout: checkoutReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: import.meta.env.MODE !== 'production', // habilita Redux DevTools solo en desarrollo
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
