package com.examly.springapp.controller;

import com.examly.springapp.dto.AnswerRequestDTO;
import com.examly.springapp.dto.StudentExamDTO;
import com.examly.springapp.model.StudentExam;
import com.examly.springapp.service.StudentExamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import org.springframework.security.access.prepost.PreAuthorize;
@RestController

@RequestMapping("/api/student-exams")
@PreAuthorize("@rbac.allowed('STUDENT')")
public class StudentExamController {

  @Autowired
  private StudentExamService studentExamService;

  @PostMapping("/start")
  public ResponseEntity<Map<String, Object>> startExam(@RequestBody StudentExamDTO studentExamDTO) {
    Map<String, Object> startedExam = studentExamService.startExam(
      studentExamDTO.getExamId(),
      studentExamDTO.getStudentUsername()
    );
    return ResponseEntity.ok(startedExam);
  }

  @PostMapping("/{studentExamId}/answers")
  public ResponseEntity<String> submitAnswer(
      @PathVariable Long studentExamId,
      @RequestBody AnswerRequestDTO answerRequestDTO) {

    studentExamService.submitAnswer(
      studentExamId,
      answerRequestDTO.getQuestionId(),
      answerRequestDTO.getSelectedOption()
    );

    return ResponseEntity.ok("Answer submitted successfully");
  }

  @PostMapping("/{studentExamId}/complete")
  public ResponseEntity<String> completeExam(@PathVariable Long studentExamId) {
    studentExamService.completeExam(studentExamId);
    return ResponseEntity.ok("Exam completed successfully");
  }

  @GetMapping("/history/{studentId}")
  public ResponseEntity<Page<StudentExam>> getStudentExamHistory(
      @PathVariable Long studentId,
      @RequestParam(defaultValue = "0") int page,
      @RequestParam(defaultValue = "10") int size,
      @RequestParam(defaultValue = "startTime") String sortBy,
      @RequestParam(defaultValue = "desc") String sortDir) {

    Sort sort = sortDir.equalsIgnoreCase("desc")
        ? Sort.by(sortBy).descending()
        : Sort.by(sortBy).ascending();

    Pageable pageable = PageRequest.of(page, size, sort);
    Page<StudentExam> history = studentExamService.getExamHistory(studentId, pageable);
    return ResponseEntity.ok(history);
  }
}