package com.examly.springapp.service;

import com.examly.springapp.dto.AuthRequestDTO;
import com.examly.springapp.dto.AuthResponseDTO;
import com.examly.springapp.dto.RegisterRequestDTO;

public interface AuthService {
  AuthResponseDTO login(AuthRequestDTO request);
  void register(RegisterRequestDTO request);
  void logout();
  AuthResponseDTO refresh(String username);
}