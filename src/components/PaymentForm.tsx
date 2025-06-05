import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCardData } from '../store/paymentSlice';
import { TextInput } from './common/TextInput';
import { validateCardForm } from '../utils/validators';
import { Button } from './common/Button';
import type { AppDispatch } from '../store';

interface Props {
  onNext: () => void;
  productId: string | null;
}

export const PaymentForm: React.FC<Props> = ({ onNext, productId }) => {
  const dispatch = useDispatch<AppDispatch>();

  const [form, setForm] = useState({
    cardNumber: '',
    expiry: '',
    cvv: '',
    name: '',
    cantidad: '',
    cuotas: '',
    email: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    const validation = validateCardForm(form);

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    if (!productId) {
      console.error('ID de producto no disponible');
      return;
    }

    setErrors({});
    dispatch(
      setCardData({
        cardNumber: form.cardNumber,
        cvc: form.cvv,
        expMonth: form.expiry.split('/')[0],
        expYear: form.expiry.split('/')[1],
        cardHolder: form.name,
        email: form.email,
        productId,
        cantidad: Number(form.cantidad) || 0,
        cuotas: Number(form.cuotas) || 0,
      })
    );
    

    onNext();
  };

  return (
    <div
      style={{
        padding: 16,
        maxWidth: 400,
        margin: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
      }}
    >
      <h2 style={{ textAlign: 'center' }}>Información de pago</h2>

      <TextInput
        label="Número de tarjeta"
        value={form.cardNumber}
        onChange={(val) => handleChange('cardNumber', val)}
        placeholder="Ej: 1234 5678 9012 3456"
        type="tel"
        maxLength={19}
        error={errors.cardNumber}
        name="cardNumber"
        autoComplete="cc-number"
      />

      <TextInput
        label="Fecha de expiración"
        value={form.expiry}
        onChange={(val) => handleChange('expiry', val)}
        placeholder="MM/AA"
        type="text"
        maxLength={5}
        error={errors.expiry}
        name="expiry"
        autoComplete="cc-exp"
      />

      <TextInput
        label="CVC"
        value={form.cvv}
        onChange={(val) => handleChange('cvv', val)}
        placeholder="Ej: 123"
        type="tel"
        maxLength={4}
        error={errors.cvv}
        name="cvv"
        autoComplete="cc-csc"
      />

      <TextInput
        label="Nombre en la tarjeta"
        value={form.name}
        onChange={(val) => handleChange('name', val)}
        placeholder="Nombre completo"
        error={errors.name}
        name="name"
        autoComplete="cc-name"
      />

      <TextInput
        label="Cantidad"
        value={form.cantidad}
        onChange={(val) => handleChange('cantidad', val)}
        placeholder="Monto total"
        type="number"
        error={errors.cantidad}
        name="cantidad"
      />

      <TextInput
        label="Cuotas"
        value={form.cuotas}
        onChange={(val) => handleChange('cuotas', val)}
        placeholder="Número de cuotas"
        type="number"
        error={errors.cuotas}
        name="cuotas"
      />

      <TextInput
        label="Correo electrónico"
        value={form.email}
        onChange={(val) => handleChange('email', val)}
        placeholder="email@ejemplo.com"
        type="email"
        error={errors.email}
        name="email"
        autoComplete="email"
      />

      <Button
        onClick={handleSubmit}
        style={{
          padding: 10,
          backgroundColor: '#007BFF',
          color: 'white',
          border: 'none',
          borderRadius: 6,
          fontWeight: 'bold',
          cursor: 'pointer',
        }}
      >
        Siguiente
      </Button>
    </div>
  );
};
