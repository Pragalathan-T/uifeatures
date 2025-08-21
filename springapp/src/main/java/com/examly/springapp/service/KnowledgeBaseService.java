package com.examly.springapp.service;

import jakarta.annotation.PostConstruct;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class KnowledgeBaseService {

  public static class Doc {
    public final String id;
    public final String mode; // "portal" or "study"
    public final String content;
    public Doc(String id, String mode, String content) {
      this.id = id; this.mode = mode; this.content = content;
    }
  }

  private final List<Doc> docs = new ArrayList<>();

  @PostConstruct
  public void load() throws IOException {
    PathMatchingResourcePatternResolver resolver = new PathMatchingResourcePatternResolver();
    loadDir(resolver, "portal", "classpath*:kb/portal/*.md");
    loadDir(resolver, "study", "classpath*:kb/study/*.md");
  }

  private void loadDir(PathMatchingResourcePatternResolver resolver, String mode, String pattern) throws IOException {
    Resource[] resources = resolver.getResources(pattern);
    for (Resource r : resources) {
      try (BufferedReader br = new BufferedReader(new InputStreamReader(r.getInputStream(), StandardCharsets.UTF_8))) {
        String text = br.lines().collect(Collectors.joining("\n"));
        String id = r.getFilename();
        docs.add(new Doc(id, mode, text));
      }
    }
  }

  public List<Doc> getDocsByMode(String mode) {
    if (mode == null || mode.isBlank()) return Collections.emptyList();
    String m = mode.toLowerCase();
    return docs.stream().filter(d -> d.mode.equals(m)).collect(Collectors.toList());
  }
}