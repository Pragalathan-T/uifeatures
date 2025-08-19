import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import ExamResults from '../components/ExamResults';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
const api = require('../utils/api');

jest.mock('../utils/api');

describe('ExamResults', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockResults = {
    exam: {
      title: 'Sample Exam',
      description: 'Test Desc',
    },
    score: 6,
    total: 10,
    questions: [
      {
        questionText: 'Q1?',
        optionA: 'a',
        optionB: 'b',
        optionC: 'c',
        optionD: 'd',
        correctOption: 'A',
        studentAnswer: 'A',
        marks: 2,
        isCorrect: true,
      },
      {
        questionText: 'Q2?',
        optionA: 'x',
        optionB: 'y',
        optionC: 'z',
        optionD: 'w',
        correctOption: 'D',
        studentAnswer: 'C',
        marks: 4,
        isCorrect: false,
      }
    ]
  };

  test('renders exam results with correct data', async () => {
    api.getExamResults.mockResolvedValueOnce({ data: mockResults });
    render(
      <MemoryRouter initialEntries={["/student/results/5"]}>
        <Routes>
          <Route path="/student/results/:studentExamId" element={<ExamResults />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(api.getExamResults).toHaveBeenCalledWith('5');

    await screen.findByText('Sample Exam');
    expect(screen.getByText('Test Desc')).toBeInTheDocument();
    expect(screen.getByText('Total Score: 6')).toBeInTheDocument();
    expect(screen.getByText('Q1?')).toBeInTheDocument();
    expect(screen.getByText('Q2?')).toBeInTheDocument();
    expect(screen.getByText('a')).toBeInTheDocument();
    expect(screen.getByText('d')).toBeInTheDocument();
    expect(screen.getAllByText('Correct').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Incorrect').length).toBeGreaterThan(0);
  });

  test('shows error if API fails', async () => {
    api.getExamResults.mockRejectedValueOnce(new Error('Fail'));
    render(
      <MemoryRouter initialEntries={["/student/results/9"]}>
        <Routes>
          <Route path="/student/results/:studentExamId" element={<ExamResults />} />
        </Routes>
      </MemoryRouter>
    );
    await screen.findByText(/fail|unexpected/i);
  });
});
