import React, { useEffect } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { store } from './store';
import type { AppDispatch, RootState } from './store';

import { ProductPage } from './components/ProductPage';
import { PaymentForm } from './components/PaymentForm';
import { Summary } from './components/Summary';
import { Result } from './components/Result';

import { useCheckoutSteps } from './hooks/useCheckoutSteps';
import { createTransaction, resetStatus } from './store/transactionSlice';

const AppContent: React.FC = () => {
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
    setSelectedProductId(productId);
    goToNextStep();
  };

  const handlePayment = () => {
    console.log("cardData", cardData);
    console.log("selectedProductId", selectedProductId);
    if (!selectedProductId || !cardData) {
      console.warn('No se puede procesar el pago: datos incompletos');
      return;
    }

    const {
      cardNumber,
      cvc,
      expMonth,
      expYear,
      cardHolder,
      email,
      cantidad,
      cuotas,
    } = cardData;

    dispatch(
      createTransaction({
        productId: selectedProductId,
        cantidad,
        cuotas,
        customerEmail: email,
        cardData: {
          cardNumber,
          cvc,
          expMonth,
          expYear,
          cardHolder,
        },
      })
    );
  };

  const handleRestart = () => {
    resetSteps();
    dispatch(resetStatus());
  };

  useEffect(() => {
    if (status === 'success' || status === 'failed') {
      goToNextStep();
    }
  }, [status]);

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <ProductPage onSelectProduct={handleSelectProduct} />;
      case 2:
        return selectedProductId ? (
          <PaymentForm productId={selectedProductId} onNext={goToNextStep} />
        ) : (
          <p style={{ textAlign: 'center', color: 'red' }}>
            Error: No hay producto seleccionado.
          </p>
        );
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
        return (
          <p style={{ textAlign: 'center' }}>
            Paso inválido. Por favor, reinicia el proceso.
          </p>
        );
    }
  };

  return <main>{renderStepContent()}</main>;
};

const App: React.FC = () => (
  <Provider store={store}>
    <AppContent />
  </Provider>
);

export default App;
