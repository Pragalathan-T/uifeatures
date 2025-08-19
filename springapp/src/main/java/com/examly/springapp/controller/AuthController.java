
package com.examly.springapp.controller;

import com.examly.springapp.dto.AuthRequestDTO;
import com.examly.springapp.dto.AuthResponseDTO;
import com.examly.springapp.dto.RegisterRequestDTO;
import com.examly.springapp.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

@CrossOrigin(
    origins = "https://8081-aeadacfbdbdedbdbcdacedeffadbcfbbaaddea.premiumproject.examly.io",
    allowCredentials = "true"
    )

@RestController
@RequestMapping("/api/auth")
public class AuthController {

@Autowired
private AuthService authService;

@PostMapping("/login")
public ResponseEntity<AuthResponseDTO> login(@RequestBody AuthRequestDTO loginRequest) {
AuthResponseDTO response = authService.login(loginRequest);
return ResponseEntity.ok(response);
}

@PostMapping("/register")
public ResponseEntity<String> register(@Valid @RequestBody RegisterRequestDTO registerRequest) {
authService.register(registerRequest);
return ResponseEntity.status(HttpStatus.CREATED).body("User registered successfully");
}

@PostMapping("/logout")
public ResponseEntity<String> logout() {
authService.logout();
return ResponseEntity.ok("Logged out successfully");
}
}