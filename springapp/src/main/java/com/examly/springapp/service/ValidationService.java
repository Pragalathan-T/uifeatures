package com.examly.springapp.service;

import com.examly.springapp.model.Exam;
import com.examly.springapp.model.Question;
import com.examly.springapp.model.StudentAnswer;
import org.springframework.stereotype.Service;

@Service
public class ValidationService {

public boolean isValidEmail(String email) {
return email != null && email.matches("^(.+)@(.+)$");
}

public boolean isValidDuration(int duration) {
return duration >= 10 && duration <= 180;
}

public boolean isValidUsername(String username) {
return username != null && !username.trim().isEmpty();
}

public boolean isValidQuestion(String questionText) {
return questionText != null && !questionText.trim().isEmpty();
}

public boolean validateExam(Exam exam) {
if (exam == null) return false;
if (!isValidUsername(exam.getTitle())) return false;
if (exam.getTimeLimit() != null && !isValidDuration(exam.getTimeLimit())) return false;
return true;
}

public boolean validateQuestion(Question question) {
if (question == null) return false;
return isValidQuestion(question.getQuestionText());
}

public boolean validateStudentAnswer(StudentAnswer answer) {
if (answer == null) return false;
return answer.getAnswerText() != null && !answer.getAnswerText().trim().isEmpty();
}
}
