package com.examly.springapp.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.*;


@Entity
@Table(name = "users")
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "role", discriminatorType = DiscriminatorType.STRING)
@Data
@NoArgsConstructor
@AllArgsConstructor
//@Builder
public abstract class User {

@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long userId;

@NotBlank
@Column(nullable = false, length = 100)
private String name;

@Email
@Column(nullable = false, unique = true, length = 150)
private String email;

@Column(unique=true)
protected String username;

@NotBlank
@Column(nullable = false)
protected String password;

@Column(nullable = false, updatable = false, insertable = false)
private String role;

@Column(length = 20)
private String phoneNumber;

@Column(length = 300)
private String profileImageUrl; // optional profile pic

@Column(length = 300)
private String bio; // optional short description
}
