import React from 'react';
import { Link } from 'react-router-dom';
import logoUrl from '../assets/logo.svg';

export default function Brand({ to = '/', label = 'Online Exam Portal', imgSize = 28 }) {
  return (
    <Link to={to} style={{ display: 'inline-flex', alignItems: 'center', gap: 10, color: 'inherit', textDecoration: 'none' }}>
      <img src={logoUrl} alt="" width={imgSize} height={imgSize} style={{ display: 'block' }} />
      <span style={{ fontWeight: 700 }}>{label}</span>
    </Link>
  );
}