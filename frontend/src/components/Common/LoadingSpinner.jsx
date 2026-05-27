import React from 'react';

const LoadingSpinner = ({ size = 'md' }) => {
  const sizes = {
    sm: 'w-5 h-5 border-2',
    md: 'w-8 h-8 border-2',
    lg: 'w-12 h-12 border-3',
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className={`${sizes[size]} border-t-purple-500 border-r-transparent border-b-orange-500 border-l-transparent rounded-full animate-spin`}
      />
    </div>
  );
};

export default LoadingSpinner;
