import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function RoleGuard({ roles, children }) {
const location = useLocation();
const { isAuthenticated, role } = useAuth();

if (!isAuthenticated) {
return <Navigate to="/login" state={{ from: location.pathname }} replace />;
}
if (roles && Array.isArray(roles) && !roles.includes(role)) {
return <Navigate to="/login" replace />;
}
return children;
}