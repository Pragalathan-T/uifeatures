import React from 'react';
import { Link } from 'react-router-dom';
import Brand from './Brand';

export default function Footer() {
return (
<footer style={{
background: '#111827',
color: 'white',
padding: '12px 16px',
display: 'flex',
justifyContent: 'space-between',
alignItems: 'center',
marginTop: 24
}}>
<Brand label="Online Exam Portal" />
<nav style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
<Link to="/about" style={{ color: 'white', textDecoration: 'none' }}>About Us</Link>
<a href="mailto:support@onlineexam.example" style={{ color: 'white', textDecoration: 'none' }}>support@onlineexam.example</a>
</nav>
</footer>
);
}