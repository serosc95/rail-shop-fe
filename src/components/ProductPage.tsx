import * as React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../store/productsSlice';
import type { RootState } from '../store';

interface Props {
  onSelectProduct: (productId: string) => void;
}

export const ProductPage: React.FC<Props> = ({ onSelectProduct }) => {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) return <p>Cargando productos...</p>;

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', padding: 16, maxWidth: 400, margin: 'auto',
    }}>
      {items.map(product => (
        <div key={product.id} style={{
          border: '1px solid #ddd', borderRadius: 8, padding: 12, marginBottom: 12, display: 'flex', flexDirection: 'column',
        }}>
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p>Precio: ${product.price}</p>
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
            }}
          >
            {product.stock === 0 ? 'Agotado' : 'Pagar con tarjeta de crédito'}
          </button>
        </div>
      ))}
    </div>
  );
};
