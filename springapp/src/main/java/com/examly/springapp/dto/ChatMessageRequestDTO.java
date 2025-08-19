package com.examly.springapp.dto;

public class ChatMessageRequestDTO {
  private String message;
  private String userId;
  private String context;

  public ChatMessageRequestDTO() {}

  public String getMessage() { return message; }
  public void setMessage(String message) { this.message = message; }

  public String getUserId() { return userId; }
  public void setUserId(String userId) { this.userId = userId; }

  public String getContext() { return context; }
  public void setContext(String context) { this.context = context; }
}