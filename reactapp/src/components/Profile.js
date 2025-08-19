import React, { useEffect, useState } from 'react';
import './Profile.css';

export default function Profile() {
	const [profile, setProfile] = useState({ username: '', role: '', name: '', email: '' });
	const [msg, setMsg] = useState(null);

	useEffect(() => {
		setProfile({
			username: localStorage.getItem('username') || '',
			role: localStorage.getItem('role') || 'STUDENT',
			name: localStorage.getItem('name') || '',
			email: localStorage.getItem('email') || '',
		});
	}, []);

	const onChange = (e) => setProfile({ ...profile, [e.target.name]: e.target.value });
	const onSave = () => {
		localStorage.setItem('name', profile.name);
		localStorage.setItem('email', profile.email);
		setMsg('Profile updated');
		setTimeout(() => setMsg(null), 1500);
	};

	return (
		<div className="profile">
			<h2>Profile</h2>
			<div className="profile__row"><label>Username</label><input name="username" value={profile.username} readOnly /></div>
			<div className="profile__row"><label>Role</label><input name="role" value={profile.role} readOnly /></div>
			<div className="profile__row"><label>Name</label><input name="name" value={profile.name} onChange={onChange} /></div>
			<div className="profile__row"><label>Email</label><input name="email" value={profile.email} onChange={onChange} /></div>
			<button onClick={onSave}>Save</button>
			{msg && <p className="profile__msg">{msg}</p>}
		</div>
	);
}
