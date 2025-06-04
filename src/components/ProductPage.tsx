import * as React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../store/productsSlice';
import type { AppDispatch, RootState } from '../store';

interface Props {
  onSelectProduct: (productId: string) => void;
}

export const ProductPage: React.FC<Props> = ({ onSelectProduct }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  function formatNumber(numero: Number) {
    const numberString = numero.toString();
    const parteEntera = numberString.slice(0, -2);
    const parteDecimal = numberString.slice(-2);
    const formateado = parteEntera.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    return formateado + "." + parteDecimal;
  }


  if (loading) return <p>Cargando productos...</p>;

  return (
    <div
      style={{
        padding: 16,
        textAlign: "center",
      }}
    >
      <h1>PRODUCTOS</h1>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 16,
          justifyContent: 'center',
        }}
      >
        {items.map(product => (
          <div
            key={product.id}
            style={{
              border: '1px solid #ddd',
              borderRadius: 8,
              padding: 12,
              minWidth: 250,
              maxWidth: 250,
              flex: '1 1 300px',
              boxSizing: 'border-box',
            }}
          >
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>Precio: ${formatNumber(product.price)}</p>
            <p>Stock: {product.stock}</p>
            <button
              onClick={() => onSelectProduct(product.id)}
              disabled={product.stock === 0}
              style={{
                padding: 10,
                backgroundColor: product.stock === 0 ? '#ccc' : '#007BFF',
                color: 'white',
                border: 'none',
                borderRadius: 5,
                marginTop: 8,
                cursor: product.stock === 0 ? 'not-allowed' : 'pointer',
              }}
            >
              {product.stock === 0 ? 'Agotado' : 'Pagar con tarjeta de crédito'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
