package com.examly.springapp.controller;

import com.examly.springapp.model.StudentAnswer;
import com.examly.springapp.service.StudentExamService;
import com.examly.springapp.model.Exam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/student/exams")
public class StudentController {

@Autowired
private StudentExamService studentExamService;

@GetMapping
public ResponseEntity<List<Exam>> getAvailableExams() {
List<Exam> activeExams = studentExamService.getAvailableExams();
return ResponseEntity.ok(activeExams);
} 

@PostMapping("/{examId}/start")
public ResponseEntity<?> startExam(@PathVariable Long examId, @RequestBody Map<String, String> request) {
try {
String studentUsername = request.get("studentUsername");
Map<String, Object> response = studentExamService.startExam(examId, studentUsername);
return ResponseEntity.status(201).body(response); // 201 CREATED
}
catch (IllegalArgumentException ex) {
return ResponseEntity.badRequest().body(Map.of("error", ex.getMessage()));
}
}

@PostMapping("/{studentExamId}/answers")
public ResponseEntity<?> submitAnswer(@PathVariable Long studentExamId, @RequestBody Map<String, Object> req) {
try {
Long questionId = Long.valueOf(req.get("questionId").toString());
String selectedOption = req.get("selectedOption").toString();
StudentAnswer answer = studentExamService.submitAnswer(studentExamId, questionId, selectedOption);
return ResponseEntity.status(201).body(answer); // 201 CREATED
} 
catch (IllegalArgumentException ex) {
return ResponseEntity.badRequest().body(Map.of("error", ex.getMessage()));
}
}

@PostMapping("/{studentExamId}/complete")
public ResponseEntity<?> completeExam(@PathVariable Long studentExamId) {
try { 
Map<String, Object> response = studentExamService.completeExam(studentExamId);
return ResponseEntity.ok(response); // 200 OK
} 
catch (IllegalArgumentException ex) {
return ResponseEntity.status(404).body(Map.of("error", ex.getMessage()));
}
}

@GetMapping("/{studentExamId}/results")
public ResponseEntity<?> getResults(@PathVariable Long studentExamId) {
    try {
    Map<String, Object> response = studentExamService.getResults(studentExamId);
    return ResponseEntity.ok(response); // 200 OK
    } 
    catch (IllegalArgumentException ex) {
    return ResponseEntity.status(404).body(Map.of("error", ex.getMessage()));
    }
    } 

    }
