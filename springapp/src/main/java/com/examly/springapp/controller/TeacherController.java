package com.examly.springapp.controller;

import com.examly.springapp.model.Exam;
import com.examly.springapp.model.Question;
import com.examly.springapp.service.ExamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;
import org.springframework.data.domain.*;
import java.time.LocalDateTime;
import org.springframework.security.access.prepost.PreAuthorize;
@RestController
@RequestMapping("/api/teacher")
@PreAuthorize("@rbac.allowed('TEACHER','ADMIN')")
@RequestMapping("/api/exams")
public class TeacherController {

@Autowired
private ExamService examService;

@PostMapping
public ResponseEntity<Exam> createExam(@RequestBody Exam exam) {
Exam savedExam = examService.createExam(exam);
return ResponseEntity.status(201).body(savedExam);
}

@PostMapping("/{examId}/questions")
public ResponseEntity<Question> addQuestionToExam(@PathVariable Long examId, @RequestBody Question question) {
Question savedQuestion = examService.addQuestion(examId, question);
return ResponseEntity.status(201).body(savedQuestion);
}

@GetMapping
public ResponseEntity<List<Exam>> getExamsByTeacher(
@RequestParam String createdBy,
@RequestParam(required = false) Integer page,
@RequestParam(required = false) Integer size,
@RequestParam(required = false, defaultValue = "createdAt") String sortBy,
@RequestParam(required = false, defaultValue = "desc") String sortDir,
@RequestParam(required = false) String status
) {// Preserve original behavior when only createdBy is specified
if (page == null || size == null) {
List<Exam> exams = examService.getExamsByTeacher(createdBy);
return ResponseEntity.ok(exams);
}

Sort sort = sortDir != null && sortDir.equalsIgnoreCase("asc")
? Sort.by(sortBy).ascending()
: Sort.by(sortBy).descending();
Pageable pageable = PageRequest.of(page, size, sort);

List<Exam> exams = examService.getExamsByTeacher(createdBy, pageable);
// Optional status filter: active/inactive/upcoming/expired
if (status != null) {
LocalDateTime now = LocalDateTime.now();
exams = exams.stream().filter(e -> {
switch (status.toLowerCase()) {
case "active": return Boolean.TRUE.equals(e.getIsActive());
case "inactive": return Boolean.FALSE.equals(e.getIsActive());
case "upcoming": return e.getExpiryDate() != null && e.getExpiryDate().isAfter(now) && Boolean.TRUE.equals(e.getIsActive());
case "expired": return e.getExpiryDate() != null && e.getExpiryDate().isBefore(now);
default: return true;
}
}).toList();
}

return ResponseEntity.ok(exams);
}

@PatchMapping("/{examId}/status")
public ResponseEntity<Exam> updateExamStatus(@PathVariable Long examId, @RequestBody Map<String, Boolean> payload) {
boolean isActive = payload.getOrDefault("isActive", false);
Exam updated = examService.setExamActiveStatus(examId, isActive);
return ResponseEntity.ok(updated);
}
}
