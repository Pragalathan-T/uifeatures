import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';

export default function StudentDashboardPage() {
const username = localStorage.getItem('username') || 'Student';
return (
<div style={{ display: 'flex' }} className="min-h-screen bg-white">
<Sidebar role="STUDENT" />
<div style={{ flex: 1, padding: 16 }} className="p-4 md:p-6">
<h1 className="text-2xl font-bold text-gray-900 mb-4">Welcome, {username} (STUDENT)</h1>

<div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
<Link className="card bg-white rounded-xl shadow-sm ring-1 ring-gray-200 p-4 hover:shadow-md transition" to="/student-exams"><div className="font-semibold">Exam List</div></Link>
<Link className="card bg-white rounded-xl shadow-sm ring-1 ring-gray-200 p-4 hover:shadow-md transition" to="/history"><div className="font-semibold">Attempt History</div></Link>
<Link className="card bg-white rounded-xl shadow-sm ring-1 ring-gray-200 p-4 hover:shadow-md transition" to="/history"><div className="font-semibold">Results</div></Link>
</div>

<div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
{[1,2,3].map(i => (
<div key={i} className="bg-white rounded-xl shadow-sm ring-1 ring-gray-200 p-4 hover:shadow-md transition">
<div className="text-xl">� Exam {i}</div>
<div className="text-sm text-gray-600">Topic • Difficulty • Time</div>
<button className="mt-3 inline-flex items-center rounded-full bg-[#2563eb] text-white px-4 py-2 hover:bg-[#1e40af] transition">Start Exam</button>
</div>
))}
</div>

<div className="mt-8">
<h2 className="text-lg font-semibold text-gray-900">Recent Results</h2>
<div className="mt-3 space-y-3">
{[70, 85, 60].map((p, idx) => (
<div key={idx}>
<div className="flex justify-between text-sm text-gray-600"><span>Exam {idx+1}</span><span>{p}%</span></div>
<div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
<div className="bg-[#2563eb] h-2" style={{ width: `${p}%` }} />
</div>
</div>
))}
</div>
</div>

</div>
</div>
);
}