package com.examly.springapp.controller;

import com.examly.springapp.dto.ChatMessageRequestDTO;
import com.examly.springapp.dto.ChatMessageResponseDTO;
import com.examly.springapp.service.ChatService;
import com.examly.springapp.service.ChatAiService;
import com.examly.springapp.service.RagService;
import com.examly.springapp.service.KnowledgeBaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;
@RestController
@RequestMapping("/api/chat")
public class ChatController {

  @Autowired
  private ChatService chatService;

  @Autowired
  private ChatAiService chatAiService;

  @Autowired
  private RagService ragService;

  @PostMapping("/message")
  public ResponseEntity<ChatMessageResponseDTO> message(@RequestBody ChatMessageRequestDTO request) {
    ChatMessageResponseDTO response;
    try {
      String ai = chatAiService.getAiReply(request.getMessage());
      if (ai != null && !ai.isBlank()) {
        response = new ChatMessageResponseDTO(ai, "openai");
      } else {
        response = chatService.getReply(request);
      }
    } catch (Exception e) {
      response = chatService.getReply(request);
    }
    return ResponseEntity.ok(response);
  }

  @GetMapping("/stream")
  public SseEmitter stream(@RequestParam String message,
                           @RequestParam(required = false) String userId,
                           @RequestParam(required = false, defaultValue = "portal") String mode) {
    // Retrieve top-k docs and prepend to user message as context
    StringBuilder withContext = new StringBuilder();
    ragService.retrieve(mode, message, 3).forEach(doc -> {
      withContext.append("\nSOURCE[" + doc.id + "]: \n").append(doc.content).append("\n");
    });
    withContext.append("\nUSER:\n").append(message).append("\nPlease answer concisely and cite SOURCE ids when relevant.");
    return chatAiService.streamAiReply(withContext.toString());
  }
}