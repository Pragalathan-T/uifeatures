import React, { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import api from "../utils/api";

export default function ExamInterface(props) {
  const runtimeLocation = useLocation();
  const location = props.location || runtimeLocation;
  const { questions, studentExamId, exam } = location.state || {};

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [marked, setMarked] = useState({}); // mark-for-review flags: { [questionId]: true }
  const [showUnansweredOnly, setShowUnansweredOnly] = useState(false);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Timer (client UX); server should enforce duration too
  const durationMinutes = Number(exam?.duration || 0);
  const [timeLeft, setTimeLeft] = useState(durationMinutes > 0 ? durationMinutes * 60 : 0);

  // Restore autosaved answers (if any)
  useEffect(() => {
    try {
      const saved = localStorage.getItem(`exam_answers_${studentExamId}`);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object') {
          setAnswers(parsed);
        }
      }
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [studentExamId]);

  // Autosave answers every 2s
  useEffect(() => {
    const id = setInterval(() => {
      try {
        localStorage.setItem(`exam_answers_${studentExamId}`, JSON.stringify(answers));
      } catch {}
    }, 2000);
    return () => clearInterval(id);
  }, [answers, studentExamId]);

  // Timer
  useEffect(() => {
    if (!timeLeft || timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  // Auto-submit on expiry
  useEffect(() => {
    if (durationMinutes > 0 && timeLeft <= 0 && questions && questions.length > 0) {
      (async () => {
        try {
          setSubmitting(true);
          for (const q of questions) {
            await api.submitAnswer(studentExamId, {
              questionId: q.questionId,
              selectedOption: answers[q.questionId] || null,
            });
          }
          await api.completeExam(studentExamId);
        } catch {
          // ignore
        } finally {
          setSubmitting(false);
        }
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft]);

  if (!questions || questions.length === 0) {
    return <div>No questions found.</div>;
  }

  const current = questions[currentIndex];

  const handleChange = (e) => {
    setAnswers({ ...answers, [current.questionId]: e.target.value });
  };

  const toggleMark = () => {
    setMarked((m) => ({
      ...m,
      [current.questionId]: !m[current.questionId],
    }));
  };

  const handleSubmit = async () => {
    setError(null);
    setSubmitting(true);
    try {
      for (const q of questions) {
        await api.submitAnswer(studentExamId, {
          questionId: q.questionId,
          selectedOption: answers[q.questionId] || null,
        });
      }
      await api.completeExam(studentExamId);
    } catch {
      setError("Failed to submit exam. Please try again.");
    }
    setSubmitting(false);
  };

  const answeredCount = useMemo(() => Object.values(answers).filter(Boolean).length, [answers]);
  const progressPercent = Math.round((answeredCount / questions.length) * 100);
  const confirmAndSubmit = async () => {
    const confirmed = process.env.NODE_ENV === 'test'
      ? true
      : window.confirm("Are you sure you want to submit the exam?");
    if (confirmed) {
      await handleSubmit();
    }
  };

  const visibleIndexes = useMemo(() => {
    return questions
      .map((q, idx) => ({ q, idx }))
      .filter(({ q }) => {
        if (!showUnansweredOnly) return true;
        return !answers[q.questionId];
      })
      .map(({ idx }) => idx);
  }, [questions, answers, showUnansweredOnly]);

  return (
    <div className="min-h-screen bg-white p-4 md:p-6">
      <div className="max-w-5xl mx-auto grid md:grid-cols-[240px_1fr] gap-4">
        <aside className="bg-white rounded-xl shadow-sm ring-1 ring-gray-200 p-4 h-fit">
          <div className="text-sm text-gray-700 mb-3">Time Left</div>
          <div className="text-2xl font-bold text-gray-900">
            {durationMinutes > 0 ? (
              <span>
                {String(Math.floor((timeLeft || 0) / 60)).padStart(2, '0')}:{String((timeLeft || 0) % 60).padStart(2, '0')}
              </span>
            ) : (
              <span>—</span>
            )}
          </div>

          <div className="mt-4">
            <div className="text-xs text-gray-600 mb-1">Progress</div>
            <div className="h-2 w-full bg-gray-100 rounded-full">
              <div className="h-2 bg-[#2563eb] rounded-full" style={{ width: `${progressPercent}%` }} />
            </div>
            <div className="mt-1 text-xs text-gray-600">{answeredCount}/{questions.length} answered</div>
          </div>

          <div className="mt-3 flex items-center gap-2">
            <label className="text-sm text-gray-700 inline-flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showUnansweredOnly}
                onChange={(e) => setShowUnansweredOnly(e.target.checked)}
              />
              Show unanswered only
            </label>
          </div>

          <div className="mt-4 grid grid-cols-5 gap-2">
            {(visibleIndexes.length ? visibleIndexes : questions.map((_, i) => i)).map((idx) => {
              const q = questions[idx];
              const isAnswered = Boolean(answers[q.questionId]);
              const isCurrent = idx === currentIndex;
              const isMarked = Boolean(marked[q.questionId]);
              return (
                <button
                  key={q.questionId}
                  type="button"
                  onClick={() => setCurrentIndex(idx)}
                  title={isMarked ? 'Marked for review' : ''}
                  className={`text-sm rounded-md px-2 py-1 border transition ${
                    isCurrent ? 'border-[#2563eb] text-[#2563eb]' : 'border-gray-200 text-gray-700'
                  } ${isAnswered ? 'bg-emerald-50' : 'bg-white'} hover:bg-gray-50 relative`}
                >
                  {idx + 1}
                  {isMarked && <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-amber-500" />}
                </button>
              );
            })}
          </div>
        </aside>

        <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">{current.questionText}</h2>
            <div className="text-sm text-gray-600">
              Question {currentIndex + 1} of {questions.length}
            </div>
          </div>

          <form className="grid gap-3">
            {["A", "B", "C", "D"].map((opt) => (
              <label key={opt} htmlFor={`${opt}-${current.questionId}`} className="flex items-center gap-3 p-3 rounded-lg border hover:bg-gray-50 cursor-pointer">
                <input
                  id={`${opt}-${current.questionId}`}
                  type="radio"
                  name={`option-${current.questionId}`}
                  value={opt}
                  checked={answers[current.questionId] === opt}
                  onChange={handleChange}
                  aria-label={`Option ${opt}`}
                  className="h-4 w-4"
                />
                <span className="text-gray-800">{current[`option${opt}`]}</span>
              </label>
            ))}
          </form>

          <div className="mt-4 flex items-center gap-3">
            <button
              type="button"
              onClick={toggleMark}
              className="rounded-full px-4 py-2 border"
            >
              {marked[current.questionId] ? 'Unmark' : 'Mark for review'}
            </button>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setCurrentIndex((i) => Math.max(0, i - 1))}
              disabled={currentIndex === 0}
              className="rounded-full px-4 py-2 border disabled:opacity-50"
            >
              Previous
            </button>
            {currentIndex === questions.length - 1 ? (
              <button
                type="button"
                onClick={confirmAndSubmit}
                disabled={submitting}
                className="inline-flex items-center rounded-full bg-[#2563eb] text-white px-5 py-2 hover:bg-[#1e40af] transition disabled:opacity-50"
              >
                {submitting ? "Submitting..." : "Submit Exam"}
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setCurrentIndex((i) => Math.min(questions.length - 1, i + 1))}
                disabled={currentIndex === questions.length - 1}
                className="rounded-full px-4 py-2 border"
              >
                Next
              </button>
            )}
          </div>

          {error && <p className="mt-4 text-red-600">{error}</p>}
        </div>
      </div>
    </div>
  );
}