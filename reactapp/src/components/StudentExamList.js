// import React, { useEffect, useMemo, useState } from 'react';
// import api from '../utils/api';

// export default function StudentExamList() {
// const [exams, setExams] = useState([]);
// const [error, setError] = useState(null);
// const [loading, setLoading] = useState(false);

// // UI controls
// const [q, setQ] = useState('');
// const [difficulty, setDifficulty] = useState('');
// const [status, setStatus] = useState('');
// const [sortBy, setSortBy] = useState('title');
// const [sortDir, setSortDir] = useState('asc');
// const [page, setPage] = useState(0);
// const pageSize = 10;

// useEffect(() => {
// setLoading(true);
// api.getAvailableExams()
// .then(res => { setExams(res.data); })
// .catch(() => { setError('Failed to load exams.'); })
// .finally(() => setLoading(false));
// }, []);

// const processed = useMemo(() => {
// let list = exams || [];
// if (q) {
// const l = q.toLowerCase();
// list = list.filter(e => (e.title || '').toLowerCase().includes(l) || (e.description || '').toLowerCase().includes(l) || (e.topic || '').toLowerCase().includes(l));
// }
// if (difficulty) list = list.filter(e => (e.difficulty || '').toLowerCase() === difficulty.toLowerCase());
// if (status) {
// const now = new Date();
// list = list.filter(e => {
// const exp = e.expiryDate ? new Date(e.expiryDate) : null;
// if (status === 'active') return e.isActive === true;
// if (status === 'upcoming') return e.isActive === true && exp && exp > now;
// if (status === 'expired') return exp && exp < now;
// return true;
// });
// }
// list = [...list].sort((a, b) => {
// const dir = sortDir === 'desc' ? -1 : 1;
// if (sortBy === 'title') return ((a.title || '').localeCompare(b.title || '')) * dir;
// if (sortBy === 'duration') return ((a.duration || 0) - (b.duration || 0)) * dir;
// if (sortBy === 'difficulty') return ((a.difficulty || '').localeCompare(b.difficulty || '')) * dir;
// return 0;
// });
// return list;
// }, [exams, q, difficulty, status, sortBy, sortDir]);

// const paged = useMemo(() => {
// const start = page * pageSize;
// return processed.slice(start, start + pageSize);
// }, [processed, page]);

// if (loading) return <div>Loading...</div>;
// if (error) return <div>{error}</div>;

// return (
// <div className="page">
// <h1>Available Exams</h1>

// <div className="controls">
// <input className="input" placeholder="Search exams" value={q} onChange={(e) => { setPage(0); setQ(e.target.value); }} />
// <select className="input" value={difficulty} onChange={(e) => { setPage(0); setDifficulty(e.target.value); }}>
// <option value="">All difficulties</option>
// <option value="EASY">EASY</option>
// <option value="MEDIUM">MEDIUM</option>
// <option value="HARD">HARD</option>
// </select>
// <select className="input" value={status} onChange={(e) => { setPage(0); setStatus(e.target.value); }}>
// <option value="">All statuses</option>
// <option value="active">Active</option>
// <option value="upcoming">Upcoming</option>
// <option value="expired">Expired</option>
// </select>
// <select className="input" value={sortBy} onChange={(e) => { setPage(0); setSortBy(e.target.value); }}>
// <option value="title">Sort: Title</option>
// <option value="duration">Sort: Duration</option>
// <option value="difficulty">Sort: Difficulty</option>
// </select>
// <button className="button" onClick={() => setSortDir(d => d === 'asc' ? 'desc' : 'asc')}>Dir: {sortDir.toUpperCase()}</button>
// </div>

// <div className="grid">
// {paged.map((exam) => (
// <div key={exam.examId} className="card">
// <div className="card-header">{exam.title}</div>
// <div className="card-meta">{exam.description}</div>
// <div className="card-meta">Duration: {exam.duration} min</div>
// </div>
// ))}
// </div>

// <div className="pager">
// <button className="button" disabled={page === 0} onClick={() => setPage(p => p - 1)}>Prev</button>
// <span>Page {page + 1}</span>
// <button className="button" disabled={(page + 1) * pageSize >= processed.length} onClick={() => setPage(p => p + 1)}>Next</button>
// </div>
// </div>
// );
// }


import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';

export default function StudentExamList() {
const [exams, setExams] = useState([]);
const [error, setError] = useState(null);
const [loading, setLoading] = useState(false);

const [q, setQ] = useState('');
const [difficulty, setDifficulty] = useState('');
const [status, setStatus] = useState('');
const [sortBy, setSortBy] = useState('title');
const [sortDir, setSortDir] = useState('asc');
const [page, setPage] = useState(0);
const pageSize = 10;

const navigate = useNavigate();

useEffect(() => {
setLoading(true);
api.getAvailableExams()
.then(res => { setExams(res.data); })
.catch(() => { setError('Failed to load exams.'); })
.finally(() => setLoading(false));
}, []);

const processed = useMemo(() => {
let list = exams || [];
if (q) {
const l = q.toLowerCase();
list = list.filter(e =>
(e.title || '').toLowerCase().includes(l) ||
(e.description || '').toLowerCase().includes(l) ||
(e.topic || '').toLowerCase().includes(l)
);
}
if (difficulty) list = list.filter(e => (e.difficulty || '').toLowerCase() === difficulty.toLowerCase());
if (status) {
const now = new Date();
list = list.filter(e => {
const exp = e.expiryDate ? new Date(e.expiryDate) : null;
if (status === 'active') return e.isActive === true;
if (status === 'upcoming') return e.isActive === true && exp && exp > now;
if (status === 'expired') return exp && exp < now;
return true;
});
}
list = [...list].sort((a, b) => {
const dir = sortDir === 'desc' ? -1 : 1;
if (sortBy === 'title') return ((a.title || '').localeCompare(b.title || '')) * dir;
if (sortBy === 'duration') return ((a.duration || 0) - (b.duration || 0)) * dir;
if (sortBy === 'difficulty') return ((a.difficulty || '').localeCompare(b.difficulty || '')) * dir;
return 0;
});
return list;
}, [exams, q, difficulty, status, sortBy, sortDir]);

const paged = useMemo(() => {
const start = page * pageSize;
return processed.slice(start, start + pageSize);
}, [processed, page]);

const handleStart = async (examId) => {
try {
setError(null);
const studentUsername = localStorage.getItem('username') || 'student1';
const start = await api.startExam(examId, studentUsername);
const questionsRes = await api.getQuestionsByExam(examId);
const studentExamId =
(start && start.data && (start.data.studentExamId ?? start.data.id)) || start?.data;
navigate(`/exam/${studentExamId}`, {
state: { questions: questionsRes.data || [], studentExamId }
});
} catch (e) {
setError((e && e.message) || 'Failed to start exam.');
}
};

if (loading) return <div>Loading...</div>;
if (error) return <div>{error}</div>;

return (
<div className="min-h-screen bg-white p-4 md:p-6">
<div className="max-w-6xl mx-auto">
<h1 className="text-2xl font-bold text-gray-900 mb-4">Available Exams</h1>

<div className="controls grid grid-cols-1 md:grid-cols-5 gap-3 mb-4">
<input
className="input rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
placeholder="Search exams"
value={q}
onChange={(e) => { setPage(0); setQ(e.target.value); }}
/>
<select
className="input rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
value={difficulty}
onChange={(e) => { setPage(0); setDifficulty(e.target.value); }}
>
<option value="">All difficulties</option>
<option value="EASY">EASY</option>
<option value="MEDIUM">MEDIUM</option>
<option value="HARD">HARD</option>
</select>
<select
className="input rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
value={status}
onChange={(e) => { setPage(0); setStatus(e.target.value); }}
>
<option value="">All statuses</option>
<option value="active">Active</option>
<option value="upcoming">Upcoming</option>
<option value="expired">Expired</option>
</select>
<select
className="input rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
value={sortBy}
onChange={(e) => { setPage(0); setSortBy(e.target.value); }}
>
<option value="title">Sort: Title</option>
<option value="duration">Sort: Duration</option>
<option value="difficulty">Sort: Difficulty</option>
</select>
<button
className="button rounded-full px-4 py-2 bg-white hover:bg-gray-50"
onClick={() => setSortDir(d => d === 'asc' ? 'desc' : 'asc')}
>
Dir: {sortDir.toUpperCase()}
</button>
</div>

<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
{paged.map((exam) => (
<div key={exam.examId} className="card bg-white rounded-xl shadow-sm ring-1 ring-gray-200 p-4 hover:shadow-md transition">
<div className="card-header text-lg font-semibold text-gray-900">{exam.title}</div>
<div className="card-meta text-sm text-gray-600">{exam.description}</div>
<div className="card-meta text-sm">Duration: {exam.duration} min</div>
<div className="card-actions mt-3">
<button
className="button button-primary inline-flex items-center rounded-full bg-[#2563eb] text-white px-4 py-2 hover:bg-[#1e40af] transition"
onClick={() => handleStart(exam.examId)}
>
Start Exam
</button>
</div>
</div>
))}
</div>

<div className="pager mt-6 flex items-center gap-3">
<button className="button rounded-full px-4 py-2 border disabled:opacity-50" disabled={page === 0} onClick={() => setPage(p => p - 1)}>Prev</button>
<span>Page {page + 1}</span>
<button
className="button rounded-full px-4 py-2 border disabled:opacity-50"
disabled={(page + 1) * pageSize >= processed.length}
onClick={() => setPage(p => p + 1)}
>
Next
</button>
</div>
</div>
</div>
);
}