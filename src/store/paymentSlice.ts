import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface CardInfo {
  cardNumber: string;
  cvc: string;
  expMonth: string;
  expYear: string;
  cardHolder: string;
}

export interface ContactInfo {
  email: string;
}

export interface CardData extends CardInfo, ContactInfo {
  productId: string;
  cantidad: number; 
  cuotas: number;
}

export interface PaymentState {
  cardData: CardData | null;
  status: 'idle' | 'loading' | 'success' | 'error';
  error: string | null;
  lastUpdated: number | null;
}

const initialState: PaymentState = {
  cardData: null,
  status: 'idle',
  error: null,
  lastUpdated: null,
};

const isCardDataComplete = (data: CardData): boolean => {
  return Object.values(data).every((value) =>
    typeof value === 'string' ? value.trim() !== '' : value > 0
  );
};


const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    setCardData(state, action: PayloadAction<CardData>) {
      const data = action.payload;

      if (!isCardDataComplete(data)) {
        state.error = 'Todos los campos de la tarjeta y datos son obligatorios.';
        state.status = 'error';
        return;
      }

      state.cardData = data;
      state.status = 'idle';
      state.error = null;
      state.lastUpdated = Date.now();
    },
    updateCantidadYCuotas(state, action: PayloadAction<{ cantidad: number; cuotas: number }>) {
      if (state.cardData) {
        state.cardData.cantidad = action.payload.cantidad;
        state.cardData.cuotas = action.payload.cuotas;
        state.lastUpdated = Date.now();
      }
    },
    resetPayment(state) {
      state.cardData = null;
      state.status = 'idle';
      state.error = null;
      state.lastUpdated = null;
    },
    setStatus(state, action: PayloadAction<PaymentState['status']>) {
      state.status = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
      if (action.payload) {
        state.status = 'error';
      }
    },
  },
});


export const {
  setCardData,
  updateCantidadYCuotas,
  resetPayment,
  setStatus,
  setError,
} = paymentSlice.actions;

export default paymentSlice.reducer;
