import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

export default function Sidebar({ role = (localStorage.getItem('role') || 'STUDENT') }) {
return (
<aside className="sidebar">
<div className="sidebar__title">Menu</div>
<ul className="sidebar__list">
{role === 'ADMIN' && (
<>
<li><Link to="/admin/dashboard">Dashboard</Link></li>
<li><Link to="/admin/users">Manage Users</Link></li>
<li><Link to="/admin/exam-management">Exam Management</Link></li>
<li><Link to="/admin/questions">Questions</Link></li>
</>
)}
{role === 'TEACHER' && (
<>
<li><Link to="/teacher/dashboard">Dashboard</Link></li>
<li><Link to="/create-exam">Create Exam</Link></li>
<li><Link to="/admin/exam-management">Manage Exams</Link></li>
</>
)}
{role === 'STUDENT' && (
<>
<li><Link to="/student-exams">Available Exams</Link></li>
<li><Link to="/history">My Attempts</Link></li>
</>
)}
</ul>
</aside>
);
}