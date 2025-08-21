import React, { useEffect, useState, useMemo } from 'react';
import api from '../utils/api';
import './QuestionsAdmin.css';
import Skeleton from './ui/Skeleton.jsx';
import useDebouncedValue from '../hooks/useDebouncedValue';
import Input from './ui/Input.jsx';
import Button from './ui/Button.jsx';

export default function QuestionsAdmin() {
    const [page, setPage] = useState(0);
    const [size] = useState(10);
    const [sortBy] = useState('id');
    const [sortDir] = useState('asc');
    const [data, setData] = useState({ content: [], totalPages: 0 });
    const [form, setForm] = useState({
    questionText: '',
    optionA: '',
    optionB: '',
    optionC: '',
    optionD: '',
    correctOption: 'A',
    marks: 1,
    examId: '',
    });
    const [msg, setMsg] = useState(null);
    const [err, setErr] = useState(null);
    const [loading, setLoading] = useState(false);
    // client-side filters
    const [q, setQ] = useState('');
    const [topic, setTopic] = useState('');
    const [difficulty, setDifficulty] = useState('');

    const load = async () => {
        setLoading(true);
        try {
            const res = await api.listQuestions({ page, size, sortBy, sortDir });
            setData(res.data);
        } catch {
            setErr('Failed to load questions');
        } finally { setLoading(false); }
    };

    useEffect(() => { load(); }, [page, size, sortBy, sortDir]);

    const submit = async (e) => {
        e.preventDefault(); setMsg(null); setErr(null);
        try {
            await api.addQuestionDirect(form);
            setMsg('Question added');
            setForm({ questionText: '', optionA: '', optionB: '', optionC: '', optionD: '', correctOption: 'A', marks: 1, examId: '' });
            load();
        } catch { setErr('Add failed'); }
    };

    const remove = async (id) => {
        try { await api.deleteQuestion(id); load(); } catch { setErr('Delete failed'); }
        };

        const debouncedQ = useDebouncedValue(q, 300);
        const processed = useMemo(() => {
        let rows = (data.content || []);
        if (debouncedQ) {
        const l = debouncedQ.toLowerCase();
        rows = rows.filter(x => (x.questionText||'').toLowerCase().includes(l));
        }
        if (topic) rows = rows.filter(x => (x.topic||'').toLowerCase() === topic.toLowerCase());
        if (difficulty) rows = rows.filter(x => (x.difficulty||'').toLowerCase() === difficulty.toLowerCase());
        return rows;
        }, [data, debouncedQ, topic, difficulty]);

        return (
        <div className="qa">
        <h2>Questions</h2>
        {err && <p className="qa__err" aria-live="polite">{err}</p>}
        {msg && <p className="qa__msg" aria-live="polite">{msg}</p>}

        <div style={{ display:'flex', gap:12, marginBottom:12, flexWrap:'wrap' }}>
        <Input leftIcon={<span>🔎</span>} placeholder="Search text" value={q} onChange={(e)=>{ setQ(e.target.value); setPage(0); }} />
        <Input leftIcon={<span>🏷️</span>} placeholder="Filter topic" value={topic} onChange={(e)=>{ setTopic(e.target.value); setPage(0); }} />
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" aria-hidden>🎯</span>
          <select className="pl-9 input rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb]" value={difficulty} onChange={(e)=>{ setDifficulty(e.target.value); setPage(0); }}>
            <option value="">All difficulties</option>
            <option value="EASY">EASY</option>
            <option value="MEDIUM">MEDIUM</option>
            <option value="HARD">HARD</option>
          </select>
        </div>
        </div>

        {loading ? (
          <div style={{ padding: 12 }}>
            <Skeleton lines={1} className="mb-2" />
            <Skeleton lines={1} className="mb-2" />
            <Skeleton lines={1} />
          </div>
        ) : (
        <table className="qa__table">
        <thead><tr><th>ID</th><th>Text</th><th>Marks</th><th>Actions</th></tr></thead>
        <tbody>
        {processed.map(qr => {
        const rowId = qr.questionId ?? qr.id;
        return (
        <tr key={rowId}>
        <td>{rowId}</td>
        <td>{qr.questionText}</td>
        <td>{qr.marks}</td>
        <td><Button variant="outline" leftIcon={<span>🗑️</span>} onClick={() => remove(rowId)}>Delete</Button></td>
        </tr>
        );
        })}
        </tbody>
        </table>
        )}

        <h3>Add New Question</h3>
        <form className="qa__form" onSubmit={submit}>
        <Input leftIcon={<span>📝</span>} placeholder="Question text" value={form.questionText} onChange={e=>setForm({...form, questionText:e.target.value})} />
        <Input leftIcon={<span>A</span>} placeholder="Option A" value={form.optionA} onChange={e=>setForm({...form, optionA:e.target.value})} />
        <Input leftIcon={<span>B</span>} placeholder="Option B" value={form.optionB} onChange={e=>setForm({...form, optionB:e.target.value})} />
        <Input leftIcon={<span>C</span>} placeholder="Option C" value={form.optionC} onChange={e=>setForm({...form, optionC:e.target.value})} />
        <Input leftIcon={<span>D</span>} placeholder="Option D" value={form.optionD} onChange={e=>setForm({...form, optionD:e.target.value})} />
        <select value={form.correctOption} onChange={e=>setForm({...form, correctOption:e.target.value})}>
        <option>A</option><option>B</option><option>C</option><option>D</option>
        </select>
        <Input type="number" leftIcon={<span>🏅</span>} placeholder="Marks" value={form.marks} onChange={e=>setForm({...form, marks:Number(e.target.value)})} />
        <Input leftIcon={<span>🆔</span>} placeholder="Exam ID (optional)" value={form.examId} onChange={e=>setForm({...form, examId:e.target.value})} />
        <Button type="submit" leftIcon={<span>➕</span>}>Add</Button>
        </form>
        </div>
        );
        }