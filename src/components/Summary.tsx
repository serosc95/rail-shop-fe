import React, { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';
import { formatCurrency } from '../utils/format';
import { Button } from './common/Button';

interface SummaryProps {
  onPay: () => Promise<void> | void;
}

export const Summary: React.FC<SummaryProps> = ({ onPay }) => {
  const cardData = useSelector((state: RootState) => state.payment.cardData);
  const products = useSelector((state: RootState) => state.products.items);

  // Memorizar producto seleccionado para evitar búsquedas repetidas
  const product = useMemo(() => {
    if (!cardData?.productId) return null;
    return products.find((p) => p.id === cardData.productId) || null;
  }, [cardData?.productId, products]);
  const [loading, setLoading] = useState(false);

  const handlePayClick = async () => {
    setLoading(true);
    await onPay();
  };

  if (!product || !cardData) {
    return (
      <p role="alert" style={{ color: 'red', textAlign: 'center' }}>
        No se pudo cargar la información del producto o tarjeta. Por favor, verifica tus datos.
      </p>
    );
  }

  return (
    <section className="summary-container" aria-live="polite">
      <h2>Resumen de pago</h2>
      <p><strong>Producto:</strong> {product.name}</p>
      <p><strong>Precio:</strong> {formatCurrency((product.price * cardData.cantidad), 'CLP', 'es-CL')}</p>
      <p><strong>Tarjeta:</strong> **** **** **** {cardData.cardNumber.slice(-4)}</p>
      <Button
        onClick={handlePayClick}
        disabled={loading}
        type="button"
        className="pay-button"
        aria-busy={loading}
        aria-disabled={loading}
        style={{
          padding: '12px 20px',
          backgroundColor: loading ? '#6c757d' : '#007BFF',
          color: 'white',
          border: 'none',
          borderRadius: 6,
          fontWeight: 'bold',
          cursor: loading ? 'not-allowed' : 'pointer',
          transition: 'background-color 0.3s ease',
          width: '100%',
          maxWidth: 300,
          marginTop: 16,
        }}
      >
        {loading ? (
          <>
            <span className="spinner" aria-hidden="true" /> Procesando...
          </>
        ) : 'Pagar'}
      </Button>
    </section>
  );
};
