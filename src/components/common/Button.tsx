import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'danger';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  ...props
}) => {
  const baseStyle =
    'w-full py-2 px-4 rounded-lg font-semibold text-white text-center text-sm';
  const variants: Record<string, string> = {
    primary: 'bg-blue-600 hover:bg-blue-700',
    secondary: 'bg-gray-600 hover:bg-gray-700',
    success: 'bg-green-600 hover:bg-green-700',
    danger: 'bg-red-600 hover:bg-red-700',
  };

  const disabledStyle = 'opacity-60 cursor-not-allowed';

  return (
    <button
      className={`${baseStyle} ${variants[variant]} ${
        props.disabled ? disabledStyle : ''
      }`}
      {...props}
    >
      {children}
    </button>
  );
};
