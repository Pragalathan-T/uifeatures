import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import TeacherDashboard from '../components/TeacherDashboard';
const api = require('../utils/api');

jest.mock('../utils/api');

describe('TeacherDashboard', () => {
  beforeEach(() => jest.clearAllMocks());
  const exams = [
    { examId: 1, title: 'Java', description: 'desc', duration: 30, isActive: true, createdAt: '2024-06-11T12:05:00' },
    { examId: 2, title: 'JS', description: 'desc2', duration: 25, isActive: false, createdAt: '2024-06-12T12:00:00' },
  ];
  test('renders exams with controls', async () => {
    api.getExamsByTeacher.mockResolvedValueOnce({ data: exams });
    render(<MemoryRouter><TeacherDashboard teacherUsername="teacher1" /></MemoryRouter>);
    await screen.findByText('Java');
    expect(screen.getByText('JS')).toBeInTheDocument();
    expect(screen.getAllByText('Activate').length + screen.getAllByText('Deactivate').length).toBe(2);
  });
  test('shows error on API error', async () => {
    api.getExamsByTeacher.mockRejectedValueOnce(new Error('fail'));
    render(<MemoryRouter><TeacherDashboard teacherUsername="teacher1" /></MemoryRouter>);
    await screen.findByText(/fail|unexpected/i);
  });
});
