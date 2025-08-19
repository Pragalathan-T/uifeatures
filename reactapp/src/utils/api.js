const RAW_BASE = process.env.REACT_APP_API_URL || 'https://8080-aeadacfbdbdedbdbcdacedeffadbcfbbaaddea.premiumproject.examly.io';
const BASE_URL = RAW_BASE.endsWith('/api')
? RAW_BASE
: `${RAW_BASE.replace(/\/$/, '')}/api`;

const toData = async (response) => {
const text = await response.text();
const maybeJson = text ? (() => { try { return JSON.parse(text); } catch { return text; } })() : null;

if (!response.ok) {
const message =
(maybeJson && (maybeJson.message || maybeJson.error || maybeJson.details)) ||
`HTTP ${response.status}`;
throw new Error(message);
}
return { data: typeof maybeJson === 'string' ? { message: maybeJson } : maybeJson };
};

const toDataTransform = async (response, transformFn) => {
const text = await response.text();
const maybeJson = text ? (() => { try { return JSON.parse(text); } catch { return text; } })() : null;

if (!response.ok) {
const message =
(maybeJson && (maybeJson.message || maybeJson.error || maybeJson.details)) ||
`HTTP ${response.status}`;
throw new Error(message);
}
const data = transformFn ? transformFn(maybeJson) : maybeJson;
return { data };
};
// TeacherController (/api/exams)
export const createExam = async (examData) => {
const payload = { ...examData, createdBy: examData.createdBy || 'teacher1' };
const response = await fetch(`${BASE_URL}/exams`, {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify(payload),
});
return toData(response);
};

export const getExamsByTeacher = async (teacherUsername, { page, size, sortBy = 'createdAt', sortDir = 'desc', status } = {}) => {
const params = new URLSearchParams({ createdBy: teacherUsername });
if (page !== undefined && size !== undefined) {
params.set('page', String(page));
params.set('size', String(size));
if (sortBy) params.set('sortBy', sortBy);
if (sortDir) params.set('sortDir', sortDir);
}
if (status) params.set('status', status);
const response = await fetch(`${BASE_URL}/exams?${params.toString()}`);
return toData(response);
};


export const updateExamStatus = async (examId, { isActive }) => {
const response = await fetch(`${BASE_URL}/exams/${examId}/status`, {
method: 'PATCH',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ isActive }),
});
return toData(response);
};

export const addQuestionToExam = async (examId, questionData) => {
const payload = {
questionText: questionData.text ?? questionData.questionText,
optionA: questionData.optionA,
optionB: questionData.optionB,
optionC: questionData.optionC,
optionD: questionData.optionD,
correctOption: questionData.correctAnswer ?? questionData.correctOption,
marks: typeof questionData.marks === 'string' ? parseInt(questionData.marks, 10) : questionData.marks,
};
const response = await fetch(`${BASE_URL}/exams/${examId}/questions`, {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify(payload),
});
return toData(response);
};
// StudentController (/api/student/exams)
export const getAvailableExams = async () => {
const response = await fetch(`${BASE_URL}/student/exams`);
return toData(response);
};

export const startExam = async (examId, studentUsername) => {
const response = await fetch(`${BASE_URL}/student/exams/${examId}/start`, {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ studentUsername }),
});
return toData(response);
};
export const submitAnswer = async (studentExamId, answerData) => {
const response = await fetch(`${BASE_URL}/student/exams/${studentExamId}/answers`, {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify(answerData),
});
return toData(response);
};

export const completeExam = async (studentExamId) => {
const response = await fetch(`${BASE_URL}/student/exams/${studentExamId}/complete`, { method: 'POST' });
return toData(response);
};

export const getExamResults = async (studentExamId) => {
const response = await fetch(`${BASE_URL}/student/exams/${studentExamId}/results`);
return toDataTransform(response, (raw) => ({
exam: {
title: raw.examTitle ?? raw.exam?.title ?? '',
description: raw.description ?? raw.exam?.description ?? '',
},
score: raw.score ?? 0,
// ... keep rest as-is if present below ...
}));
};

// NEW: fetch questions for an exam (used to render ExamInterface)
export const getQuestionsByExam = async (examId) => {
const response = await fetch(`${BASE_URL}/questions/by-exam/${examId}`);
return toData(response);
};


// // StudentController (/api/student/exams)
// export const getAvailableExams = async () => {
// const response = await fetch(`${BASE_URL}/student/exams`);
// return toData(response);
// };

// export const startExam = async (examId, studentUsername) => {
// const response = await fetch(`${BASE_URL}/student/exams/${examId}/start`, {
// method: 'POST',
// headers: { 'Content-Type': 'application/json' },
// body: JSON.stringify({ studentUsername }),
// });
// return toData(response);
// };

// export const submitAnswer = async (studentExamId, answerData) => {
// const response = await fetch(`${BASE_URL}/student/exams/${studentExamId}/answers`, {
// method: 'POST',
// headers: { 'Content-Type': 'application/json' },
// body: JSON.stringify(answerData),
// });
// return toData(response);
// };

// export const completeExam = async (studentExamId) => {
// const response = await fetch(`${BASE_URL}/student/exams/${studentExamId}/complete`, { method: 'POST' });
// return toData(response);
// };

// export const getExamResults = async (studentExamId) => {
// const response = await fetch(`${BASE_URL}/student/exams/${studentExamId}/results`);
// return toDataTransform(response, (raw) => ({
// exam: {
// title: raw.examTitle ?? raw.exam?.title ?? '',
// description: raw.description ?? raw.exam?.description ?? '',
// },
// score: raw.score ?? 0,
// total: raw.total ?? (Array.isArray(raw.questions) ? raw.questions.reduce((s, q) => s + (q.marks || 0), 0) : undefined),
// questions: Array.isArray(raw.questions)
// ? raw.questions.map((q) => ({ ...q, studentAnswer: q.selectedOption ?? q.studentAnswer ?? null }))
// : [],
// }));
// };

// AuthController (/api/auth)
export const login = async ({ username, password }) => {
const response = await fetch(`${BASE_URL}/auth/login`, {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ username, password }),
});
return toData(response);
};

export const register = async (payload) => {
const response = await fetch(`${BASE_URL}/auth/register`, {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify(payload),
});
return toData(response);
};

export const logout = async () => {
const response = await fetch(`${BASE_URL}/auth/logout`, { method: 'POST' });
return toData(response);
};

// AdminController (/api/admin)
export const getAdminByUsername = async (username) => {
const response = await fetch(`${BASE_URL}/admin/${encodeURIComponent(username)}`);
return toData(response);
};

export const createAdmin = async ({ username, password, email }) => {
const response = await fetch(`${BASE_URL}/admin`, {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ username, password, email }),
});
return toData(response);
};

// StudentExamController (/api/student-exams)
export const getStudentExamHistory = async (
studentId,
{ page = 0, size = 10, sortBy = 'startTime', sortDir = 'desc' } = {}
) => {
const params = new URLSearchParams({ page, size, sortBy, sortDir });
const response = await fetch(`${BASE_URL}/student-exams/history/${studentId}?${params.toString()}`);
return toData(response);
};

export const startStudentExam = async ({ examId, studentUsername }) => {
const response = await fetch(`${BASE_URL}/student-exams/start`, {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ examId, studentUsername }),
});
return toData(response);
};

export const submitAnswerGlobal = async (studentExamId, { questionId, selectedOption }) => {
const response = await fetch(`${BASE_URL}/student-exams/${studentExamId}/answers`, {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ questionId, selectedOption }),
});
return toData(response);
};

export const completeStudentExam = async (studentExamId) => {
const response = await fetch(`${BASE_URL}/student-exams/${studentExamId}/complete`, { method: 'POST' });
return toData(response);
};

// QuestionController (/api/questions)
export const addQuestionDirect = async (questionDto) => {
const response = await fetch(`${BASE_URL}/questions`, {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify(questionDto),
});
return toData(response);
};

export const listQuestions = async ({ page = 0, size = 10, sortBy = 'id', sortDir = 'asc' } = {}) => {
const params = new URLSearchParams({ page, size, sortBy, sortDir });
const response = await fetch(`${BASE_URL}/questions?${params.toString()}`);
return toData(response);
};

export const getQuestionById = async (id) => {
const response = await fetch(`${BASE_URL}/questions/${id}`);
return toData(response);
};

export const deleteQuestion = async (id) => {
const response = await fetch(`${BASE_URL}/questions/${id}`, { method: 'DELETE' });
return toData(response);
};

// ExamController (/api/exam-management)
export const mgmtCreateExam = async (examDto) => {
const response = await fetch(`${BASE_URL}/exam-management`, {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify(examDto),
});
return toData(response);
};

export const mgmtGetExamsByTeacher = async (username, { page, size, sortBy = 'title' } = {}) => {
const params = new URLSearchParams();
if (page !== undefined && size !== undefined) {
params.set('page', String(page));
params.set('size', String(size));
}
if (sortBy) params.set('sortBy', sortBy);
const url = `${BASE_URL}/exam-management/teacher/${encodeURIComponent(username)}${
params.toString() ? `?${params}` : ''
}`;
const response = await fetch(url);
return toData(response);
};

export const mgmtUpdateExamStatus = async (examId, { isActive }) => {
const response = await fetch(`${BASE_URL}/exam-management/${examId}/status`, {
method: 'PATCH',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ isActive }),
});
return toData(response);
};

// ValidationController (/api/validation)
export const validateStudentAnswer = async (payload) => {
const response = await fetch(`${BASE_URL}/validation/studentAnswer`, {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify(payload),
});
return toData(response);
};

export const validateQuestion = async (payload) => {
const response = await fetch(`${BASE_URL}/validation/question`, {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify(payload),
});
return toData(response);
};

export const validateExam = async (payload) => {
const response = await fetch(`${BASE_URL}/validation/exam`, {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify(payload),
});
return toData(response);
};

const api = {
// teacher
createExam,
getExamsByTeacher,
updateExamStatus,
addQuestionToExam,
// student (controller)
getAvailableExams,
startExam,
submitAnswer,
completeExam,
getExamResults,
// auth
login,
register,
logout,
// admin
getAdminByUsername,
createAdmin,
// student-exams
getStudentExamHistory,
startStudentExam,
submitAnswerGlobal,
completeStudentExam,
// questions
addQuestionDirect,
listQuestions,
getQuestionById,
deleteQuestion,
// exam-management
mgmtCreateExam,
mgmtGetExamsByTeacher,
mgmtUpdateExamStatus,
// validation
validateStudentAnswer,
validateQuestion,
validateExam,
};
export default api;