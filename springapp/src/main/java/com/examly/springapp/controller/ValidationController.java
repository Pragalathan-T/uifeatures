package com.examly.springapp.controller;

import com.examly.springapp.model.Exam;
import com.examly.springapp.model.Question;
import com.examly.springapp.model.StudentAnswer;
import com.examly.springapp.service.ValidationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/validation")
public class ValidationController {

@Autowired
private ValidationService validationService;

@PostMapping("/exam")
public ResponseEntity<String> validateExam(@RequestBody Exam exam) {
return validationService.validateExam(exam)
? ResponseEntity.ok("Valid Exam")
: ResponseEntity.badRequest().body("Invalid Exam");
}

@PostMapping("/question")
public ResponseEntity<String> validateQuestion(@RequestBody Question question) {
return validationService.validateQuestion(question)
? ResponseEntity.ok("Valid Question")
: ResponseEntity.badRequest().body("Invalid Question");
}

@PostMapping("/studentAnswer")
public ResponseEntity<String> validateStudentAnswer(@RequestBody StudentAnswer answer) {
return validationService.validateStudentAnswer(answer)
? ResponseEntity.ok("Valid Answer")
: ResponseEntity.badRequest().body("Invalid Answer");
}
}
