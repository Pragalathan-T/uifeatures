package com.examly.springapp.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.Pattern;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
public class StudentExam {

@Id
@GeneratedValue(strategy=GenerationType.IDENTITY)
private long studentExamId;

@ManyToOne
@JoinColumn(name="exam_id",nullable=false)
private  Exam exam;

@Column(nullable=false)
private String studentUsername;

@Column(nullable=false)
private LocalDateTime startTime;

@Column(nullable=false)
private LocalDateTime endTime;


private Integer score;

@Column(nullable=false)
@Pattern(regexp = "NOT_STARTED|IN_PROGRESS|COMPLETED",message="Invalid status")

private String status;

@ManyToOne
@JoinColumn(name = "student_id")
private Student student;

}



