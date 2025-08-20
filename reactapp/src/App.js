import React from 'react';
import { Routes, Route, Navigate, Link } from 'react-router-dom';

import ExamCreator from './components/ExamCreator';
import ExamResults from './components/ExamResults';
import ExamInterface from './components/ExamInterface';
import StudentExamList from './components/StudentExamList';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import AttemptHistory from './components/AttemptHistory';
import AdminUsers from './components/AdminUsers';
import ExamDetails from './components/ExamDetails';
import NotFound from './components/NotFound';
import QuestionsAdmin from './components/QuestionsAdmin';
import ExamManagement from './components/ExamManagement';
import LandingPage from './components/LandingPage';
import About from './components/About';
import Contact from './components/Contact';
import Help from './components/Help';
import MainLayout from './layouts/MainLayout';
import RoleGuard from './routes/RoleGuard';
import Sidebar from './components/Sidebar';
import AdminDashboard from './components/AdminDashboard';
import AddQuestion from './components/AddQuestion';
import StudentDashboardPage from './components/StudentDashboardPage';
import ErrorBoundary from './components/ErrorBoundary';

function TeacherHome() {
  const username = localStorage.getItem('username') || 'Teacher';
  return (
    <div style={{ display:'flex' }}>
      <Sidebar role="TEACHER" />
      <div style={{ flex:1, padding:16 }}>
        <h1>Welcome, {username} (TEACHER)</h1>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(220px, 1fr))', gap:16 }}>
          <Link className="card" to="/create-exam"><div className="card__title">Create Exam</div></Link>
          <Link className="card" to="/admin/exam-management"><div className="card__title">Manage Exams</div></Link>
          <Link className="card" to="/history"><div className="card__title">Manage Results</div></Link>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<MainLayout><About /></MainLayout>} />
        <Route path="/contact" element={<MainLayout><Contact /></MainLayout>} />
        <Route path="/help" element={<MainLayout><Help /></MainLayout>} />

        <Route path="/login" element={<MainLayout><Login /></MainLayout>} />
        <Route path="/register" element={<MainLayout><Register /></MainLayout>} />
        <Route path="/profile" element={<MainLayout><Profile /></MainLayout>} />

        <Route path="/admin/dashboard" element={
          <RoleGuard roles={["ADMIN"]}>
            <AdminDashboard />
          </RoleGuard>
        } />
        <Route path="/teacher/dashboard" element={
          <RoleGuard roles={["TEACHER"]}>
            <TeacherHome />
          </RoleGuard>
        } />
        <Route path="/student/dashboard" element={
          <RoleGuard roles={["STUDENT"]}>
            <StudentDashboardPage />
          </RoleGuard>
        } />

        <Route path="/create-exam" element={
          <RoleGuard roles={["TEACHER"]}>
            <ExamCreator />
          </RoleGuard>
        } />
        <Route path="/add-question" element={
          <RoleGuard roles={["TEACHER"]}>
            <AddQuestion />
          </RoleGuard>
        } />
        <Route path="/admin/questions" element={
          <RoleGuard roles={["ADMIN"]}>
            <QuestionsAdmin />
          </RoleGuard>
        } />
        <Route path="/admin/exam-management" element={
          <RoleGuard roles={["ADMIN", "TEACHER"]}>
            <ExamManagement />
          </RoleGuard>
        } />
        <Route path="/admin/users" element={
          <RoleGuard roles={["ADMIN"]}>
            <AdminUsers />
          </RoleGuard>
        } />

        <Route path="/student-exams" element={
          <RoleGuard roles={["STUDENT"]}>
            <StudentExamList />
          </RoleGuard>
        } />
        <Route path="/history" element={
          <RoleGuard roles={["STUDENT", "TEACHER", "ADMIN"]}>
            <AttemptHistory />
          </RoleGuard>
        } />

        <Route path="/exam-results/:studentExamId" element={
          <RoleGuard roles={["STUDENT", "TEACHER", "ADMIN"]}>
            <ExamResults />
          </RoleGuard>
        } />
        <Route path="/exam/:studentExamId" element={
          <RoleGuard roles={["STUDENT"]}>
            <ExamInterface />
          </RoleGuard>
        } />
        <Route path="/exam-details" element={<ExamDetails />} />

        <Route path="/teacher-dashboard" element={<Navigate to="/teacher/dashboard" replace />} />

        <Route path="*" element={<MainLayout><NotFound /></MainLayout>} />
      </Routes>
    </ErrorBoundary>
  );
}
export default App;