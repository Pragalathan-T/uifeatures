import React from 'react';

export default function Card({ children, className = '' }) {
  return <div className={`bg-white rounded-xl shadow-sm ring-1 ring-gray-200 ${className}`}>{children}</div>;
}