import type { CardData } from '../store/paymentSlice';

interface CardFormData {
  cardNumber: string;
  expiry: string;
  cvv: string;
  name: string;
  cantidad: string;
  cuotas: string;
  email: string;
}

interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export const validateEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const validateCardForm = (data: CardFormData): ValidationResult => {
  const errors: Record<string, string> = {};

  if (data.cardNumber.length < 13 || data.cardNumber.length > 19) {
    errors.cardNumber = 'El número debe tener entre 13 y 19 dígitos';
  }

  if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(data.expiry)) {
    errors.expiry = 'Formato inválido. Usa MM/AA';
  }

  if (data.cvv.length < 3 || data.cvv.length > 4) {
    errors.cvv = 'CVV debe tener 3 o 4 dígitos';
  }

  if (!data.name.trim()) {
    errors.name = 'Nombre requerido';
  }

  if (!data.cantidad || isNaN(Number(data.cantidad)) || Number(data.cantidad) <= 0) {
    errors.cantidad = 'Cantidad no válida';
  }

  if (
    !data.cuotas ||
    isNaN(Number(data.cuotas)) ||
    !Number.isInteger(Number(data.cuotas)) ||
    Number(data.cuotas) <= 0
  ) {
    errors.cuotas = 'Ingrese cuotas válidas';
  }

  if (!validateEmail(data.email)) {
    errors.email = 'Correo inválido';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export const isCardDataComplete = (cardData: any): boolean => {
  return (
    !!cardData?.cardNumber &&
    !!cardData?.cvc &&
    !!cardData?.expMonth &&
    !!cardData?.expYear &&
    !!cardData?.cardHolder &&
    !!cardData?.email
  );
};
