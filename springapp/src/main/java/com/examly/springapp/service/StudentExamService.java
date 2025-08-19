package com.examly.springapp.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.examly.springapp.model.Exam;
import com.examly.springapp.model.Question;
import com.examly.springapp.model.StudentAnswer;
import com.examly.springapp.model.StudentExam;
import com.examly.springapp.repository.ExamRepository;
import com.examly.springapp.repository.QuestionRepository;
import com.examly.springapp.repository.StudentAnswerRepository;
import com.examly.springapp.repository.StudentExamRepository;
import org.springframework.data.domain.*;

@Service
public class StudentExamService {

@Autowired
private StudentExamRepository studentExamRepository;

@Autowired
private ExamRepository examRepository;

@Autowired
private QuestionRepository questionRepository;

@Autowired
private StudentAnswerRepository studentAnswerRepository;

public Map<String, Object> startExam(Long examId, String studentUsername) {
Exam exam = examRepository.findById(examId)
.orElseThrow(() -> new IllegalArgumentException("Exam not found"));

List<StudentExam> existing = studentExamRepository.findByExamAndStudentUsernameAndStatusIn(exam, studentUsername, List.of("IN_PROGRESS", "COMPLETED"));

if (!existing.isEmpty()) {
throw new IllegalArgumentException("Student already has an active attempt for this exam");
}

StudentExam studentExam = new StudentExam();
studentExam.setExam(exam);
studentExam.setStudentUsername(studentUsername);
studentExam.setStartTime(LocalDateTime.now());
studentExam.setStatus("IN_PROGRESS");
studentExam = studentExamRepository.save(studentExam);

Map<String, Object> response = new HashMap<>();
response.put("studentExamId", studentExam.getStudentExamId());
return response;
}

public StudentAnswer submitAnswer(Long studentExamId, Long questionId, String selectedOption) {
StudentExam studentExam = studentExamRepository.findById(studentExamId)
.orElseThrow(() -> new IllegalArgumentException("StudentExam not found"));

Question question = questionRepository.findById(questionId)
.orElseThrow(() -> new IllegalArgumentException("Question not found"));

StudentAnswer existing = studentAnswerRepository.findByStudentExamAndQuestion(studentExam, question);
if (existing != null) {
throw new IllegalArgumentException("Question already answered");
}

boolean isCorrect = question.getCorrectOption().equalsIgnoreCase(selectedOption);

StudentAnswer answer = new StudentAnswer();
answer.setStudentExam(studentExam);
answer.setQuestion(question);
answer.setSelectedOption(selectedOption);
answer.setIsCorrect(isCorrect);

return studentAnswerRepository.save(answer);
}

public Map<String, Object> completeExam(Long studentExamId) {
StudentExam studentExam = studentExamRepository.findById(studentExamId)
.orElseThrow(() -> new IllegalArgumentException("StudentExam not found"));

List<StudentAnswer> answers = studentAnswerRepository.findByStudentExam(studentExam);
int totalScore = 0;

for (StudentAnswer ans : answers) {
if (Boolean.TRUE.equals(ans.getIsCorrect())) {
totalScore += ans.getQuestion().getMarks();
}
}

studentExam.setEndTime(LocalDateTime.now());
studentExam.setScore(totalScore);
studentExam.setStatus("COMPLETED");
studentExamRepository.save(studentExam);

Map<String, Object> response = new HashMap<>();
response.put("finalScore", totalScore);
return response;
}

public List<Exam> getAvailableExams() {
return examRepository.findByIsActiveTrue();
}

public Map<String, Object> getResults(Long studentExamId) {
    StudentExam studentExam = studentExamRepository.findById(studentExamId)
    .orElseThrow(() -> new IllegalArgumentException("StudentExam not found"));

    Exam exam = studentExam.getExam(); // Might be null

    Map<String, Object> result = new HashMap<>();
    result.put("examTitle", exam != null ? exam.getTitle() : "N/A");
    result.put("description", exam != null ? exam.getDescription() : "N/A");
    result.put("score", studentExam.getScore());

    List<StudentAnswer> answers = studentAnswerRepository.findByStudentExam(studentExam);
    List<Map<String, Object>> questionDetails = new ArrayList<>();

    for (StudentAnswer answer : answers) {
    Question q = answer.getQuestion();
    Map<String, Object> qDetail = new HashMap<>();
    qDetail.put("questionId", q.getQuestionId());
    qDetail.put("questionText", q.getQuestionText());
    qDetail.put("optionA", q.getOptionA());
    qDetail.put("optionB", q.getOptionB());
    qDetail.put("optionC", q.getOptionC());
    qDetail.put("optionD", q.getOptionD());
    qDetail.put("correctOption", q.getCorrectOption());
    qDetail.put("marks", q.getMarks());
    qDetail.put("selectedOption", answer.getSelectedOption());
    qDetail.put("isCorrect", answer.getIsCorrect());
    qDetail.put("marksEarned", Boolean.TRUE.equals(answer.getIsCorrect()) ? q.getMarks() : 0);
    questionDetails.add(qDetail);
    }

    result.put("questions", questionDetails);
    return result;
    }

    public Page<StudentExam> getExamHistory(Long studentId, Pageable pageable) {
                return studentExamRepository.findByStudent_UserId(studentId, pageable);
                    }

                    public Page<Exam> getAvailableExams(int page, int size, String sortBy, String sortDir) {
                            Sort sort = sortDir.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
                                Pageable pageable = PageRequest.of(page, size, sort);
                                    return examRepository.findByIsActiveTrue(pageable);
                                    }

                    }




