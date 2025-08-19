import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import StudentExamList from '../components/StudentExamList';
import { MemoryRouter } from 'react-router-dom';
const api = require('../utils/api');

jest.mock('../utils/api');

describe('StudentExamList', () => {
  beforeEach(() => jest.clearAllMocks());

  test('fetches and displays exams', async () => {
    api.getAvailableExams.mockResolvedValueOnce({ data: [
      { examId: 1, title: 'Java', description: 'desc', duration: 20 },
      { examId: 2, title: 'JS', description: 'desc2', duration: 30 },
    ] });
    render(<MemoryRouter><StudentExamList /></MemoryRouter>);
    await screen.findByText('Java');
    expect(screen.getByText('JS')).toBeInTheDocument();
  });

  test('shows error on API fail', async () => {
    api.getAvailableExams.mockRejectedValueOnce(new Error('fail'));
    render(<MemoryRouter><StudentExamList /></MemoryRouter>);
    await screen.findByText(/fail|unexpected/i);
  });
});
