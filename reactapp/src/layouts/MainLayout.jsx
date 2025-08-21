import React from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import ChatWidget from '../components/ChatWidget';
import { useAuth } from '../context/AuthContext';

export default function MainLayout({ children }) {
  const { role } = useAuth();
  const isAdmin = role === 'ADMIN';
  const isTeacher = role === 'TEACHER';
  const isStudent = role === 'STUDENT';

  const gradient = isAdmin
    ? 'linear-gradient(180deg,#fef3c7,transparent), radial-gradient(1200px circle at 90% -20%, #fde68a 0%, transparent 30%), radial-gradient(900px circle at 10% -10%, #fef9c3 0%, transparent 25%)'
    : isTeacher
    ? 'linear-gradient(180deg,#e0f2fe,transparent), radial-gradient(1200px circle at 90% -20%, #bae6fd 0%, transparent 30%), radial-gradient(900px circle at 10% -10%, #e0f2fe 0%, transparent 25%)'
    : 'linear-gradient(180deg,#ecfccb,transparent), radial-gradient(1200px circle at 90% -20%, #bbf7d0 0%, transparent 30%), radial-gradient(900px circle at 10% -10%, #dcfce7 0%, transparent 25%)';

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: gradient, backgroundAttachment: 'fixed' }}>
      <div style={{ position:'fixed', inset:0, pointerEvents:'none', opacity:0.2 }} aria-hidden>
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="bgx" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#fff" />
              <stop offset="100%" stopColor="#fff" />
            </linearGradient>
          </defs>
          <circle cx="8%" cy="12%" r="120" fill="url(#bgx)" />
          <rect x="75%" y="6%" width="220" height="120" rx="22" fill="url(#bgx)" />
          <path d="M10 88 Q 40 60 100 80 T 220 78" stroke="#fff" strokeWidth="2" fill="none"/>
        </svg>
      </div>
      <NavBar />
      <main style={{ flex: 1, width: '100%', maxWidth: 1200, margin: '0 auto', padding: 16 }}>
        {children}
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
}