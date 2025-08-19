package com.examly.springapp.service;

import com.examly.springapp.dto.AuthRequestDTO;
import com.examly.springapp.dto.AuthResponseDTO;
import com.examly.springapp.dto.RegisterRequestDTO;
import com.examly.springapp.model.Admin;
import com.examly.springapp.model.Student;
import com.examly.springapp.model.Teacher;
import com.examly.springapp.model.User;
import com.examly.springapp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import com.examly.springapp.config.JwtService;

import java.util.Map;

@Service
public class AuthServiceImpl implements AuthService, UserDetailsService {

  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;

  @Lazy
  @Autowired
  private AuthenticationManager authenticationManager;

  private final JwtService jwtService;

  public AuthServiceImpl(UserRepository userRepository, @Lazy PasswordEncoder passwordEncoder, JwtService jwtService) {
    this.userRepository = userRepository;
    this.passwordEncoder = passwordEncoder;
    this.jwtService = jwtService;
  }

  @Override
  public AuthResponseDTO login(AuthRequestDTO request) {
    try {
      Authentication auth = authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
      );

      User user = userRepository.findByUsername(request.getUsername())
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid username or password"));

      SecurityContextHolder.getContext().setAuthentication(auth);

      String token = jwtService.generateToken(user.getUsername(), user.getRole(), Map.of());
      return new AuthResponseDTO(token, user.getUsername(), user.getRole());
    } catch (org.springframework.security.core.AuthenticationException ex) {
      throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid username or password");
    }
  }

  @Override
  public void register(RegisterRequestDTO request) {
    if (userRepository.existsByUsername(request.getUsername())) {
      throw new ResponseStatusException(HttpStatus.CONFLICT, "Username already in use");
    }
    if (userRepository.existsByEmail(request.getEmail())) {
      throw new ResponseStatusException(HttpStatus.CONFLICT, "Email already in use");
    }

    try {
      User newUser;
      String roleUpper = request.getRole() == null ? "STUDENT" : request.getRole().toUpperCase();
      switch (roleUpper) {
        case "TEACHER": newUser = new Teacher(); break;
        case "ADMIN": newUser = new Admin(); break;
        case "STUDENT": newUser = new Student(); break;
        default: throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid role");
      }

      newUser.setName(request.getName());
      newUser.setEmail(request.getEmail());
      newUser.setUsername(request.getUsername());
      newUser.setPassword(passwordEncoder.encode(request.getPassword()));
      newUser.setRole(roleUpper);

      userRepository.save(newUser);
    } catch (DataIntegrityViolationException ex) {
      throw new ResponseStatusException(HttpStatus.CONFLICT, "Email or Username already exists");
    } catch (ResponseStatusException ex) {
      throw ex;
    } catch (Exception ex) {
      throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Registration failed");
    }
  }

  @Override
  public void logout() {
    SecurityContextHolder.clearContext();
  }

  @Override
  public AuthResponseDTO refresh(String username) {
    User user = userRepository.findByUsername(username)
      .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
    String token = jwtService.generateToken(user.getUsername(), user.getRole(), Map.of("refresh", true));
    return new AuthResponseDTO(token, user.getUsername(), user.getRole());
  }

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    User user = userRepository.findByUsername(username)
      .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    String role = user.getRole() == null ? "STUDENT" : user.getRole();
    return org.springframework.security.core.userdetails.User
      .withUsername(user.getUsername())
      .password(user.getPassword())
      .roles(role)
      .build();
  }
}