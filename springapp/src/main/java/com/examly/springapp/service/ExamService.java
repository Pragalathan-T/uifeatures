package com.examly.springapp.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import org.springframework.data.domain.*;

import com.examly.springapp.model.Exam;
import com.examly.springapp.model.Question;
import com.examly.springapp.repository.ExamRepository;
import com.examly.springapp.repository.QuestionRepository;

@Service
public class ExamService {

@Autowired
private ExamRepository examRepository;

@Autowired
private QuestionRepository questionRepository;

public List<Exam> getExamsByTeacher(String teacherUsername) {
return examRepository.findByCreatedBy(teacherUsername);
}

public Exam createExam(Exam examData) {
examData.setCreatedAt(LocalDateTime.now());

if (examData.getIsActive() == null) {
examData.setIsActive(false);
}

if (examData.getDuration() < 10 || examData.getDuration() > 180)
throw new IllegalArgumentException("Duration must be between 10 and 180 minutes..");

return examRepository.save(examData);
}

public Question addQuestion(Long examId, Question question) {
Exam exam = examRepository.findById(examId)
.orElseThrow(() -> new IllegalArgumentException("Exam not found"));

question.setExam(exam);

return questionRepository.save(question);
}

public Exam setExamActiveStatus(Long examId, boolean active) {
Exam exam = examRepository.findById(examId)
.orElseThrow(() -> new IllegalArgumentException("Exam not found"));

exam.setIsActive(active);

return examRepository.save(exam);
}



// New methods added safely below

public List<Exam> getAllExams() {
return examRepository.findAll();
}

public Optional<Exam> getExamById(Long examId) {
return examRepository.findById(examId);
}

public Exam updateExam(Long examId, Exam updatedData) {
Exam exam = examRepository.findById(examId)
.orElseThrow(() -> new IllegalArgumentException("Exam not found"));

if (updatedData.getTitle() != null)
exam.setTitle(updatedData.getTitle());

if (updatedData.getDescription() != null)
exam.setDescription(updatedData.getDescription());

if (updatedData.getDuration() != null) {
if (updatedData.getDuration() < 10 || updatedData.getDuration() > 180)
throw new IllegalArgumentException("Duration must be between 10 and 180 minutes..");
exam.setDuration(updatedData.getDuration());
}

if (updatedData.getIsActive() != null)
exam.setIsActive(updatedData.getIsActive());
// Add other fields if needed similarly

return examRepository.save(exam);
}

public void deleteExam(Long examId) {
if (!examRepository.existsById(examId)) {
throw new IllegalArgumentException("Exam not found");
}
examRepository.deleteById(examId);
}
public List<Exam> getExamsByTeacher(String username, Pageable pageable) {
        return examRepository.findByCreatedBy(username, pageable).getContent();
        }
}

