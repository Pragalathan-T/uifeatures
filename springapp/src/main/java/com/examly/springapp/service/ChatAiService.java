package com.examly.springapp.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.time.Duration;
import java.util.concurrent.CompletableFuture;

@Service
public class ChatAiService {

  @Value("${OPENAI_API_KEY:}")
  private String openAiApiKey;

  @Value("${OPENAI_MODEL:gpt-3.5-turbo}")
  private String openAiModel;

  public boolean isOpenAiConfigured() {
    return openAiApiKey != null && !openAiApiKey.isBlank();
  }

  public String getAiReply(String message) throws IOException, InterruptedException {
    if (!isOpenAiConfigured()) {
      return null;
    }
    String body = "{\n" +
      "  \"model\": \"" + openAiModel + "\",\n" +
      "  \"messages\": [{\"role\":\"user\",\"content\": " + jsonString(message) + "}]\n" +
      "}";

    HttpRequest request = HttpRequest.newBuilder()
      .uri(URI.create("https://api.openai.com/v1/chat/completions"))
      .timeout(Duration.ofSeconds(60))
      .header("Authorization", "Bearer " + openAiApiKey)
      .header("Content-Type", "application/json")
      .POST(HttpRequest.BodyPublishers.ofString(body))
      .build();

    HttpClient client = HttpClient.newHttpClient();
    HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
    if (response.statusCode() >= 200 && response.statusCode() < 300) {
      String json = response.body();
      int i = json.indexOf("\"content\":");
      if (i >= 0) {
        int start = json.indexOf('"', i + 10);
        int end = json.indexOf('"', start + 1);
        if (start > 0 && end > start) {
          return json.substring(start + 1, end).replace("\\n", "\n");
        }
      }
    }
    return null;
  }

  public SseEmitter streamAiReply(String message) {
    SseEmitter emitter = new SseEmitter(0L);
    if (!isOpenAiConfigured()) {
      CompletableFuture.runAsync(() -> {
        try {
          String fallback = "I am not configured with an AI provider. Please set OPENAI_API_KEY.";
          for (String token : fallback.split(" ")) {
            emitter.send(token + " ", MediaType.TEXT_PLAIN);
            Thread.sleep(30);
          }
          emitter.complete();
        } catch (Exception e) {
          emitter.completeWithError(e);
        }
      });
      return emitter;
    }

    CompletableFuture.runAsync(() -> {
      try {
        String body = "{\n" +
          "  \"model\": \"" + openAiModel + "\",\n" +
          "  \"stream\": true,\n" +
          "  \"messages\": [{\"role\":\"user\",\"content\": " + jsonString(message) + "}]\n" +
          "}";

        HttpRequest request = HttpRequest.newBuilder()
          .uri(URI.create("https://api.openai.com/v1/chat/completions"))
          .timeout(Duration.ofSeconds(60))
          .header("Authorization", "Bearer " + openAiApiKey)
          .header("Content-Type", "application/json")
          .POST(HttpRequest.BodyPublishers.ofString(body))
          .build();

        HttpClient client = HttpClient.newHttpClient();
        HttpResponse<InputStream> response = client.send(request, HttpResponse.BodyHandlers.ofInputStream());
        try (BufferedReader reader = new BufferedReader(new InputStreamReader(response.body(), StandardCharsets.UTF_8))) {
          String line;
          while ((line = reader.readLine()) != null) {
            if (!line.startsWith("data:")) continue;
            String data = line.substring(5).trim();
            if (data.equals("[DONE]")) break;
            int di = data.indexOf("\"delta\"");
            if (di >= 0) {
              int ci = data.indexOf("\"content\":");
              if (ci > 0) {
                int start = data.indexOf('"', ci + 10);
                int end = data.indexOf('"', start + 1);
                if (start > 0 && end > start) {
                  String token = data.substring(start + 1, end).replace("\\n", "\n");
                  if (!token.isEmpty()) {
                    emitter.send(token, MediaType.TEXT_PLAIN);
                  }
                }
              }
            }
          }
        }
        emitter.complete();
      } catch (Exception e) {
        emitter.completeWithError(e);
      }
    });
    return emitter;
  }

  private String jsonString(String s) {
    if (s == null) return "\"\"";
    String escaped = s.replace("\\", "\\\\").replace("\"", "\\\"").replace("\n", "\\n");
    return "\"" + escaped + "\"";
  }
}