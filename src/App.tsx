import React from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { store } from './store';
import type { AppDispatch, RootState } from './store';

import { ProductPage } from './components/ProductPage';
import { PaymentForm } from './components/PaymentForm';
import { Summary } from './components/Summary';
import { Result } from './components/Result';

import { createTransaction, resetStatus } from './store/transactionSlice';
import { setCardData } from './store/paymentSlice';

import { isCardDataComplete } from './utils/validators';
import { useCheckoutSteps } from './hooks/useCheckoutSteps';

const AppContent = () => {
  const {
    currentStep,
    goToNextStep,
    resetSteps,
    selectedProductId,
    setSelectedProductId,
  } = useCheckoutSteps();

  const dispatch = useDispatch<AppDispatch>();
  const { status, error } = useSelector((state: RootState) => state.transaction);
  const { cardData } = useSelector((state: RootState) => state.payment);

  const handleSelectProduct = (productId: string) => {
    if (cardData && isCardDataComplete(cardData)) {
      dispatch(setCardData({ ...cardData, productId }));
    }
    setSelectedProductId(productId);
    goToNextStep();
  };

  const handlePayment = () => {
    if (!selectedProductId || !cardData) {
      console.error('Datos incompletos');
      return;
    }

    dispatch(createTransaction({
      productId: selectedProductId,
      cardData,
    }));
  };

  React.useEffect(() => {
    if (status === 'success' || status === 'failed') {
      goToNextStep();
    }
  }, [status]);

  const handleRestart = () => {
    resetSteps();
    dispatch(resetStatus());
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <ProductPage onSelectProduct={handleSelectProduct} />;
      case 2:
        return <PaymentForm onNext={goToNextStep} />;
      case 3:
        return <Summary onPay={handlePayment} />;
      case 4:
        return (
          <Result
            loading={status === 'loading'}
            success={status === 'success'}
            message={error}
            onRestart={handleRestart}
          />
        );
      default:
        return null;
    }
  };

  return <>{renderStep()}</>;
};

const App = () => (
  <Provider store={store}>
    <AppContent />
  </Provider>
);

export default App;
