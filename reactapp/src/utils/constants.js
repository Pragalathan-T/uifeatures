

export const EXAM_STATUS = {
    ACTIVE: 'Active',
    INACTIVE: 'Inactive',
};

export const DEFAULT_EXAM_DURATION = 30; // in minutes

export const ERROR_MESSAGES = {
    LOAD_EXAMS_FAILED: 'Failed to load exams.',
    UPDATE_STATUS_FAILED: 'Failed to update exam status.',
    CREATE_EXAM_FAILED: 'Failed to create exam.',
    ADD_QUESTION_FAILED: 'Failed to add question.',
    LOAD_RESULTS_FAILED: 'Failed to load exam results.',
};

export const API_ENDPOINTS = {
    GET_EXAMS_BY_TEACHER: '/api/teacher/exams',
    UPDATE_EXAM_STATUS: '/api/exam/status',
    CREATE_EXAM: '/api/exam/create',
    ADD_QUESTION: '/api/exam/question/add',
    GET_AVAILABLE_EXAMS: '/api/student/exams',
    SUBMIT_ANSWER: '/api/exam/submit-answer',
    COMPLETE_EXAM: '/api/exam/complete',
    GET_EXAM_RESULTS: '/api/exam/results',
};

