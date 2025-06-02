import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface TransactionPayload {
  productId: string;
  cardData: {
    cardNumber: string;
    expiry: string;
    cvv: string;
    name: string;
  };
  deliveryAddress: string;
}

interface TransactionState {
  status: 'idle' | 'loading' | 'success' | 'failed';
  error: string | null;
}

export const createTransaction = createAsyncThunk(
  'transaction/create',
  async (payload: TransactionPayload, thunkAPI) => {
    const response = await fetch('/api/payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    if (!response.ok) {
      return thunkAPI.rejectWithValue(data.message || 'Error procesando el pago');
    }
    return data;
  }
);

const initialState: TransactionState = {
  status: 'idle',
  error: null,
};

const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    resetStatus(state) {
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTransaction.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(createTransaction.fulfilled, (state) => {
        state.status = 'success';
        state.error = null;
      })
      .addCase(createTransaction.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string || action.error.message || 'Error desconocido';
      });
  },
});

export const { resetStatus } = transactionSlice.actions;
export default transactionSlice.reducer;
