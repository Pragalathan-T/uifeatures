package com.examly.springapp.service;

import com.examly.springapp.model.Student;
import com.examly.springapp.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class StudentService {

@Autowired
private StudentRepository studentRepository;

public Optional<Student> getStudentByUsername(String username) {
return studentRepository.findByUsername(username);
}

public Student saveStudent(Student student) {
return studentRepository.save(student);
}
}
