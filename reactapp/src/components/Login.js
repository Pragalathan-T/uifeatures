// import React, { useState } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import './Login.css';
// import { useAuth } from '../context/AuthContext';

// export default function Login() {
// const [username, setUsername] = useState('');
// const [password, setPassword] = useState('');
// const [error, setError] = useState(null);
// const navigate = useNavigate();
// const location = useLocation();
// const { login } = useAuth();

// const onSubmit = async (e) => {
// e.preventDefault();
// setError(null);
// try {
// const { role } = await login({ username, password });
// const fromState = location.state && location.state.from;
// if (fromState) return navigate(fromState, { replace: true });
// const dest = `/${role.toLowerCase()}/dashboard`;
// navigate(dest);
// } catch (err) {
// setError('Invalid credentials');
// }
// };

// return (
// <div className="auth">
// <h2>Login</h2>
// <form onSubmit={onSubmit} className="auth__form">
// <input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
// <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
// <button type="submit">Login</button>
// </form>
// {error && <p className="auth__error">{error}</p>}
// </div>
// );
// }

import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import './Login.css';
import { useAuth } from '../context/AuthContext';

export default function Login() {
const [username, setUsername] = useState('');
const [password, setPassword] = useState('');
const [error, setError] = useState(null);
const navigate = useNavigate();
const location = useLocation();
const { login } = useAuth();

const onSubmit = async (e) => {
e.preventDefault();
setError(null);
try {
const { role } = await login({ username, password });
const fromState = location.state && location.state.from;
if (fromState) return navigate(fromState, { replace: true });
const dest = `/${role.toLowerCase()}/dashboard`;
navigate(dest);
} catch {
setError('Invalid credentials');
}
};

return (
<div className="min-h-[70vh] bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center px-4 py-10">
<div className="w-full max-w-md bg-white rounded-2xl shadow-sm ring-1 ring-gray-200 p-6">
<div className="flex items-center gap-3 mb-4">
<div className="h-10 w-10 rounded-full bg-gradient-to-br from-sky-500 to-cyan-600 text-white grid place-items-center">�</div>
<h2 className="text-xl font-bold text-gray-900 m-0">Login</h2>
</div>
<form onSubmit={onSubmit} className="grid gap-3">
<input className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
<input className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
<button type="submit" className="mt-1 inline-flex items-center rounded-full bg-sky-600 text-white px-5 py-2 hover:bg-sky-700 transition">Sign in</button>
</form>
{error && <p className="auth__error mt-3 text-rose-600">{error}</p>}
<p className="mt-4 text-sm text-gray-600">
Don&apos;t have an account?{' '}
<Link to="/register" className="text-emerald-700 hover:underline">Create one</Link>
</p>
</div>
</div>
);
}