import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import './NavBar.css';
import { useAuth } from '../context/AuthContext';

export default function NavBar() {
  const navigate = useNavigate();
  const { isAuthenticated, username, logout } = useAuth();

  const handleLogout = async () => {
    try { await api.logout(); } catch {}
    await logout();
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-gray-200">
      <div className="max-w-7xl mx-auto h-16 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded bg-gradient-to-br from-emerald-500 to-teal-600 text-white grid place-items-center font-bold">OE</div>
          <Link to="/" className="font-semibold text-gray-900 no-underline">Online Exam</Link>
        </div>
        <ul className="nav__links flex items-center gap-5 text-sm">
          <li><Link className="text-gray-700 hover:text-indigo-600" to="/">🏠 Home</Link></li>
          <li><Link className="text-gray-700 hover:text-rose-600" to="/about">ℹ️ About</Link></li>
          <li><Link className="text-gray-700 hover:text-amber-600" to="/contact">✉️ Contact</Link></li>
          <li><Link className="text-gray-700 hover:text-sky-600" to="/help">❓ Help</Link></li>
          {!isAuthenticated ? (
            <>
              <li><Link className="inline-flex items-center rounded-full border border-gray-300 px-3 py-1.5 text-gray-700 hover:bg-gray-50" to="/login">🔐 Login</Link></li>
              <li><Link className="inline-flex items-center rounded-full bg-emerald-600 text-white px-3 py-1.5 hover:bg-emerald-700" to="/register">📝 Register</Link></li>
            </>
          ) : (
            <>
              <li><Link className="text-gray-700 hover:text-indigo-600" to="/profile">👤 {username || 'Profile'}</Link></li>
              <li><button className="inline-flex items-center rounded-full bg-rose-500 text-white px-3 py-1.5 hover:bg-rose-600" onClick={handleLogout}>🚪 Logout</button></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}