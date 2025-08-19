import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import './ExamManagement.css';

export default function ExamManagement({ username = 'teacher1' }) {
const [page, setPage] = useState(0);
const [size] = useState(10);
const [exams, setExams] = useState([]);
const [msg, setMsg] = useState(null);
const [err, setErr] = useState(null);

const load = async () => {
try {
const res = await api.mgmtGetExamsByTeacher(username, { page, size });
setExams(res.data || []);
} catch {
setErr('Failed to load');
}
};
useEffect(() => { load(); }, [username, page, size]);

const toggle = async (examId, isActive) => {
try {
await api.mgmtUpdateExamStatus(examId, { isActive });
setMsg('Status updated');
load();
} catch { setErr('Update failed'); }
};

return (
<div className="xm min-h-screen bg-[#f7f8fa] p-4 md:p-6">
<h2 className="text-2xl font-bold text-gray-900 mb-4">Exam Management</h2>
{err && <p className="xm__err text-red-600">{err}</p>}
{msg && <p className="xm__msg text-green-700">{msg}</p>}
<ul className="xm__list grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
{exams.map((e, i) => (
<li key={i} className="bg-white rounded-xl shadow-sm ring-1 ring-gray-200 p-4 hover:shadow-md transition">
<div className="text-lg font-semibold text-gray-900">{e.title}</div>
<div className="text-sm text-gray-600">{e.description}</div>
<div className="mt-1 text-sm">Duration: {e.duration}</div>
<div className="mt-1 text-sm">Active: {String(e.isActive)}</div>
<button
className="mt-3 inline-flex items-center rounded-full bg-[#2563eb] text-white px-4 py-2 hover:bg-[#1e40af] transition"
onClick={() => toggle(e.examId, !e.isActive)}
>
{e.isActive ? 'Deactivate' : 'Activate'}
</button>
</li>
))}
</ul>
<div className="xm__pager mt-4 flex items-center gap-3">
<button className="rounded-full px-4 py-2 border" disabled={page===0} onClick={() => setPage(p=>p-1)}>Prev</button>
<span>Page {page+1}</span>
<button className="rounded-full px-4 py-2 border" onClick={() => setPage(p=>p+1)}>Next</button>
</div>
</div>
);
}