import { useState } from 'react';

export const useCheckoutSteps = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  const goToNextStep = () => setCurrentStep(prev => prev + 1);
  const resetSteps = () => {
    setCurrentStep(1);
    setSelectedProductId(null);
  };

  return {
    currentStep,
    goToNextStep,
    resetSteps,
    selectedProductId,
    setSelectedProductId,
  };
};
