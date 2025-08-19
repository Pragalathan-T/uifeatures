package com.examly.springapp.repository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.*;
import com.examly.springapp.model.StudentExam;
import com.examly.springapp.model.Exam;

@Repository
public interface StudentExamRepository extends JpaRepository<StudentExam, Long> {
    List<StudentExam> findByStudentUsername(String studentUsername);
        Optional<StudentExam> findByStudentUsernameAndExam_ExamId(String studentUsername, Long examId);
        List<StudentExam> findByExamAndStudentUsernameAndStatusIn(Exam exam, String studentUsername, List<String> statuses);
        

        List<StudentExam> findByExam(Exam exam);
        long countByExamAndStudentUsername(Exam exam, String studentUsername);
         Page<StudentExam> findByStudent_UserId(Long studentId, Pageable pageable);

}
