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
<div>
<h1>{results.exam.title}</h1>
<p>{results.exam.description}</p>
<h3>Total Score: {results.score}</h3>

<div>
{results.questions.map((q, idx) => (
<div key={idx} style={{ marginBottom: "20px" }}>
<h4>{q.questionText}</h4>
<ul>
<li>A: <span>{q.optionA}</span></li>
<li>B: <span>{q.optionB}</span></li>
<li>C: <span>{q.optionC}</span></li>
<li>D: <span>{q.optionD}</span></li>
</ul>
<p>Your Answer: {q.studentAnswer || "Not answered"}</p>
<p>Correct Answer: {q.correctOption}</p>
<p style={{ color: q.isCorrect ? "green" : "red" }}>
{q.isCorrect ? "Correct" : "Incorrect"}
</p>
<p>Marks: {q.marks}</p>
</div>
))}
</div>
</div>
);
}