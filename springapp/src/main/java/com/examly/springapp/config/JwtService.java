package com.examly.springapp.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;
import java.util.Map;

@Component
public class JwtService {
  @Value("${security.jwt.secret:ZmFrZV9zZWNyZXRfZm9yX3Rlc3RzX29ubHk=}")
  private String secret;

  @Value("${security.jwt.expiration-ms:3600000}")
  private long expirationMs;

  private Key getSigningKey() {
    byte[] keyBytes = Decoders.BASE64.decode(secret);
    return Keys.hmacShaKeyFor(keyBytes);
  }

  public String generateToken(String username, String role, Map<String, Object> extra) {
    Date now = new Date();
    Date exp = new Date(now.getTime() + expirationMs);
    return Jwts.builder()
      .setSubject(username)
      .addClaims(extra)
      .claim("role", role)
      .setIssuedAt(now)
      .setExpiration(exp)
      .signWith(getSigningKey(), SignatureAlgorithm.HS256)
      .compact();
  }

  public Claims parseToken(String token) {
    return Jwts.parserBuilder()
      .setSigningKey(getSigningKey())
      .build()
      .parseClaimsJws(token)
      .getBody();
  }
}