import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.svg';

export default function Brand({ to = '/', label = 'Online Exam' }) {
  return (
    <Link to={to} className="inline-flex items-center gap-2 no-underline">
      <img src={logo} alt="" width={28} height={28} className="block" />
      <span className="font-semibold text-gray-900">{label}</span>
    </Link>
  );
}

