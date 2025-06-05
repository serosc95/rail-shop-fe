import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../store/productsSlice';
import type { AppDispatch, RootState } from '../store';
import { formatCurrency } from '../utils/format';
import { Button } from './common/Button';

interface Props {
  onSelectProduct: (productId: string) => void;
}

export const ProductPage: React.FC<Props> = ({ onSelectProduct }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { items: products, loading } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products.length]);

  return (
    <div style={{ padding: 24 }}>
      <h1 style={{ textAlign: 'center', marginBottom: 24 }}>Productos disponibles</h1>

      {loading ? (
        <p style={{ textAlign: 'center' }}>Cargando productos...</p>
      ) : products.length === 0 ? (
        <p style={{ textAlign: 'center' }}>No hay productos disponibles por el momento.</p>
      ) : (
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 20,
            justifyContent: 'center',
          }}
        >
          {products.map((product) => {
            const isOutOfStock = product.stock === 0;

            return (
              <div
                key={product.id}
                style={{
                  border: '1px solid #eee',
                  borderRadius: 10,
                  padding: 16,
                  width: 260,
                  boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <h2 style={{ fontSize: 18, marginBottom: 4 }}>{product.name}</h2>
                <p style={{ margin: '4px 0', color: '#666' }}>{product.description}</p>
                <p style={{ fontWeight: 'bold', margin: '4px 0' }}>
                  Precio: {formatCurrency(product.price)}
                </p>
                <p style={{ fontSize: 14, margin: '4px 0' }}>Stock: {product.stock}</p>
                <Button
                  onClick={() => onSelectProduct(product.id)}
                  disabled={isOutOfStock}
                  style={{
                    marginTop: 12,
                    width: '100%',
                    padding: 10,
                    border: 'none',
                    borderRadius: 6,
                    backgroundColor: isOutOfStock ? '#ccc' : '#2563eb',
                    color: '#fff',
                    cursor: isOutOfStock ? 'not-allowed' : 'pointer',
                    fontWeight: 600,
                  }}
                >
                  {isOutOfStock ? 'Agotado' : 'Pagar con tarjeta'}
                </Button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
