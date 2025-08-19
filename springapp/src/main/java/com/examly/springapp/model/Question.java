package com.examly.springapp.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;

import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Question {

@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private long questionId;

@ManyToOne(fetch = FetchType.LAZY)
@JoinColumn(name = "examId", nullable = false)
private Exam exam;

@Column(nullable = false, length = 500)
private String questionText;

@Column(nullable = false, length = 200)
private String optionA;

@Column(nullable = false, length = 200)
private String optionB;

@Column(nullable = false, length = 200)
private String optionC;

@Column(nullable = false, length = 200)
private String optionD;

@Column(nullable = false, length = 1)
@Pattern(regexp = "[ABCD]", message = "Correct option must be one of A, B, C, or D")
private String correctOption;

@Min(1)
@Max(10)
@Column(nullable = false)
private Integer marks;


@Column(length = 100)
private String topic; // e.g., Arrays, DBMS

@Column(length = 20)
private String difficulty; // EASY, MEDIUM, HARD

@Column(length = 1000)
private String explanation; // optional feedback/explanation

private Integer timeLimit; // seconds to answer this question

private String imageUrl; // question image (if any)

private String correctAnswer;

}
