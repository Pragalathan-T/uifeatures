package com.examly.springapp.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public class RegisterRequestDTO {
@NotBlank private String name;
@Email @NotBlank private String email;
@NotBlank private String username;
@NotBlank private String password;
@NotBlank private String role; // STUDENT/TEACHER/ADMIN

public String getName() { return name; }
public void setName(String name) { this.name = name; }
public String getEmail() { return email; }
public void setEmail(String email) { this.email = email; }
public String getUsername() { return username; }
public void setUsername(String username) { this.username = username; }
public String getPassword() { return password; }
public void setPassword(String password) { this.password = password; }
public String getRole() { return role; }
public void setRole(String role) { this.role = role; }
}