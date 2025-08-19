// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import api from '../utils/api';
// import './Register.css';
// import { useAuth } from '../context/AuthContext';

// export default function Register() {
// const [form, setForm] = useState({ name: '', email: '', username: '', password: '', role: 'STUDENT' });
// const [msg, setMsg] = useState(null);
// const [err, setErr] = useState(null);
// const [busy, setBusy] = useState(false);
// const navigate = useNavigate();
// const { login } = useAuth();

// const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

// const onSubmit = async (e) => {
// e.preventDefault();
// if (busy) return;
// setBusy(true);
// setErr(null); setMsg(null);
// try {
// await api.register(form);
// const { role } = await login({ username: form.username, password: form.password });
// setMsg('Registered successfully');
// navigate(`/${role.toLowerCase()}/dashboard`, { replace: true });
// } catch (e2) {
// setErr(e2?.message || 'Registration failed');
// } finally {
// setBusy(false);
// }
// };

// return (
// <div className="auth">
// <h2>Register</h2>
// <form onSubmit={onSubmit} className="auth__form">
// <input name="name" placeholder="Name" value={form.name} onChange={onChange} />
// <input name="email" placeholder="Email" value={form.email} onChange={onChange} />
// <input name="username" placeholder="Username" value={form.username} onChange={onChange} />
// <input name="password" placeholder="Password" type="password" value={form.password} onChange={onChange} />
// <select name="role" value={form.role} onChange={onChange}>
// <option>STUDENT</option>
// <option>TEACHER</option>
// <option>ADMIN</option>
// </select>
// <button type="submit" disabled={busy}>{busy ? 'Registering…' : 'Register'}</button>
// </form>
// {msg && <p className="auth__success">{msg}</p>}
// {err && <p className="auth__error">{err}</p>}
// </div>
// );
// }

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../utils/api';
import './Register.css';
import { useAuth } from '../context/AuthContext';

export default function Register() {
const [form, setForm] = useState({ name: '', email: '', username: '', password: '', role: 'STUDENT' });
const [msg, setMsg] = useState(null);
const [err, setErr] = useState(null);
const [busy, setBusy] = useState(false);
const navigate = useNavigate();
const { login } = useAuth();

const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

const onSubmit = async (e) => {
e.preventDefault();
if (busy) return;
setBusy(true);
setErr(null); setMsg(null);
try {
await api.register(form);
const { role } = await login({ username: form.username, password: form.password });
setMsg('Registered successfully');
navigate(`/${role.toLowerCase()}/dashboard`, { replace: true });
} catch (e2) {
setErr(e2?.message || 'Registration failed');
} finally {
setBusy(false);
}
};

return (
<div className="min-h-[70vh] bg-gradient-to-br from-purple-50 to-fuchsia-100 flex items-center justify-center px-4 py-10">
<div className="w-full max-w-md bg-white rounded-2xl shadow-sm ring-1 ring-gray-200 p-6">
<div className="flex items-center gap-3 mb-4">
<div className="h-10 w-10 rounded-full bg-gradient-to-br from-fuchsia-500 to-purple-600 text-white grid place-items-center">📝</div>
<h2 className="text-xl font-bold text-gray-900 m-0">Register</h2>
</div>
<form onSubmit={onSubmit} className="grid gap-3">
<input name="name" className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="Name" value={form.name} onChange={onChange} />
<input name="email" className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="Email" value={form.email} onChange={onChange} />
<input name="username" className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="Username" value={form.username} onChange={onChange} />
<input name="password" className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="Password" type="password" value={form.password} onChange={onChange} />
<select name="role" className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500" value={form.role} onChange={onChange}>
<option>STUDENT</option>
<option>TEACHER</option>
<option>ADMIN</option>
</select>
<button type="submit" disabled={busy} className="mt-1 inline-flex items-center rounded-full bg-purple-600 text-white px-5 py-2 hover:bg-purple-700 transition disabled:opacity-50">
{busy ? 'Registering…' : 'Create account'}
</button>
</form>
{msg && <p className="auth__success mt-3 text-emerald-700">{msg}</p>}
{err && <p className="auth__error mt-3 text-rose-600">{err}</p>}
<p className="mt-4 text-sm text-gray-600">
Already have an account?{' '}
<Link to="/login" className="text-sky-700 hover:underline">Sign in</Link>
</p>
</div>
</div>
);
}