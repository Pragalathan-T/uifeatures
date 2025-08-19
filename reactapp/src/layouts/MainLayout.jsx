import React from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

export default function MainLayout({ children }) {
return (
<div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
<NavBar />
<main style={{ flex: 1, width: '100%', maxWidth: 1200, margin: '0 auto', padding: 16 }}>
{children}
</main>
<Footer />
</div>
);
}