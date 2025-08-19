import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import './AttemptHistory.css';

export default function AttemptHistory({ studentId = 1 }) {
  const [page, setPage] = useState(0);
  const [size] = useState(10);
  const [data, setData] = useState({ content: [], totalPages: 0 });
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState('startTime');
  const [sortDir, setSortDir] = useState('desc');

  useEffect(() => {
    api.getStudentExamHistory(studentId, { page, size, sortBy, sortDir })
      .then(res => setData(res.data))
      .catch(() => setError('Failed to load history'));
  }, [studentId, page, size, sortBy, sortDir]);

  if (error) return <div className="history"><p className="history__error">{error}</p></div>;

  return (
    <div className="history max-w-6xl mx-auto p-4 md:p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Attempt History</h2>
      <div className="flex gap-3 mb-3 flex-wrap">
        <select className="border rounded-lg px-3 py-2" value={sortBy} onChange={(e)=>{ setPage(0); setSortBy(e.target.value); }}>
          <option value="startTime">Sort: Started</option>
          <option value="endTime">Sort: Ended</option>
          <option value="score">Sort: Score</option>
        </select>
        <button className="rounded-full px-4 py-2 border bg-white hover:bg-gray-50" onClick={()=> setSortDir(d => d === 'asc' ? 'desc' : 'asc')}>Dir: {sortDir.toUpperCase()}</button>
      </div>
      <table className="history__table w-full border border-gray-200 rounded-xl overflow-hidden">
        <thead>
          <tr className="bg-gray-50 text-left">
            <th className="p-2">ID</th>
            <th className="p-2">Exam</th>
            <th className="p-2">Score</th>
            <th className="p-2">Status</th>
            <th className="p-2">Started</th>
            <th className="p-2">Ended</th>
          </tr>
        </thead>
        <tbody>
          {data.content.map((row) => (
            <tr key={row.studentExamId} className="odd:bg-white even:bg-gray-50">
              <td className="p-2">{row.studentExamId}</td>
              <td className="p-2">{row.exam?.title || '-'}</td>
              <td className="p-2">{row.score ?? '-'}</td>
              <td className="p-2">{row.status}</td>
              <td className="p-2">{row.startTime ?? '-'}</td>
              <td className="p-2">{row.endTime ?? '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="history__pager mt-4 flex items-center gap-3">
        <button className="rounded-full px-4 py-2 border disabled:opacity-50" onClick={() => setPage(Math.max(0, page - 1))} disabled={page === 0}>Prev</button>
        <span>Page {page + 1} of {data.totalPages}</span>
        <button className="rounded-full px-4 py-2 border disabled:opacity-50" onClick={() => setPage(Math.min(data.totalPages - 1, page + 1))} disabled={page + 1 >= data.totalPages}>Next</button>
      </div>
    </div>
  );
}