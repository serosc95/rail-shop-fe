import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface CardData {
  productId?: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
  name: string;
  cantidad: number;
  cuotas: number;
  email: string;
}

interface PaymentState {
  cardData: CardData | null;
}

const initialState: PaymentState = {
  cardData: null,
};

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    setCardData(state, action: PayloadAction<CardData>) {
      state.cardData = action.payload;
    },
    resetPayment(state) {
      state.cardData = null;
    },
  },
});

export const { setCardData, resetPayment } = paymentSlice.actions;
export default paymentSlice.reducer;
