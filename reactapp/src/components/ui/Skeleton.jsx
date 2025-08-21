import React from 'react';

export default function Skeleton({ className = '', lines = 1 }) {
  return (
    <div className={className}>
      {Array.from({ length: lines }).map((_, idx) => (
        <div key={idx} className="animate-pulse bg-gray-200 rounded h-4 mb-2 last:mb-0" />
      ))}
    </div>
  );
}