import React, { useState } from 'react';
import api from '../utils/api';
import './AdminUsers.css';

export default function AdminUsers() {
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [lookup, setLookup] = useState('');
	const [found, setFound] = useState(null);
	const [msg, setMsg] = useState(null);
	const [err, setErr] = useState(null);

	const create = async (e) => {
		e.preventDefault(); setMsg(null); setErr(null);
		try {
			await api.createAdmin({ username, email, password });
			setMsg('Admin created');
		} catch { setErr('Create failed'); }
	};
	const getOne = async (e) => {
		e.preventDefault(); setErr(null); setMsg(null);
		try {
			const res = await api.getAdminByUsername(lookup);
			setFound(res.data);
		} catch { setErr('Lookup failed'); setFound(null); }
	};

	return (
		<div className="admin">
			<h2>Admin Users</h2>
			<div className="admin__grid">
				<form onSubmit={create} className="admin__card">
					<h3>Create Admin</h3>
					<input placeholder="Username" value={username} onChange={(e)=>setUsername(e.target.value)} />
					<input placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
					<input placeholder="Password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
					<button type="submit">Create</button>
				</form>
				<form onSubmit={getOne} className="admin__card">
					<h3>Lookup Admin</h3>
					<input placeholder="Username" value={lookup} onChange={(e)=>setLookup(e.target.value)} />
					<button type="submit">Find</button>
					{found && (
						<div className="admin__result">
							<p><b>Username:</b> {found.username}</p>
							<p><b>Email:</b> {found.email}</p>
						</div>
					)}
				</form>
			</div>
			{msg && <p className="admin__msg">{msg}</p>}
			{err && <p className="admin__err">{err}</p>}
		</div>
	);
}
