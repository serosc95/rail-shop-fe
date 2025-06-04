import type { CardData } from '../store/paymentSlice';

export const isCardDataComplete = (cardData: CardData) => {
  return (
    !!cardData.cardNumber &&
    !!cardData.expiry &&
    !!cardData.cvv &&
    !!cardData.name
  );
};
