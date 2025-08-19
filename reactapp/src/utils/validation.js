export function validateExamData(examData) {
    const errors = {};
    if (!examData.title || examData.title.trim() === '') {
        errors.title = 'Title is required';
        }
        if (!examData.description || examData.description.trim() === '') {
            errors.description = 'Description is required';
            }
            if (!examData.duration || isNaN(examData.duration) || examData.duration <= 0) {
                errors.duration = 'Duration must be a positive number';
                }
                return errors;
                }

                export function validateQuestionData(questionData) {
                const errors = {};
                if (!questionData.text || questionData.text.trim() === '') {
                errors.text = 'Question text is required';
                }
                if (!questionData.optionA || questionData.optionA.trim() === '') {
                errors.optionA = 'Option A is required';
                }
                if (!questionData.optionB || questionData.optionB.trim() === '') {
                errors.optionB = 'Option B is required';
                }
                if (!questionData.optionC || questionData.optionC.trim() === '') {
                errors.optionC = 'Option C is required';
                }
                if (!questionData.optionD || questionData.optionD.trim() === '') {
                errors.optionD = 'Option D is required';
                }
                if (
                !questionData.correctAnswer ||
                !['A', 'B', 'C', 'D'].includes(questionData.correctAnswer.toUpperCase())
                ) {
                errors.correctAnswer = 'Correct answer must be one of A, B, C, or D';
                }
                if (!questionData.marks || isNaN(questionData.marks) || questionData.marks <= 0) {
                errors.marks = 'Marks must be a positive number';
                }
                return errors;
                }

    