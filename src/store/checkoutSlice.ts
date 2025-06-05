import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface CheckoutState {
  currentStep: number;
  selectedProductId: string | null;
}

const initialState: CheckoutState = {
  currentStep: 1,
  selectedProductId: null,
};

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    goToNextStep(state) {
      state.currentStep += 1;
    },
    resetSteps(state) {
      state.currentStep = 1;
      state.selectedProductId = null;
    },
    setSelectedProductId(state, action: PayloadAction<string | null>) {
      state.selectedProductId = action.payload;
    },
  },
});

export const {
  goToNextStep,
  resetSteps,
  setSelectedProductId,
} = checkoutSlice.actions;

export default checkoutSlice.reducer;
