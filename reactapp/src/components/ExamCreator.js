import React, { useState } from "react";
import api from "../utils/api";
import { validateExamData, validateQuestionData } from "../utils/validation";
import { ERROR_MESSAGES } from "../utils/constants";

export default function ExamCreator() {
const [examData, setExamData] = useState({ title: "", description: "", duration: "", topic: "", difficulty: "EASY", expiryDate: "", timeLimit: "", maxAttempts: "", feedback: "", imageUrl: "" });
const [errors, setErrors] = useState({});
const [examId, setExamId] = useState(null);
const [saving, setSaving] = useState(false);

const [questionData, setQuestionData] = useState({
text: "",
optionA: "",
optionB: "",
optionC: "",
optionD: "",
correctAnswer: "",
marks: "",
});
const [questions, setQuestions] = useState([]);

const extraExamValidation = () => {
const eerrs = {};
if (examData.maxAttempts && (isNaN(examData.maxAttempts) || Number(examData.maxAttempts) < 0)) eerrs.maxAttempts = 'Max attempts must be >= 0';
if (examData.timeLimit && (isNaN(examData.timeLimit) || Number(examData.timeLimit) < 0)) eerrs.timeLimit = 'Time limit must be >= 0';
return eerrs;
};

const handleSaveExam = async () => {
const examErrors = { ...validateExamData(examData), ...extraExamValidation() };
if (Object.keys(examErrors).length) { setErrors(examErrors); return; }
try {
setSaving(true);
const payload = {
title: examData.title, description: examData.description, duration: Number(examData.duration),
createdBy: examData.createdBy || 'teacher1', isActive: false, topic: examData.topic || null,
difficulty: examData.difficulty || null, expiryDate: examData.expiryDate || null,
timeLimit: examData.timeLimit ? Number(examData.timeLimit) : null, maxAttempts: examData.maxAttempts ? Number(examData.maxAttempts) : null,
feedback: examData.feedback || null, imageUrl: examData.imageUrl || null,
};
const res = await api.createExam(payload);
setExamId(res.data.examId);
setErrors({});
} catch { setErrors({ general: ERROR_MESSAGES.CREATE_EXAM_FAILED }); }
finally { setSaving(false); }
};

const handleAddQuestion = async () => {
const qErrors = validateQuestionData(questionData);
if (Object.keys(qErrors).length) { setErrors(qErrors); return; }
try {
await api.addQuestionToExam(examId, questionData);
setQuestions([...questions, { ...questionData }]);
setQuestionData({ text: "", optionA: "", optionB: "", optionC: "", optionD: "", correctAnswer: "", marks: "" });
setErrors({});
} catch { setErrors({ general: ERROR_MESSAGES.ADD_QUESTION_FAILED }); }
};

return (
<div className="page">
<div className="card">
<h1 style={{ marginTop:0 }}>Create Exam</h1>
{errors.general && <p style={{ color: "red" }}>{errors.general}</p>}
<div className="form form-2col">
<div>
<label>Title</label>
<input className="input" aria-label="title" value={examData.title} onChange={(e) => setExamData({ ...examData, title: e.target.value })} />
{errors.title && <span style={{ color: "red" }}>{errors.title}</span>}
</div>
<div>
<label>Description</label>
<input className="input" aria-label="description" value={examData.description} onChange={(e) => setExamData({ ...examData, description: e.target.value })} />
{errors.description && <span style={{ color: "red" }}>{errors.description}</span>}
</div>
<div>
<label>Duration (minutes)</label>
<input className="input" aria-label="duration" type="number" value={examData.duration} onChange={(e) => setExamData({ ...examData, duration: e.target.value })} />
{errors.duration && <span style={{ color: "red" }}>{errors.duration}</span>}
</div>
<div>
<label>Topic</label>
<input className="input" value={examData.topic} onChange={(e)=>setExamData({...examData, topic:e.target.value})} />
</div>
<div>
<label>Difficulty</label>
<select className="input" value={examData.difficulty} onChange={(e)=>setExamData({...examData, difficulty:e.target.value})}>
<option value="EASY">EASY</option><option value="MEDIUM">MEDIUM</option><option value="HARD">HARD</option>
</select>
</div>
<div>
<label>Expiry Date</label>
<input className="input" type="datetime-local" value={examData.expiryDate} onChange={(e)=>setExamData({...examData, expiryDate:e.target.value})} />
</div>
<div>
<label>Time Limit (seconds)</label>
<input className="input" type="number" value={examData.timeLimit} onChange={(e)=>setExamData({...examData, timeLimit:e.target.value})} />
{errors.timeLimit && <span style={{ color: "red" }}>{errors.timeLimit}</span>}
</div>
<div>
<label>Max Attempts</label>
<input className="input" type="number" value={examData.maxAttempts} onChange={(e)=>setExamData({...examData, maxAttempts:e.target.value})} />
{errors.maxAttempts && <span style={{ color: "red" }}>{errors.maxAttempts}</span>}
</div>
<div style={{ gridColumn:'1/-1' }}>
<label>Feedback</label>
<textarea className="input" rows="3" value={examData.feedback} onChange={(e)=>setExamData({...examData, feedback:e.target.value})} />
</div>
<div style={{ gridColumn:'1/-1' }}>
<label>Image URL</label>
<input className="input" value={examData.imageUrl} onChange={(e)=>setExamData({...examData, imageUrl:e.target.value})} />
</div>
</div>
<div className="card-actions">
<button className="button button-primary" onClick={handleSaveExam}>{saving ? "Loading..." : "Save Exam"}</button>
</div>
</div>

{(examId || saving) && (
<div className="card" style={{ marginTop:16 }}>
<h2 style={{ marginTop:0 }}>Add a Question</h2>
<div className="form form-2col">
<div style={{ gridColumn:'1/-1' }}>
<label>Question Text</label>
<input className="input" aria-label="question text" value={questionData.text} onChange={(e) => setQuestionData({ ...questionData, text: e.target.value })} />
{errors.text && <span style={{ color: "red" }}>{errors.text}</span>}
</div>
<div>
<label>Option A</label>
<input className="input" aria-label="option a" value={questionData.optionA} onChange={(e) => setQuestionData({ ...questionData, optionA: e.target.value })} />
{errors.optionA && <span style={{ color: "red" }}>{errors.optionA}</span>}
</div>
<div>
<label>Option B</label>
<input className="input" aria-label="option b" value={questionData.optionB} onChange={(e) => setQuestionData({ ...questionData, optionB: e.target.value })} />
{errors.optionB && <span style={{ color: "red" }}>{errors.optionB}</span>}
</div>
<div>
<label>Option C</label>
<input className="input" aria-label="option c" value={questionData.optionC} onChange={(e) => setQuestionData({ ...questionData, optionC: e.target.value })} />
{errors.optionC && <span style={{ color: "red" }}>{errors.optionC}</span>}
</div>
<div>
<label>Option D</label>
<input className="input" aria-label="option d" value={questionData.optionD} onChange={(e) => setQuestionData({ ...questionData, optionD: e.target.value })} />
{errors.optionD && <span style={{ color: "red" }}>{errors.optionD}</span>}
</div>
<div>
<label>Correct Answer (A/B/C/D)</label>
<input className="input" aria-label="correct answer" value={questionData.correctAnswer} onChange={(e) => setQuestionData({ ...questionData, correctAnswer: e.target.value.toUpperCase() })} maxLength={1} />
{errors.correctAnswer && <span style={{ color: "red" }}>{errors.correctAnswer}</span>}
</div>
<div>
<label>Marks</label>
<input className="input" aria-label="marks" type="number" value={questionData.marks} onChange={(e) => setQuestionData({ ...questionData, marks: e.target.value })} />
{errors.marks && <span style={{ color: "red" }}>{errors.marks}</span>}
</div>
</div>
<div className="card-actions">
<button className="button" onClick={handleAddQuestion}>Add Question</button>
</div>

<div style={{ marginTop:12 }}>
<h3>Questions Added: {questions.length}</h3>
<ul>
{questions.map((q, idx) => (<li key={idx}>{q.text}</li>))}
</ul>
</div>
</div>
)}
</div>
);
}