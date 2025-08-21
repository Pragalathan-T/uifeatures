import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../utils/api';
import Sidebar from './Sidebar';
import useDebouncedValue from '../hooks/useDebouncedValue';
import Skeleton from './ui/Skeleton.jsx';
import Input from './ui/Input.jsx';
import Button from './ui/Button.jsx';

export default function TeacherDashboard({ teacherUsername }) {
const [exams, setExams] = useState([]);
const [error, setError] = useState(null);
const [loading, setLoading] = useState(false);
const [searchParams, setSearchParams] = useSearchParams();
const [q, setQ] = useState(searchParams.get('q') || '');
const [status, setStatus] = useState(searchParams.get('status') || '');
const [page, setPage] = useState(Number(searchParams.get('page') || 0));
const [size] = useState(10);
const [sortBy, setSortBy] = useState(searchParams.get('sortBy') || 'createdAt');
const [sortDir, setSortDir] = useState(searchParams.get('sortDir') || 'desc');

useEffect(() => {
if (!teacherUsername) return;
setLoading(true);
api
.getExamsByTeacher(teacherUsername, { page, size, sortBy, sortDir, status: status || undefined })
.then((res) => {
setExams(res.data || []);
setError(null);
})
.catch(() => {
setError('Unexpected error');
})
.finally(() => setLoading(false));
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [teacherUsername, page, size, sortBy, sortDir, status]);

const debouncedQ = useDebouncedValue(q, 300);
useEffect(() => {
  const next = new URLSearchParams();
  if (debouncedQ) next.set('q', debouncedQ);
  if (status) next.set('status', status);
  if (sortBy) next.set('sortBy', sortBy);
  if (sortDir) next.set('sortDir', sortDir);
  if (page) next.set('page', String(page));
  setSearchParams(next, { replace: true });
}, [debouncedQ, status, sortBy, sortDir, page, setSearchParams]);

const filtered = useMemo(() => {
if (!q) return exams;
const lower = q.toLowerCase();
return (exams || []).filter(
(e) =>
(e.title || '').toLowerCase().includes(lower) ||
(e.description || '').toLowerCase().includes(lower) ||
(e.topic || '').toLowerCase().includes(lower)
);
}, [exams, q]);

const toggleActive = async (examId, isActive) => {
try {
const updatedExam = await api.updateExamStatus(examId, { isActive: !isActive });
setExams((prev) =>
prev.map((exam) => (exam.examId === examId ? { ...exam, isActive: updatedExam.data.isActive } : exam))
);
} catch {
setError('Unexpected error');
}
};

if (loading) return (
  <div className="p-4">
    <Skeleton lines={1} className="mb-4" />
    <div className="space-y-2">
      <Skeleton lines={1} />
      <Skeleton lines={1} />
      <Skeleton lines={1} />
    </div>
  </div>
);
if (error) {
return <div className="p-4 text-red-600">{error}</div>;
}

return (
<div style={{ display: 'flex' }} className="min-h-screen bg-[#f7f8fa]">
<Sidebar role={localStorage.getItem('role') || 'TEACHER'} />
<div style={{ flex: 1, padding: 16 }} className="p-4 md:p-6">
<h1 className="text-2xl font-bold text-gray-900 mb-4">Teacher Dashboard</h1>

<div className="controls gap-3 flex flex-wrap mb-4">
<Input
placeholder="Search title/description/topic"
value={q}
onChange={(e) => setQ(e.target.value)}
/>
<select
className="input rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
value={status}
onChange={(e) => {
setPage(0);
setStatus(e.target.value);
}}
>
<option value="">All</option>
<option value="active">Active</option>
<option value="inactive">Inactive</option>
<option value="upcoming">Upcoming</option>
<option value="expired">Expired</option>
</select>
<select
className="input rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
value={sortBy}
onChange={(e) => {
setPage(0);
setSortBy(e.target.value);
}}
>
<option value="createdAt">Sort: Created</option>
<option value="title">Sort: Title</option>
<option value="duration">Sort: Duration</option>
</select>
<Button variant="outline" onClick={() => setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))}>Dir: {sortDir.toUpperCase()}</Button>
</div>

<div className="card bg-white rounded-xl shadow-sm ring-1 ring-gray-200">
<ul className="divide-y divide-gray-200">
{filtered.map((exam) => (
<li
key={exam.examId}
style={{ padding: 8, borderBottom: '1px solid var(--border)' }}
className="py-4"
>
<h3 style={{ margin: '4px 0' }} className="text-lg font-semibold text-gray-900">
{exam.title}
</h3>
<p style={{ margin: '4px 0', color: 'var(--muted)' }} className="text-sm text-gray-600">
{exam.description}
</p>
<p style={{ margin: '4px 0' }} className="text-sm">Duration: {exam.duration} minutes</p>
<p style={{ margin: '4px 0' }} className="text-sm">
Status: <span className={`pill ${exam.isActive ? 'pill-success' : ''}`}>{exam.isActive ? 'Active' : 'Inactive'}</span>
</p>
<button
className="button inline-flex items-center rounded-full bg-[#2563eb] text-white px-4 py-2 hover:bg-[#1e40af] transition"
onClick={() => toggleActive(exam.examId, exam.isActive)}
>
{exam.isActive ? 'Deactivate' : 'Activate'}
</button>
</li>
))}
</ul>
</div>

<div className="pager mt-4 flex items-center gap-3">
<button
className="button rounded-full px-4 py-2 disabled:opacity-50"
disabled={page === 0}
onClick={() => setPage((p) => p - 1)}
>
Prev
</button>
<span>Page {page + 1}</span>
<button className="button rounded-full px-4 py-2" onClick={() => setPage((p) => p + 1)}>
Next
</button>
</div>
</div>
</div>
);
}