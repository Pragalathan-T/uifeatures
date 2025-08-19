package com.examly.springapp.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Pattern;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StudentAnswer {

@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private long answerId;

@ManyToOne(fetch = FetchType.LAZY)
@JoinColumn(name = "student_exam_id", nullable = false)
private StudentExam studentExam;

@ManyToOne(fetch = FetchType.LAZY)
@JoinColumn(name = "question_id", nullable = false)
private Question question;

@Column(nullable = false, length = 1)
@Pattern(regexp = "[ABCD]", message = "Selected option must be one of A, B, C, or D")
private String selectedOption;

@Column(nullable = false)
private Boolean isCorrect;


private LocalDateTime answerTime; // timestamp of when the answer was submitted

private String feedback; // optional feedback per question if enabled

private Integer attemptNumber; // useful if exam allows retries

private String answerText;
}
