import React from 'react';

const Card = ({ children, className = '', hoverEffect = false, ...props }) => {
  return (
    <div
      className={`glass-card p-4 sm:p-6 ${
        hoverEffect ? 'hover:border-purple-500/30 hover:shadow-purple-500/5 hover:-translate-y-1 transition-all duration-300' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
