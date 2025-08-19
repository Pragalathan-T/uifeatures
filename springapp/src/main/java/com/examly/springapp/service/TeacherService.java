package com.examly.springapp.service;

import com.examly.springapp.model.Teacher;
import com.examly.springapp.repository.TeacherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class TeacherService {

@Autowired
private TeacherRepository teacherRepository;

public Optional<Teacher> getTeacherByUsername(String username) {
return teacherRepository.findByUsername(username);
}

public Teacher saveTeacher(Teacher teacher) {
return teacherRepository.save(teacher);
}
}
