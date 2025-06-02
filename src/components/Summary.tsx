import React from 'react';
import { useSelector } from 'react-redux';
import  type{ RootState } from '../store';

interface Props {
  onPay: () => void;
}

export const Summary: React.FC<Props> = ({ onPay }) => {
  const product = useSelector((state: RootState) => {
    const id = state.payment.cardData?.productId;
    return state.products.items.find(p => p.id === id);
  });

  const cardData = useSelector((state: RootState) => state.payment.cardData);
  const delivery = useSelector((state: RootState) => state.payment.deliveryData);

  if (!product || !cardData || !delivery) return <p>Error con los datos.</p>;

  return (
    <div style={{ padding: 16, maxWidth: 400, margin: 'auto', display: 'flex', flexDirection: 'column', gap: 12 }}>
      <h2>Resumen de pago</h2>
      <p>Producto: {product.name}</p>
      <p>Precio: ${product.price}</p>
      <p>Dirección de entrega: {delivery.address}</p>
      <p>Tarjeta: **** **** **** {cardData.cardNumber.slice(-4)}</p>
      <button
        onClick={onPay}
        style={{ padding: 10, backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: 5 }}
      >
        Pagar
      </button>
    </div>
  );
};
