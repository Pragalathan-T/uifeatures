import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
return (
<footer style={{
position: 'fixed',
bottom: 0,
left: 0,
right: 0,
background: '#111827',
color: 'white',
padding: '12px 16px',
display: 'flex',
justifyContent: 'space-between',
alignItems: 'center',
zIndex: 100
}}>
<div style={{ fontWeight: 600 }}>Online Exam Portal</div>
<nav style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
<Link to="/about" style={{ color: 'white', textDecoration: 'none' }}>About Us</Link>
<a href="mailto:support@onlineexam.example" style={{ color: 'white', textDecoration: 'none' }}>support@onlineexam.example</a>
</nav>
</footer>
);
}