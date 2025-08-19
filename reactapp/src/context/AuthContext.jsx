import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import api from '../utils/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
const [token, setToken] = useState(() => localStorage.getItem('token') || null);
const [role, setRole] = useState(() => localStorage.getItem('role') || null);
const [username, setUsername] = useState(() => localStorage.getItem('username') || null);

useEffect(() => {
if (token) localStorage.setItem('token', token); else localStorage.removeItem('token');
}, [token]);

useEffect(() => {
if (role) localStorage.setItem('role', role); else localStorage.removeItem('role');
}, [role]);

useEffect(() => {
if (username) localStorage.setItem('username', username); else localStorage.removeItem('username');
}, [username]);

const login = useCallback(async ({ username: user, password }) => {
const res = await api.login({ username: user, password });
const data = res?.data || {};
const nextToken = data.token || 'dummy-token';
const nextRole = (data.role || 'STUDENT').toUpperCase();
const nextUsername = data.username || user;
setToken(nextToken);
setRole(nextRole);
setUsername(nextUsername);
return { token: nextToken, role: nextRole, username: nextUsername };
}, []);

const logout = useCallback(async () => {
try { await api.logout(); } catch {}
setToken(null);
setRole(null);
setUsername(null);
}, []);

const value = useMemo(() => ({
token,
role,
username,
isAuthenticated: Boolean(token && role && username),
login,
logout,
}), [token, role, username, login, logout]);

return (
<AuthContext.Provider value={value}>
{children}
</AuthContext.Provider>
);
}

export function useAuth() {
const ctx = useContext(AuthContext);
if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
return ctx;
}