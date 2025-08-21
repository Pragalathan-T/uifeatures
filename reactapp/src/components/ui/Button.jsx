import React from 'react';

export default function Button({ children, variant = 'primary', className = '', ...props }) {
  const base = 'inline-flex items-center rounded-full px-4 py-2 transition';
  const variants = {
    primary: 'bg-[#2563eb] text-white hover:bg-[#1e40af]',
    outline: 'border text-gray-900 hover:bg-gray-50',
    ghost: 'text-gray-900 hover:bg-gray-50',
  };
  return (
    <button className={`${base} ${variants[variant] || ''} ${className}`} {...props}>
      {children}
    </button>
  );
}