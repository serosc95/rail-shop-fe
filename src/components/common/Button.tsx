import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'danger';
  loading?: boolean;
  icon?: React.ReactNode;
}

const variantClasses: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary: 'bg-blue-600 hover:bg-blue-700',
  secondary: 'bg-gray-600 hover:bg-gray-700',
  success: 'bg-green-600 hover:bg-green-700',
  danger: 'bg-red-600 hover:bg-red-700',
};

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  loading = false,
  icon,
  disabled,
  ...props
}) => {
  const baseStyle =
    'w-full py-2 px-4 rounded-lg font-semibold text-white text-center text-sm flex items-center justify-center gap-2';
  const disabledStyle = 'opacity-60 cursor-not-allowed';

  return (
    <button
      type={props.type || 'button'}
      aria-disabled={disabled || loading}
      disabled={disabled || loading}
      className={`${baseStyle} ${variantClasses[variant]} ${
        disabled || loading ? disabledStyle : ''
      }`}
      {...props}
    >
      {loading && <span className="loader" />}
      {!loading && icon}
      {children}
    </button>
  );
};
