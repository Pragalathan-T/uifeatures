import React from 'react';

export default function Input(props) {
  return <input className={`input rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb] ${props.className || ''}`} {...props} />;
}