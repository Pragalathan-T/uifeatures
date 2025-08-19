package com.examly.springapp.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.examly.springapp.model.Question;
import com.examly.springapp.model.Exam;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {
    List<Question> findByExam_ExamId(Long examId);
     List<Question> findByExam(Exam exam);
}
