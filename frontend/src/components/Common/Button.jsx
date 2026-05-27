import React from 'react';
import LoadingSpinner from './LoadingSpinner.jsx';

const Button = ({
  children,
  type = 'button',
  variant = 'primary', // primary, outline, text, danger
  isLoading = false,
  disabled = false,
  onClick,
  className = '',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-300 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none select-none';
  
  const variants = {
    primary: 'bg-gradient-to-r from-purple-600 to-orange-500 hover:from-purple-500 hover:to-orange-400 text-white shadow-lg shadow-purple-650/10 hover:shadow-orange-500/20 hover:scale-[1.01] px-6 py-3',
    outline: 'border border-white/[0.12] hover:border-purple-500/50 hover:bg-purple-500/10 text-gray-200 hover:text-white px-6 py-3',
    text: 'text-purple-400 hover:text-purple-300 font-semibold px-4 py-2 hover:bg-purple-500/5',
    danger: 'bg-red-600 hover:bg-red-500 text-white px-6 py-3 shadow-lg shadow-red-600/10 hover:scale-[1.01]',
  };

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <LoadingSpinner size="sm" />
          <span>Processing...</span>
        </span>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
