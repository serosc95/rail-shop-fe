import React from 'react';

interface Props {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  maxLength?: number;
  error?: string;
  name?: string;
  autoComplete?: string;
}

export const TextInput: React.FC<Props> = ({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  maxLength,
  error,
  name,
  autoComplete,
}) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
    <label htmlFor={name} style={{ fontWeight: 'bold' }}>{label}</label>
    <input
      id={name}
      name={name}
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      maxLength={maxLength}
      autoComplete={autoComplete}
      inputMode={type === 'tel' ? 'numeric' : undefined}
      aria-invalid={!!error}
      style={{
        padding: 8,
        borderRadius: 4,
        border: `1px solid ${error ? 'red' : '#ccc'}`
      }}
    />
    {error && <span style={{ color: 'red', fontSize: 12 }}>{error}</span>}
  </div>
);
