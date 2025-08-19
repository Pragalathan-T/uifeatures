package com.examly.springapp.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@DiscriminatorValue("TEACHER")
//@Data
@NoArgsConstructor
@AllArgsConstructor
public class Teacher extends User {

@Column(length = 100)
private String department;

@Column(length = 100)
private String specialization;

@OneToMany(mappedBy = "createdBy", cascade = CascadeType.ALL)
private List<Exam> exams;  // exams created by this teacher
}
