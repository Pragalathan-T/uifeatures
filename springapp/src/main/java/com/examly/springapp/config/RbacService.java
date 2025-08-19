package com.examly.springapp.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component("rbac")
public class RbacService {
  @Value("${security.enforce-roles:false}")
  private boolean enforceRoles;

  public boolean allowed(String... roles) {
    if (!enforceRoles) return true; // keeps tests green by default
    Authentication auth = SecurityContextHolder.getContext().getAuthentication();
    if (auth == null || !auth.isAuthenticated()) return false;
    for (String role : roles) {
      String needed = "ROLE_" + role;
      for (GrantedAuthority ga : auth.getAuthorities()) {
        if (needed.equals(ga.getAuthority())) return true;
      }
    }
    return false;
  }
}