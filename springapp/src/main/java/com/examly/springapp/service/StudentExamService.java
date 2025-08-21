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
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class StudentExamService {

  private static final Logger log = LoggerFactory.getLogger(StudentExamService.class);

  @Autowired private StudentExamRepository studentExamRepository;
  @Autowired private ExamRepository examRepository;
  @Autowired private QuestionRepository questionRepository;
  @Autowired private StudentAnswerRepository studentAnswerRepository;

  public Map<String, Object> startExam(Long examId, String studentUsername) {
    Exam exam = examRepository.findById(examId)
      .orElseThrow(() -> new IllegalArgumentException("Exam not found"));

    if (!Boolean.TRUE.equals(exam.getIsActive())) {
      throw new IllegalArgumentException("Exam not active");
    }
    if (exam.getExpiryDate() != null && LocalDateTime.now().isAfter(exam.getExpiryDate())) {
      throw new IllegalArgumentException("Exam expired");
    }

    List<StudentExam> existing = studentExamRepository.findByExamAndStudentUsernameAndStatusIn(
      exam, studentUsername, List.of("IN_PROGRESS", "COMPLETED")
    );

    boolean hasAttempt = existing != null && !existing.isEmpty();
    if (hasAttempt) {
      throw new IllegalArgumentException("Student already has an active attempt for this exam");
    }

    Integer maxAttempts = exam.getMaxAttempts();
    if (maxAttempts != null && maxAttempts > 0) {
      long completed = existing.stream().filter(se -> "COMPLETED".equals(se.getStatus())).count();
      if (completed >= maxAttempts) {
        throw new IllegalArgumentException("Maximum attempts reached for this exam");
      }
    }

    StudentExam studentExam = new StudentExam();
    studentExam.setExam(exam);
    studentExam.setStudentUsername(studentUsername);
    studentExam.setStartTime(LocalDateTime.now());
    studentExam.setEndTime(studentExam.getStartTime()); // placeholder if non-nullable
    studentExam.setStatus("IN_PROGRESS");
    studentExam = studentExamRepository.save(studentExam);

    log.info("Exam start: student={} examId={} studentExamId={} at={}", studentUsername, examId, studentExam.getStudentExamId(), studentExam.getStartTime());

    Map<String, Object> response = new HashMap<>();
    response.put("studentExamId", studentExam.getStudentExamId());
    return response;
  }

  public StudentAnswer submitAnswer(Long studentExamId, Long questionId, String selectedOption) {
    StudentExam studentExam = studentExamRepository.findById(studentExamId)
      .orElseThrow(() -> new IllegalArgumentException("StudentExam not found"));

    if (!"IN_PROGRESS".equals(studentExam.getStatus())) {
      throw new IllegalArgumentException("Exam is not in progress");
    }

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

    StudentAnswer saved = studentAnswerRepository.save(answer);
    log.info("Answer submit: studentExamId={} questionId={} selected={} correct={}", studentExamId, questionId, selectedOption, isCorrect);
    return saved;
  }

  public Map<String, Object> completeExam(Long studentExamId) {
    StudentExam studentExam = studentExamRepository.findById(studentExamId)
      .orElseThrow(() -> new IllegalArgumentException("StudentExam not found"));

    if ("COMPLETED".equals(studentExam.getStatus())) {
      Map<String, Object> response = new HashMap<>();
      response.put("finalScore", studentExam.getScore() == null ? 0 : studentExam.getScore());
      return response;
    }

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

    log.info("Exam complete: studentExamId={} finalScore={} at={}", studentExamId, totalScore, studentExam.getEndTime());

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

    Exam exam = studentExam.getExam();

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
