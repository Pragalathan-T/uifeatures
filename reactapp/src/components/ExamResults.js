import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../utils/api";

export default function ExamResults() {
  const { studentExamId } = useParams();
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.getExamResults(studentExamId)
      .then((res) => {
        setResults(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load exam results.");
        setLoading(false);
      });
  }, [studentExamId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!results) return null;

  return (
    <div className="min-h-screen bg-[#f9fafb] p-4 md:p-6">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-200 p-6">
          <h1 className="text-2xl font-bold text-gray-900">{results.exam.title}</h1>
          <p className="mt-1 text-gray-600">{results.exam.description}</p>
          <h3 className="mt-4 text-lg font-semibold text-gray-900">Total Score: {results.score}</h3>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {results.questions.map((q, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow-sm ring-1 ring-gray-200 p-5">
              <h4 className="text-base font-semibold text-gray-900">{q.questionText}</h4>
              <ul className="mt-2 text-sm text-gray-700 space-y-1">
                <li>A: <span>{q.optionA}</span></li>
                <li>B: <span>{q.optionB}</span></li>
                <li>C: <span>{q.optionC}</span></li>
                <li>D: <span>{q.optionD}</span></li>
              </ul>
              <div className="mt-3 text-sm">
                <p>Your Answer: {q.studentAnswer || "Not answered"}</p>
                <p>Correct Answer: {q.correctOption}</p>
                <p className={q.isCorrect ? "text-green-600" : "text-red-600"}>
                  {q.isCorrect ? "Correct" : "Incorrect"}
                </p>
                <p>Marks: {q.marks}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}