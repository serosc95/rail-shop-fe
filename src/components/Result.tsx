import React from 'react';

interface Props {
  success: boolean;
  message: string | null;
  onRestart: () => void;
}

export const Result: React.FC<Props> = ({ success, message, onRestart }) => {
  return (
    <div style={{ padding: 16, maxWidth: 400, margin: 'auto', textAlign: 'center' }}>
      {success ? (
        <h2>Pago realizado con éxito 🎉</h2>
      ) : (
        <>
          <h2>Error en el pago ❌</h2>
          <p>{message}</p>
        </>
      )}
      <button
        onClick={onRestart}
        style={{ marginTop: 20, padding: 10, backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: 5 }}
      >
        Volver al inicio
      </button>
    </div>
  );
};
