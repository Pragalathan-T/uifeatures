 package com.examly.springapp.exception;

 import org.springframework.dao.DataIntegrityViolationException;
 import org.springframework.http.*;
 import org.springframework.web.bind.annotation.*;

 import java.util.Map;

 @ControllerAdvice
 public class GlobalExceptionHandler {
    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<Map<String,String>> handleConstraint(DataIntegrityViolationException ex) {
    return ResponseEntity.status(HttpStatus.CONFLICT).body(Map.of("message","Email or Username already exists"));
    }
    }
 