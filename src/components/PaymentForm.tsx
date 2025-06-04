import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCardData } from '../store/paymentSlice';
import { TextInput } from './common/TextInput';

interface Props {
  onNext: () => void;
}

export const PaymentForm: React.FC<Props> = ({ onNext }) => {
  const dispatch = useDispatch();

  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [name, setName] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [cuotas, setCuotas] = useState('');
  const [email, setEmail] = useState('');

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (cardNumber.length < 13 || cardNumber.length > 19)
      newErrors.cardNumber = 'El número de tarjeta debe tener entre 13 y 19 dígitos';

    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry))
      newErrors.expiry = 'Formato inválido. Usa MM/AA';

    if (cvv.length < 3 || cvv.length > 4)
      newErrors.cvv = 'CVV debe tener 3 o 4 dígitos';

    if (!name.trim())
      newErrors.name = 'Nombre requerido';

    if (!cantidad || Number(cantidad) <= 0)
      newErrors.cantidad = 'Ingrese una cantidad válida';

    if (!cuotas || !Number.isInteger(Number(cuotas)) || Number(cuotas) <= 0)
      newErrors.cuotas = 'Ingrese un número entero mayor que 0';

    if (!validateEmail(email))
      newErrors.email = 'Correo electrónico inválido';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    dispatch(
      setCardData({ cardNumber, expiry, cvv, name, cantidad: Number(cantidad), cuotas: Number(cuotas), email })
    );
    onNext();
  };

  return (
    <div style={{
      padding: 16,
      maxWidth: 400,
      margin: 'auto',
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }}>
      <h2 style={{ textAlign: 'center' }}>Información de pago</h2>

      <TextInput
        label="Número de tarjeta"
        value={cardNumber}
        onChange={setCardNumber}
        placeholder="Ej: 1234 5678 9012 3456"
        type="tel"
        maxLength={19}
        error={errors.cardNumber}
        name="cardNumber"
        autoComplete="cc-number"
      />

      <TextInput
        label="Fecha de expiración"
        value={expiry}
        onChange={setExpiry}
        placeholder="MM/AA"
        type="text"
        maxLength={5}
        error={errors.expiry}
        name="expiry"
        autoComplete="cc-exp"
      />

      <TextInput
        label="CVV"
        value={cvv}
        onChange={setCvv}
        placeholder="Ej: 123"
        type="tel"
        maxLength={4}
        error={errors.cvv}
        name="cvv"
        autoComplete="cc-csc"
      />

      <TextInput
        label="Nombre en la tarjeta"
        value={name}
        onChange={setName}
        placeholder="Nombre completo"
        error={errors.name}
        name="name"
        autoComplete="cc-name"
      />

      <TextInput
        label="Cantidad"
        value={cantidad}
        onChange={setCantidad}
        placeholder="Monto total"
        type="number"
        error={errors.cantidad}
        name="cantidad"
      />

      <TextInput
        label="Cuotas"
        value={cuotas}
        onChange={setCuotas}
        placeholder="Número de cuotas"
        type="number"
        error={errors.cuotas}
        name="cuotas"
      />

      <TextInput
        label="Correo electrónico"
        value={email}
        onChange={setEmail}
        placeholder="email@ejemplo.com"
        type="email"
        error={errors.email}
        name="email"
        autoComplete="email"
      />

      <button
        onClick={handleSubmit}
        style={{
          padding: 10,
          backgroundColor: '#007BFF',
          color: 'white',
          border: 'none',
          borderRadius: 6,
          fontWeight: 'bold',
          cursor: 'pointer'
        }}
      >
        Siguiente
      </button>
    </div>
  );
};
