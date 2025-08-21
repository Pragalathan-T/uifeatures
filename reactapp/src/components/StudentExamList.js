import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import api from '../utils/api';
import useDebouncedValue from '../hooks/useDebouncedValue';
import Skeleton from './ui/Skeleton.jsx';
import Input from './ui/Input.jsx';
import Button from './ui/Button.jsx';
import Card from './ui/Card.jsx';

export default function StudentExamList() {
  const [exams, setExams] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const [q, setQ] = useState(searchParams.get('q') || '');
  const [difficulty, setDifficulty] = useState(searchParams.get('difficulty') || '');
  const [status, setStatus] = useState(searchParams.get('status') || '');
  const [sortBy, setSortBy] = useState(searchParams.get('sortBy') || 'title');
  const [sortDir, setSortDir] = useState(searchParams.get('sortDir') || 'asc');
  const [page, setPage] = useState(Number(searchParams.get('page') || 0));
  const pageSize = 10;

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    api.getAvailableExams()
      .then(res => { setExams(res.data); })
      .catch(() => { setError('Failed to load exams.'); })
      .finally(() => setLoading(false));
  }, []);

  // Persist controls to URL
  const debouncedQ = useDebouncedValue(q, 300);
  useEffect(() => {
    const next = new URLSearchParams();
    if (debouncedQ) next.set('q', debouncedQ);
    if (difficulty) next.set('difficulty', difficulty);
    if (status) next.set('status', status);
    if (sortBy) next.set('sortBy', sortBy);
    if (sortDir) next.set('sortDir', sortDir);
    if (page) next.set('page', String(page));
    setSearchParams(next, { replace: true });
  }, [debouncedQ, difficulty, status, sortBy, sortDir, page, setSearchParams]);

  const processed = useMemo(() => {
    let list = exams || [];
    if (q) {
      const l = q.toLowerCase();
      list = list.filter(e =>
        (e.title || '').toLowerCase().includes(l) ||
        (e.description || '').toLowerCase().includes(l) ||
        (e.topic || '').toLowerCase().includes(l)
      );
    }
    if (difficulty) list = list.filter(e => (e.difficulty || '').toLowerCase() === difficulty.toLowerCase());
    if (status) {
      const now = new Date();
      list = list.filter(e => {
        const exp = e.expiryDate ? new Date(e.expiryDate) : null;
        if (status === 'active') return e.isActive === true;
        if (status === 'upcoming') return e.isActive === true && exp && exp > now;
        if (status === 'expired') return exp && exp < now;
        return true;
      });
    }
    list = [...list].sort((a, b) => {
      const dir = sortDir === 'desc' ? -1 : 1;
      if (sortBy === 'title') return ((a.title || '').localeCompare(b.title || '')) * dir;
      if (sortBy === 'duration') return ((a.duration || 0) - (b.duration || 0)) * dir;
      if (sortBy === 'difficulty') return ((a.difficulty || '').localeCompare(b.difficulty || '')) * dir;
      return 0;
    });
    return list;
  }, [exams, q, difficulty, status, sortBy, sortDir]);

  const paged = useMemo(() => {
    const start = page * pageSize;
    return processed.slice(start, start + pageSize);
  }, [processed, page]);

  const handleStart = async (examId, examObj) => {
    try {
      setError(null);
      const studentUsername = localStorage.getItem('username') || 'student1';
      const start = await api.startExam(examId, studentUsername);
      const questionsRes = await api.getQuestionsByExam(examId);
      const studentExamId =
        (start && start.data && (start.data.studentExamId ?? start.data.id)) || start?.data;
      navigate(`/exam/${studentExamId}`, {
        state: { questions: questionsRes.data || [], studentExamId, exam: { duration: examObj?.duration } }
      });
    } catch (e) {
      setError((e && e.message) || 'Failed to start exam.');
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-white p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        <Skeleton lines={1} className="mb-4" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, idx) => (
            <Card key={idx} className="p-4">
              <Skeleton lines={3} />
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
  if (error) return <div>{error}</div>;

  return (
    <div className="min-h-screen bg-white p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Available Exams</h1>

        <div className="controls grid grid-cols-1 md:grid-cols-5 gap-3 mb-4">
          <Input placeholder="Search exams" value={q} onChange={(e) => { setPage(0); setQ(e.target.value); }} />
          <select
            className="input rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
            value={difficulty}
            onChange={(e) => { setPage(0); setDifficulty(e.target.value); }}
          >
            <option value="">All difficulties</option>
            <option value="EASY">EASY</option>
            <option value="MEDIUM">MEDIUM</option>
            <option value="HARD">HARD</option>
          </select>
          <select
            className="input rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
            value={status}
            onChange={(e) => { setPage(0); setStatus(e.target.value); }}
          >
            <option value="">All statuses</option>
            <option value="active">Active</option>
            <option value="upcoming">Upcoming</option>
            <option value="expired">Expired</option>
          </select>
          <select
            className="input rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
            value={sortBy}
            onChange={(e) => { setPage(0); setSortBy(e.target.value); }}
          >
            <option value="title">Sort: Title</option>
            <option value="duration">Sort: Duration</option>
            <option value="difficulty">Sort: Difficulty</option>
          </select>
          <Button variant="outline" onClick={() => setSortDir(d => d === 'asc' ? 'desc' : 'asc')}>Dir: {sortDir.toUpperCase()}</Button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {paged.map((exam) => (
            <Card key={exam.examId} className="p-4 hover:shadow-md transition">
              <div className="text-lg font-semibold text-gray-900">{exam.title}</div>
              <div className="text-sm text-gray-600">{exam.description}</div>
              <div className="text-sm">Duration: {exam.duration} min</div>
              <div className="mt-3">
                <Button onClick={() => handleStart(exam.examId, exam)}>Start Exam</Button>
              </div>
            </Card>
          ))}
        </div>

        <div className="pager mt-6 flex items-center gap-3">
          <Button variant="outline" disabled={page === 0} onClick={() => setPage(p => p - 1)}>Prev</Button>
          <span>Page {page + 1}</span>
          <Button variant="outline" disabled={(page + 1) * pageSize >= processed.length} onClick={() => setPage(p => p + 1)}>Next</Button>
        </div>
      </div>
    </div>
  );
}