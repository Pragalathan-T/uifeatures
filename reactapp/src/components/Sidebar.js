import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

export default function Sidebar({ role = (localStorage.getItem('role') || 'STUDENT') }) {
  const location = useLocation();
  const item = (to, label) => (
    <li>
      <Link to={to} className={`block rounded-lg px-3 py-2 hover:bg-gray-100 ${location.pathname === to ? 'bg-gray-100 font-semibold' : ''}`}>{label}</Link>
    </li>
  );
  return (
    <aside className="sidebar bg-white/80 backdrop-blur border-r border-gray-200 min-h-screen w-56 p-3">
      <div className="sidebar__title text-sm uppercase tracking-wide text-gray-600 mb-2">Menu</div>
      <ul className="sidebar__list space-y-1">
        {role === 'ADMIN' && (
          <>
            {item('/admin/dashboard', '📊 Dashboard')}
            {item('/admin/users', '👥 Manage Users')}
            {item('/admin/exam-management', '🧩 Exam Management')}
            {item('/admin/questions', '❓ Questions')}
          </>
        )}
        {role === 'TEACHER' && (
          <>
            {item('/teacher/dashboard', '📊 Dashboard')}
            {item('/create-exam', '➕ Create Exam')}
            {item('/admin/exam-management', '🧩 Manage Exams')}
          </>
        )}
        {role === 'STUDENT' && (
          <>
            {item('/student-exams', '📝 Available Exams')}
            {item('/history', '🕒 My Attempts')}
          </>
        )}
      </ul>
    </aside>
  );
}