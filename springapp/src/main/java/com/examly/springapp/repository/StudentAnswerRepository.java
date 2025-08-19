package com.examly.springapp.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.examly.springapp.model.StudentAnswer;
import com.examly.springapp.model.Question;
import com.examly.springapp.model.StudentExam;

@Repository
public interface StudentAnswerRepository extends JpaRepository<StudentAnswer, Long> {
    List<StudentAnswer> findByStudentExam_StudentExamId(Long studentExamId);
     StudentAnswer findByStudentExamAndQuestion(StudentExam studentExam, Question question);
     List<StudentAnswer> findByStudentExam(StudentExam studentExam);
    
     List<StudentAnswer> findByQuestion(Question question);


}
