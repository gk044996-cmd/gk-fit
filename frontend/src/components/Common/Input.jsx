import React, { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';

const Input = ({
  label,
  type = 'text',
  error,
  id,
  className = '',
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className={`flex flex-col gap-1.5 w-full ${className}`}>
      {label && (
        <label htmlFor={id} className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
          {label}
        </label>
      )}
      <div className="relative flex items-center w-full">
        <input
          id={id}
          type={inputType}
          className={`glass-input w-full ${isPassword ? 'pr-10' : ''} ${error ? 'border-red-500/50 focus:border-red-500/50 focus:ring-red-500/30' : ''}`}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3.5 text-gray-400 hover:text-white transition-colors focus:outline-none"
          >
            {showPassword ? <FiEyeOff className="text-lg" /> : <FiEye className="text-lg" />}
          </button>
        )}
      </div>
      {error && (
        <span className="text-xs text-red-400 font-medium pl-1">{error}</span>
      )}
    </div>
  );
};

export default Input;
