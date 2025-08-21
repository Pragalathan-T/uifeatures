package com.examly.springapp.service;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@Service
public class RagService {
  private final KnowledgeBaseService kb;

  public RagService(KnowledgeBaseService kb) {
    this.kb = kb;
  }

  // Minimal retrieval (no vector DB): rank by longest common subsequence length as a proxy for relevance
  public List<KnowledgeBaseService.Doc> retrieve(String mode, String query, int k) {
    List<KnowledgeBaseService.Doc> docs = kb.getDocsByMode(mode);
    List<Scored> scored = new ArrayList<>();
    for (KnowledgeBaseService.Doc d : docs) {
      int score = lcsLength(normalize(query), normalize(d.content));
      scored.add(new Scored(d, score));
    }
    scored.sort(Comparator.comparingInt((Scored s) -> s.score).reversed());
    List<KnowledgeBaseService.Doc> top = new ArrayList<>();
    for (int i = 0; i < Math.min(k, scored.size()); i++) top.add(scored.get(i).doc);
    return top;
  }

  private String normalize(String s) {
    return s == null ? "" : s.toLowerCase();
  }

  private static class Scored { KnowledgeBaseService.Doc doc; int score; Scored(KnowledgeBaseService.Doc d, int s){doc=d;score=s;} }

  private int lcsLength(String a, String b) {
    int n = Math.min(a.length(), 1024);
    int m = Math.min(b.length(), 4096);
    int[][] dp = new int[2][m + 1];
    for (int i = 1; i <= n; i++) {
      int cur = i & 1, prev = cur ^ 1;
      char ca = a.charAt(i - 1);
      for (int j = 1; j <= m; j++) {
        if (ca == b.charAt(j - 1)) dp[cur][j] = dp[prev][j - 1] + 1; else dp[cur][j] = Math.max(dp[prev][j], dp[cur][j - 1]);
      }
    }
    return dp[n & 1][m];
  }
}