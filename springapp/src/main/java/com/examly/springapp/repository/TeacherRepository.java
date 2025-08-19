package com.examly.springapp.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.examly.springapp.model.Teacher;

@Repository
public interface TeacherRepository extends JpaRepository<Teacher, Long> {
Optional<Teacher> findByUsername(String username);
boolean existsByUsername(String username);
}
