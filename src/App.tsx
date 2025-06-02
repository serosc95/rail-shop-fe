// src/App.tsx
import React, { useState } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { store } from './store';
import type { RootState } from './store';
import { ProductPage } from './components/ProductPage';
import { PaymentForm } from './components/PaymentForm';
import { Summary } from './components/Summary';
import { Result } from './components/Result';
import { createTransaction, resetStatus } from './store/transactionSlice';
import { setCardData } from './store/paymentSlice';

const AppContent = () => {
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [step, setStep] = useState(1);
  const dispatch = useDispatch();
  const transactionStatus = useSelector((state: RootState) => state.transaction.status);
  const transactionError = useSelector((state: RootState) => state.transaction.error);
  const paymentState = useSelector((state: RootState) => state.payment);

  const handleSelectProduct = (productId: string) => {
    setSelectedProductId(productId);
    dispatch(setCardData({ ...paymentState.cardData, productId }));
    setStep(2);
  };

  const handlePayment = () => {
    if (!selectedProductId || !paymentState.cardData || !paymentState.deliveryData) {
      alert('Datos incompletos');
      return;
    }
    dispatch(createTransaction({
      productId: selectedProductId,
      cardData: paymentState.cardData,
      deliveryAddress: paymentState.deliveryData.address,
    }));
  };

  React.useEffect(() => {
    if (transactionStatus === 'success') setStep(4);
    if (transactionStatus === 'failed') setStep(4);
  }, [transactionStatus]);

  const handleRestart = () => {
    setStep(1);
    setSelectedProductId(null);
    dispatch(resetStatus());
  };

  return (
    <>
      {step === 1 && <ProductPage onSelectProduct={handleSelectProduct} />}
      {step === 2 && <PaymentForm onNext={() => setStep(3)} />}
      {step === 3 && <Summary onPay={handlePayment} />}
      {step === 4 && (
        <Result
          success={transactionStatus === 'success'}
          message={transactionError}
          onRestart={handleRestart}
        />
      )}
    </>
  );
};

const App = () => (
  <Provider store={store}>
    <AppContent />
  </Provider>
);

export default App;