package com.examly.springapp.controller;

import com.examly.springapp.dto.ExamDTO;
import com.examly.springapp.model.Exam;
import com.examly.springapp.service.ExamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.access.prepost.PreAuthorize;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/exams")
@PreAuthorize("@rbac.allowed('TEACHER','ADMIN')")
@RequestMapping("/api/exam-management")
public class ExamController {

@Autowired
private ExamService examService;

@PostMapping
public ResponseEntity<ExamDTO> createExam(@RequestBody ExamDTO examDTO) {
Exam exam = new Exam();
exam.setTitle(examDTO.getTitle());
exam.setDescription(examDTO.getDescription());
exam.setDuration(examDTO.getDuration());
exam.setCreatedBy(examDTO.getCreatedBy());
exam.setIsActive(examDTO.getIsActive());
exam.setTopic(examDTO.getTopic());
exam.setDifficulty(examDTO.getDifficulty());
exam.setExpiryDate(examDTO.getExpiryDate());
exam.setTimeLimit(examDTO.getTimeLimit());
exam.setMaxAttempts(examDTO.getMaxAttempts());
exam.setFeedback(examDTO.getFeedback());
exam.setImageUrl(examDTO.getImageUrl());

Exam savedExam = examService.createExam(exam);

ExamDTO responseDTO = ExamDTO.builder()
.examId(savedExam.getExamId())
.title(savedExam.getTitle())
.description(savedExam.getDescription())
.duration(savedExam.getDuration())
.createdBy(savedExam.getCreatedBy())
.createdAt(savedExam.getCreatedAt())
.isActive(savedExam.getIsActive())
.topic(savedExam.getTopic())
.difficulty(savedExam.getDifficulty())
.expiryDate(savedExam.getExpiryDate())
.timeLimit(savedExam.getTimeLimit())
.maxAttempts(savedExam.getMaxAttempts())
.feedback(savedExam.getFeedback())
.imageUrl(savedExam.getImageUrl())
.build();

return ResponseEntity.ok(responseDTO);
}

@GetMapping("/teacher/{username}")
public ResponseEntity<List<ExamDTO>> getExamsByTeacher(
@PathVariable String username,
@RequestParam(required = false) Integer page,
@RequestParam(required = false) Integer size,
@RequestParam(required = false, defaultValue = "title") String sortBy) {

List<Exam> exams;

if (page != null && size != null) {
Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy));
exams = examService.getExamsByTeacher(username, pageable);
} else {
exams = examService.getExamsByTeacher(username);
}

List<ExamDTO> examDTOs = exams.stream()
.map(e -> ExamDTO.builder()
.examId(e.getExamId())
.title(e.getTitle())
.description(e.getDescription())
.duration(e.getDuration())
.createdBy(e.getCreatedBy())
.createdAt(e.getCreatedAt())
.isActive(e.getIsActive())
.topic(e.getTopic())
.difficulty(e.getDifficulty())
.expiryDate(e.getExpiryDate())
.timeLimit(e.getTimeLimit())
.maxAttempts(e.getMaxAttempts())
.feedback(e.getFeedback())
.imageUrl(e.getImageUrl())
.build())
.collect(Collectors.toList());

return ResponseEntity.ok(examDTOs);
}

@PatchMapping("/{examId}/status")
public ResponseEntity<String> updateExamStatus(@PathVariable Long examId, @RequestBody ExamDTO dto) {
examService.setExamActiveStatus(examId, dto.getIsActive());
return ResponseEntity.ok("Exam status updated successfully");
}
}