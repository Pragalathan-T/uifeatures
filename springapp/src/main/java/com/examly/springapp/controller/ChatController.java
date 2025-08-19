package com.examly.springapp.controller;

import com.examly.springapp.dto.ChatMessageRequestDTO;
import com.examly.springapp.dto.ChatMessageResponseDTO;
import com.examly.springapp.service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/chat")
public class ChatController {

    @Autowired
    private ChatService chatService;

    @PostMapping("/message")
    public ResponseEntity<ChatMessageResponseDTO> message(@RequestBody ChatMessageRequestDTO request) {
        ChatMessageResponseDTO response = chatService.getReply(request);
        return ResponseEntity.ok(response);
    }
}

