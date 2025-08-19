package com.examly.springapp.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.*;

import com.examly.springapp.model.Exam;

@Repository
public interface ExamRepository extends JpaRepository<Exam, Long> {
List<Exam> findByCreatedBy(String createdBy);
List<Exam> findByIsActiveTrue();

Page<Exam> findByCreatedBy(String createdBy, Pageable pageable);
      Page<Exam> findByIsActiveTrue(Pageable pageable);  

}

