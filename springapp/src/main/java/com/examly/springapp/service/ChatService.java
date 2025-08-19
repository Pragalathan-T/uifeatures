package com.examly.springapp.service;

import com.examly.springapp.dto.ChatMessageRequestDTO;
import com.examly.springapp.dto.ChatMessageResponseDTO;
import org.springframework.stereotype.Service;

@Service
public class ChatService {
  public ChatMessageResponseDTO getReply(ChatMessageRequestDTO request) {
    String prompt = request.getMessage() == null ? "" : request.getMessage().trim();
    if (prompt.isEmpty()) {
      return new ChatMessageResponseDTO("Hi! Ask me about exams, schedules, or results.", "default");
    }
    String normalized = prompt.toLowerCase();
    String reply;
    if (normalized.contains("exam") && normalized.contains("start")) {
      reply = "To start an exam, go to Student Dashboard > Available Exams and click 'Start Exam'.";
    } else if (normalized.contains("result") || normalized.contains("score")) {
      reply = "Results are available on the Result page after you submit. Teachers can view from their dashboard.";
    } else if (normalized.contains("create") || normalized.contains("question")) {
      reply = "Teachers can create exams and add questions under the Teacher Dashboard > Create Exam.";
    } else if (normalized.contains("login") || normalized.contains("register")) {
      reply = "Use the Login/Register options on the landing page header to access your account.";
    } else {
      reply = "I can help with exams, questions, starting tests, and viewing results. What would you like to do?";
    }
    return new ChatMessageResponseDTO(reply, "rule-based");
  }
}