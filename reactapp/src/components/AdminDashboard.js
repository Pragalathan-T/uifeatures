import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';

export default function AdminDashboard() {
const username = localStorage.getItem('username') || 'Admin';

return (
<div style={{ display: 'flex' }}>
<Sidebar role="ADMIN" />
<div style={{ flex: 1, padding: 16 }}>
<h1>Welcome, {username} (ADMIN)</h1>

<div
style={{
display: 'grid',
gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
gap: 16,
}}
>
<Link className="card" to="/admin/exam-management">
<div className="card__title">Manage Exams</div>
</Link>
<Link className="card" to="/admin/users">
<div className="card__title">Manage Users</div>
</Link>
<Link className="card" to="/admin/questions">
<div className="card__title">Manage Questions</div>
</Link>
<Link className="card" to="/history">
<div className="card__title">View Results</div>
</Link>
</div>
</div>
</div>
);
}