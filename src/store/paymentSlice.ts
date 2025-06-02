import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';


interface CardData {
  productId?: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
  name: string;
}

interface DeliveryData {
  address: string;
}

interface PaymentState {
  cardData: CardData | null;
  deliveryData: DeliveryData | null;
}

const initialState: PaymentState = {
  cardData: null,
  deliveryData: null,
};

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    setCardData(state, action: PayloadAction<CardData>) {
      state.cardData = action.payload;
    },
    setDeliveryData(state, action: PayloadAction<DeliveryData>) {
      state.deliveryData = action.payload;
    },
    resetPayment(state) {
      state.cardData = null;
      state.deliveryData = null;
    },
  },
});

export const { setCardData, setDeliveryData, resetPayment } = paymentSlice.actions;
export default paymentSlice.reducer;
