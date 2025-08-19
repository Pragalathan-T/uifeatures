// package com.examly.springapp.controller;

// import com.examly.springapp.dto.QuestionDTO;
// import com.examly.springapp.model.Question;
// import com.examly.springapp.service.QuestionService;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.data.domain.Page;
// import org.springframework.data.domain.PageRequest;
// import org.springframework.data.domain.Pageable;
// import org.springframework.data.domain.Sort;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.*;

// import java.util.List;

// @RestController
// @RequestMapping("/api/questions")
// public class QuestionController {

// @Autowired
// private QuestionService questionService;

// @PostMapping
// public ResponseEntity<Question> addQuestion(@RequestBody QuestionDTO questionDTO) {
// Question saved = questionService.addQuestion(questionDTO);
// return ResponseEntity.ok(saved);
// }

// @GetMapping
// public ResponseEntity<Page<Question>> getAllQuestions(
// @RequestParam(defaultValue = "0") int page,
// @RequestParam(defaultValue = "10") int size,
// @RequestParam(defaultValue = "id") String sortBy,
// @RequestParam(defaultValue = "asc") String sortDir) {

// Sort sort = sortDir.equalsIgnoreCase("desc")
// ? Sort.by(sortBy).descending()
// : Sort.by(sortBy).ascending();

// Pageable pageable = PageRequest.of(page, size, sort);
// Page<Question> result = questionService.getAllQuestions(pageable);
// return ResponseEntity.ok(result);
// }

// @GetMapping("/{id}")
// public ResponseEntity<Question> getQuestionById(@PathVariable Long id) {
// Question question = questionService.getQuestionById(id);
// return ResponseEntity.ok(question);
// }

// @DeleteMapping("/{id}")
// public ResponseEntity<String> deleteQuestion(@PathVariable Long id) {
// questionService.deleteQuestion(id);
// return ResponseEntity.ok("Question deleted successfully");
// }
// }


                                
package com.examly.springapp.controller;

import com.examly.springapp.dto.QuestionDTO;
import com.examly.springapp.model.Question;
import com.examly.springapp.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/questions")
public class QuestionController {

@Autowired
private QuestionService questionService;

@PostMapping
public ResponseEntity<Question> addQuestion(@RequestBody QuestionDTO questionDTO) {
Question saved = questionService.addQuestion(questionDTO);
return ResponseEntity.ok(saved);
}

@GetMapping
public ResponseEntity<Page<Question>> getAllQuestions(
@RequestParam(defaultValue = "0") int page,
@RequestParam(defaultValue = "10") int size,
@RequestParam(defaultValue = "id") String sortBy,
@RequestParam(defaultValue = "asc") String sortDir) {

Sort sort = sortDir.equalsIgnoreCase("desc")
? Sort.by(sortBy).descending()
: Sort.by(sortBy).ascending();

Pageable pageable = PageRequest.of(page, size, sort);
Page<Question> result = questionService.getAllQuestions(pageable);
return ResponseEntity.ok(result);
}

@GetMapping("/{id}")
public ResponseEntity<Question> getQuestionById(@PathVariable Long id) {
Question question = questionService.getQuestionById(id);
return ResponseEntity.ok(question);
}

// NEW: fetch questions for a given exam (used by student to take the exam)
@GetMapping("/by-exam/{examId}")
public ResponseEntity<List<Question>> getQuestionsByExam(@PathVariable Long examId) {
List<Question> questions = questionService.getQuestionsByExamId(examId);
return ResponseEntity.ok(questions);
}

@DeleteMapping("/{id}")
public ResponseEntity<String> deleteQuestion(@PathVariable Long id) {
questionService.deleteQuestion(id);
return ResponseEntity.ok("Question deleted successfully");
}
}