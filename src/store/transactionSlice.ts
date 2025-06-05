import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface TransactionPayload {
  productId: string;
  cantidad: number;
  cuotas: number;
  customerEmail: string;
  cardData: {
    cardNumber: string;
    cvc: string;
    expMonth: string;
    expYear: string;
    cardHolder: string;
  };
}

interface TransactionResponse {
  message: string;
}

interface TransactionState {
  status: 'idle' | 'loading' | 'success' | 'failed';
  error: string | null;
  successMessage: string | null;
}

const initialState: TransactionState = {
  status: 'idle',
  error: null,
  successMessage: null,
};

export const createTransaction = createAsyncThunk<
  TransactionResponse,
  TransactionPayload,
  {
    rejectValue: string;
  }
>('transaction/create', async (payload, { rejectWithValue }) => {
  try {
    const response = await fetch('http://localhost:3000/api/payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      return rejectWithValue(data.message || 'Error procesando el pago');
    }

    return data;
  } catch (error) {
    return rejectWithValue('Error de red o servidor al procesar el pago');
  }
});

const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    resetStatus(state) {
      state.status = 'idle';
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTransaction.pending, (state) => {
        state.status = 'loading';
        state.error = null;
        state.successMessage = null;
      })
      .addCase(createTransaction.fulfilled, (state, action: PayloadAction<TransactionResponse>) => {
        state.status = 'success';
        state.successMessage = action.payload.message;
        state.error = null;
      })
      .addCase(createTransaction.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message || 'Error desconocido';
        state.successMessage = null;
      });
  },
});

export const { resetStatus } = transactionSlice.actions;
export default transactionSlice.reducer;
