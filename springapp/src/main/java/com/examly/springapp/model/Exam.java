package com.examly.springapp.model;

import java.time.LocalDateTime;

import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;

import org.hibernate.annotations.CreationTimestamp;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Exam {

@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long examId;

@Column(nullable = false, length = 100)
private String title;

@Column(length = 500)
private String description;

@Column(nullable = false)
@Min(10)
@Max(180)
private Integer duration;  // in minutes

@Column(nullable = false)
private String createdBy="system";

@Column(nullable = false, updatable = false)
@CreationTimestamp
private LocalDateTime createdAt;

@Column(nullable = false)
private Boolean isActive;


@Column(length = 100)
private String topic;  // e.g., Java, DBMS

@Column(length = 20)
private String difficulty; // EASY, MEDIUM, HARD

private LocalDateTime expiryDate;

private Integer timeLimit; // alternate time constraint per question or exam

private Integer maxAttempts;

private String feedback; // feedback after submission

private String imageUrl; // optional banner or icon for exam

 public Boolean getIsActive() {
        return isActive;
    }

    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
    }

}
