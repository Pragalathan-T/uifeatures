import React from 'react';

export default function Input({ leftIcon = null, className = '', ...props }) {
  if (!leftIcon) {
    return <input className={`input rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb] ${className}`} {...props} />;
  }
  return (
    <div className={`relative flex items-center ${className}`}>
      <span className="absolute left-3 text-gray-400 pointer-events-none" aria-hidden>
        {leftIcon}
      </span>
      <input
        className="input rounded-lg pl-9 focus:outline-none focus:ring-2 focus:ring-[#2563eb] w-full"
        {...props}
      />
    </div>
  );
}