import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ExamInterface from '../components/ExamInterface';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
const api = require('../utils/api');

jest.mock('../utils/api');

describe('ExamInterface', () => {
  const mockLocation = { state: { questions: [
      { questionId: 11, questionText: 'Q1?', optionA: 'A', optionB: 'B', optionC: 'C', optionD: 'D', marks: 2 },
      { questionId: 12, questionText: 'Q2?', optionA: 'X', optionB: 'Y', optionC: 'Z', optionD: 'W', marks: 3 },
    ],
    exam: { duration: 15 },
    studentExamId: '21', studentUsername: 'student1' }
  };
  const wrapper = (ui) => (
    <MemoryRouter initialEntries={["/student/exams/21"]}>
      <Routes>
        <Route path="/student/exams/:studentExamId" element={ui} />
      </Routes>
    </MemoryRouter>
  );
  beforeEach(() => jest.clearAllMocks());

  test('renders questions and navigates', () => {
    render(wrapper(<ExamInterface location={mockLocation} />));
    expect(screen.getByText('Q1?')).toBeInTheDocument();
    expect(screen.getByLabelText('Option A')).toBeInTheDocument();
    fireEvent.click(screen.getByText(/next/i));
    expect(screen.getByText('Q2?')).toBeInTheDocument();
    fireEvent.click(screen.getByText(/previous/i));
    expect(screen.getByText('Q1?')).toBeInTheDocument();
  });

  test('selects answer and submits', async () => {
    api.submitAnswer.mockResolvedValueOnce({ data: { answerId: 1, isCorrect: true } });
    api.completeExam.mockResolvedValueOnce({ data: { score: 5 } });
    render(wrapper(<ExamInterface location={mockLocation} />));
    fireEvent.click(screen.getByLabelText('Option B'));
    fireEvent.click(screen.getByText(/next/i));
    fireEvent.click(screen.getByText(/submit exam/i));
    await waitFor(() => expect(api.completeExam).toHaveBeenCalledWith('21'));
  });
});
