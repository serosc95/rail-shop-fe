import React from 'react';
import { Button } from './common/Button';


interface Props {
  loading: boolean,
  success: boolean;
  message: string | null;
  onRestart: () => void;
}

export const Result: React.FC<Props> = ({ loading, success, message, onRestart }) => {
  if (loading) {
    return <div>Procesando transacción...</div>;
  }
  
  return (
    <div style={{ padding: 16, maxWidth: 400, margin: 'auto', textAlign: 'center' }}>
      {success ? (
        <h2>Pago realizado con éxito</h2>
      ) : (
        <>
          <h2>Error en el pago</h2>
          <p>{message}</p>
        </>
      )}
      <Button
        onClick={onRestart}
        style={{ marginTop: 20, padding: 10, backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: 5 }}
      >
        Volver al inicio
      </Button>
    </div>
  );
};
