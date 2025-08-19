// import React, { useState } from "react";
// import { useLocation } from "react-router-dom";
// import api from "../utils/api";

// export default function ExamInterface(props) {
// const runtimeLocation = useLocation();
// const location = props.location || runtimeLocation; // allow injected location from tests
// const { questions, studentExamId } = location.state || {};

// const [currentIndex, setCurrentIndex] = useState(0);
// const [answers, setAnswers] = useState({});
// const [error, setError] = useState(null);
// const [submitting, setSubmitting] = useState(false);

// if (!questions || questions.length === 0) {
// return <div>No questions found.</div>;
// }

// const current = questions[currentIndex];

// const handleChange = (e) => {
// setAnswers({ ...answers, [current.questionId]: e.target.value });
// };

// const handleSubmit = async () => {
// setError(null);
// setSubmitting(true);
// try {
// for (const q of questions) {
// await api.submitAnswer(studentExamId, {
// questionId: q.questionId,
// selectedOption: answers[q.questionId] || null,
// });
// }
// await api.completeExam(studentExamId);
// } catch {
// setError("Failed to submit exam. Please try again.");
// }
// setSubmitting(false);
// };

// return (
// <div>
// <h2>{current.questionText}</h2>
// <form>
// {["A", "B", "C", "D"].map((opt) => (
// <label key={opt} htmlFor={`${opt}-${current.questionId}`}>
// <input
// id={`${opt}-${current.questionId}`}
// type="radio"
// name={`option-${current.questionId}`}
// value={opt}
// checked={answers[current.questionId] === opt}
// onChange={handleChange}
// aria-label={`Option ${opt}`}
// />
// {current[`option${opt}`]}
// </label>
// ))}
// </form>

// <button onClick={() => setCurrentIndex((i) => Math.max(0, i - 1))} disabled={currentIndex === 0}>
// Previous
// </button>
// <button
// onClick={() => setCurrentIndex((i) => Math.min(questions.length - 1, i + 1))}
// disabled={currentIndex === questions.length - 1}
// >
// Next
// </button>

// {currentIndex === questions.length - 1 && (
// <button onClick={handleSubmit} disabled={submitting}>
// {submitting ? "Submitting..." : "Submit Exam"}
// </button>
// )}

// {error && <p style={{ color: "red" }}>{error}</p>}
// </div>
// );
// }
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import api from "../utils/api";

export default function ExamInterface(props) {
const runtimeLocation = useLocation();
const location = props.location || runtimeLocation;
const { questions, studentExamId } = location.state || {};

const [currentIndex, setCurrentIndex] = useState(0);
const [answers, setAnswers] = useState({});
const [error, setError] = useState(null);
const [submitting, setSubmitting] = useState(false);

if (!questions || questions.length === 0) {
return <div>No questions found.</div>;
}

const current = questions[currentIndex];

const handleChange = (e) => {
setAnswers({ ...answers, [current.questionId]: e.target.value });
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

return (
<div className="min-h-screen bg-white p-4 md:p-6">
<div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm ring-1 ring-gray-200 p-6">
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

<div className="mt-6 flex items-center justify-between">
<button
onClick={() => setCurrentIndex((i) => Math.max(0, i - 1))}
disabled={currentIndex === 0}
className="rounded-full px-4 py-2 border disabled:opacity-50"
>
Previous
</button>
{currentIndex === questions.length - 1 ? (
<button
onClick={handleSubmit}
disabled={submitting}
className="inline-flex items-center rounded-full bg-[#2563eb] text-white px-5 py-2 hover:bg-[#1e40af] transition disabled:opacity-50"
>
{submitting ? "Submitting..." : "Submit Exam"}
</button>
) : (
<button
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
);
}