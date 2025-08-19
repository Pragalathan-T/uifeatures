import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ExamCreator from '../components/ExamCreator';
import { MemoryRouter } from 'react-router-dom';
const api = require('../utils/api');

jest.mock('../utils/api');

describe('ExamCreator', () => {
  beforeEach(() => jest.clearAllMocks());

  test('validates form input and triggers API when adding a question to a created exam', async () => {
    render(<MemoryRouter><ExamCreator /></MemoryRouter>);
    fireEvent.click(screen.getByText(/save exam/i));
    expect(screen.getAllByText(/required/gi).length).toBeGreaterThan(0);

    // Fill and submit exam first
    fireEvent.change(screen.getByLabelText(/title/i), {
      target: { value: 'My Exam' },
    });
    fireEvent.change(screen.getByLabelText(/description/i), {
      target: { value: 'A great exam.' },
    });
    fireEvent.change(screen.getByLabelText(/duration/i), {
      target: { value: '25' },
    });
    api.createExam.mockResolvedValueOnce({ data: { examId: 4 } });
    fireEvent.click(screen.getByText(/save exam/i));
    await waitFor(() => expect(api.createExam).toHaveBeenCalled());

    // Then fill question
    fireEvent.change(screen.getByLabelText(/question text/i), {
      target: { value: 'Sample Q?' },
    });
    fireEvent.change(screen.getByLabelText(/option a/i), {
      target: { value: 'a' },
    });
    fireEvent.change(screen.getByLabelText(/option b/i), {
      target: { value: 'b' },
    });
    fireEvent.change(screen.getByLabelText(/option c/i), {
      target: { value: 'c' },
    });
    fireEvent.change(screen.getByLabelText(/option d/i), {
      target: { value: 'd' },
    });
    fireEvent.change(screen.getByLabelText(/correct answer/i), {
      target: { value: 'A' },
    });
    fireEvent.change(screen.getByLabelText(/marks/i), {
      target: { value: '2' },
    });
    api.addQuestionToExam.mockResolvedValueOnce({ data: { questionId: 20 } });
    fireEvent.click(screen.getByText(/add question/i));
    await waitFor(() => expect(api.addQuestionToExam).toHaveBeenCalled());
    expect(await screen.findByText('Questions Added: 1')).toBeInTheDocument();
    expect(await screen.findByText('Sample Q?')).toBeInTheDocument();
  });
});
