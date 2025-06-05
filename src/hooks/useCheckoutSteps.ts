import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../store';
import {
  goToNextStep,
  resetSteps,
  setSelectedProductId,
} from '../store/checkoutSlice';

export const useCheckoutSteps = () => {
  const dispatch: AppDispatch = useDispatch();
  const currentStep = useSelector((state: RootState) => state.checkout.currentStep);
  const selectedProductId = useSelector((state: RootState) => state.checkout.selectedProductId);

  return {
    currentStep,
    selectedProductId,
    goToNextStep: () => dispatch(goToNextStep()),
    resetSteps: () => dispatch(resetSteps()),
    setSelectedProductId: (id: string | null) => dispatch(setSelectedProductId(id)),
  };
};
