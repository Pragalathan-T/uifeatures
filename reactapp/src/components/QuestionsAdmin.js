import React, { useEffect, useState, useMemo } from 'react';
import api from '../utils/api';
import './QuestionsAdmin.css';

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
    // client-side filters
    const [q, setQ] = useState('');
    const [topic, setTopic] = useState('');
    const [difficulty, setDifficulty] = useState('');

    const load = async () => {
        try {
            const res = await api.listQuestions({ page, size, sortBy, sortDir });
            setData(res.data);
        } catch {
            setErr('Failed to load questions');
        }
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

        const processed = useMemo(() => {
        let rows = (data.content || []);
        if (q) {
        const l = q.toLowerCase();
        rows = rows.filter(x => (x.questionText||'').toLowerCase().includes(l));
        }
        if (topic) rows = rows.filter(x => (x.topic||'').toLowerCase() === topic.toLowerCase());
        if (difficulty) rows = rows.filter(x => (x.difficulty||'').toLowerCase() === difficulty.toLowerCase());
        return rows;
        }, [data, q, topic, difficulty]);

        return (
        <div className="qa">
        <h2>Questions</h2>
        {err && <p className="qa__err">{err}</p>}
        {msg && <p className="qa__msg">{msg}</p>}

        <div style={{ display:'flex', gap:12, marginBottom:12, flexWrap:'wrap' }}>
        <input placeholder="Search text" value={q} onChange={(e)=>{ setQ(e.target.value); setPage(0); }} />
        <input placeholder="Filter topic" value={topic} onChange={(e)=>{ setTopic(e.target.value); setPage(0); }} />
        <select value={difficulty} onChange={(e)=>{ setDifficulty(e.target.value); setPage(0); }}>
        <option value="">All difficulties</option>
        <option value="EASY">EASY</option>
        <option value="MEDIUM">MEDIUM</option>
        <option value="HARD">HARD</option>
        </select>
        </div>

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
        <td><button onClick={() => remove(rowId)}>Delete</button></td>
        </tr>
        );
        })}
        </tbody>
        </table>
        <div className="qa__pager">
        <button disabled={page===0} onClick={() => setPage(p => p-1)}>Prev</button>
        <span>Page {page+1} of {data.totalPages||1}</span>
        <button disabled={page+1>=(data.totalPages||1)} onClick={() => setPage(p => p+1)}>Next</button>
        </div>

        <h3>Add New Question</h3>
        <form className="qa__form" onSubmit={submit}>
        <input placeholder="Question text" value={form.questionText} onChange={e=>setForm({...form, questionText:e.target.value})} />
        <input placeholder="Option A" value={form.optionA} onChange={e=>setForm({...form, optionA:e.target.value})} />
        <input placeholder="Option B" value={form.optionB} onChange={e=>setForm({...form, optionB:e.target.value})} />
        <input placeholder="Option C" value={form.optionC} onChange={e=>setForm({...form, optionC:e.target.value})} />
        <input placeholder="Option D" value={form.optionD} onChange={e=>setForm({...form, optionD:e.target.value})} />
        <select value={form.correctOption} onChange={e=>setForm({...form, correctOption:e.target.value})}>
        <option>A</option><option>B</option><option>C</option><option>D</option>
        </select>
        <input type="number" placeholder="Marks" value={form.marks} onChange={e=>setForm({...form, marks:Number(e.target.value)})} />
        <input placeholder="Exam ID (optional)" value={form.examId} onChange={e=>setForm({...form, examId:e.target.value})} />
        <button type="submit">Add</button>
        </form>
        </div>
        );
        }
    