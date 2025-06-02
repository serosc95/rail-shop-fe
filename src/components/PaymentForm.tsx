import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCardData, setDeliveryData } from '../store/paymentSlice';

interface Props {
  onNext: () => void;
}

export const PaymentForm: React.FC<Props> = ({ onNext }) => {
  const dispatch = useDispatch();

  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');

  const handleSubmit = () => {
    if (cardNumber.length < 13 || cardNumber.length > 19) return alert('Número de tarjeta inválido');
    if (!expiry.match(/^(0[1-9]|1[0-2])\/\d{2}$/)) return alert('Fecha inválida, formato MM/AA');
    if (cvv.length < 3 || cvv.length > 4) return alert('CVV inválido');
    if (!name) return alert('Ingrese el nombre del titular');
    if (!address) return alert('Ingrese la dirección de entrega');

    dispatch(setCardData({ cardNumber, expiry, cvv, name }));
    dispatch(setDeliveryData({ address }));
    onNext();
  };

  return (
    <div style={{ padding: 16, maxWidth: 400, margin: 'auto', display: 'flex', flexDirection: 'column', gap: 12 }}>
      <input
        type="text"
        placeholder="Número de tarjeta"
        value={cardNumber}
        onChange={(e) => setCardNumber(e.target.value)}
        maxLength={19}
      />
      <input
        type="text"
        placeholder="MM/AA"
        value={expiry}
        onChange={(e) => setExpiry(e.target.value)}
        maxLength={5}
      />
      <input
        type="text"
        placeholder="CVV"
        value={cvv}
        onChange={(e) => setCvv(e.target.value)}
        maxLength={4}
      />
      <input
        type="text"
        placeholder="Nombre en la tarjeta"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Dirección de entrega"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <button onClick={handleSubmit} style={{ padding: 10, backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: 5 }}>
        Siguiente
      </button>
    </div>
  );
};
