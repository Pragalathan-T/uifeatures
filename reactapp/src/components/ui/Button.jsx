import React from 'react';

export default function Button({ children, variant = 'primary', className = '', leftIcon = null, rightIcon = null, ...props }) {
  const base = 'inline-flex items-center rounded-full px-4 py-2 transition';
  const variants = {
    primary: 'bg-[#2563eb] text-white hover:bg-[#1e40af]',
    outline: 'border text-gray-900 hover:bg-gray-50',
    ghost: 'text-gray-900 hover:bg-gray-50',
  };
  return (
    <button className={`${base} ${variants[variant] || ''} ${className}`} {...props}>
      {leftIcon && <span className="mr-2" aria-hidden>{leftIcon}</span>}
      <span>{children}</span>
      {rightIcon && <span className="ml-2" aria-hidden>{rightIcon}</span>}
    </button>
  );
}