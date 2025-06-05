import React, { useId } from 'react';

interface TextInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  maxLength?: number;
  error?: string;
  name?: string;
  autoComplete?: string;
  disabled?: boolean;
  required?: boolean;
}

export const TextInput: React.FC<TextInputProps> = ({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  maxLength,
  error,
  name,
  autoComplete,
  disabled,
  required,
}) => {
  const inputId = useId();

  return (
    <div className="w-full" style={{justifyContent: "space-between", display: "flex", alignItems: "center"}}>
      <label htmlFor={inputId} className="font-medium text-sm">
        {label}
      </label>
      <input
        id={inputId}
        name={name}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
        autoComplete={autoComplete}
        disabled={disabled}
        required={required}
        inputMode={type === 'tel' ? 'numeric' : undefined}
        aria-invalid={!!error}
        className={`px-3 py-2 rounded-md border text-sm focus:outline-none ${
          error ? 'border-red-500' : 'border-gray-300'
        } ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}`}
      />
      {error && <span className="text-red-500 text-xs">{error}</span>}
    </div>
  );
};
