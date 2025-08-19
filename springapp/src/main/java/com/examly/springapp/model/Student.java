package com.examly.springapp.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@DiscriminatorValue("STUDENT")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Student extends User {

@Column(length = 100)
private String course;

@Column(length = 100)
private String institution;

private Integer yearOfStudy;

private String enrollmentNumber;

@OneToMany(mappedBy = "student", cascade = CascadeType.ALL)
private List<StudentExam> examsTaken;



}
