package com.examly.springapp.config;
 import org.springframework.context.annotation.Bean;
 import org.springframework.context.annotation.Configuration;
 import org.springframework.core.Ordered;
 import org.springframework.boot.web.servlet.FilterRegistrationBean;
 import org.springframework.web.cors.CorsConfiguration;
 import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
 import org.springframework.web.filter.CorsFilter;

 @Configuration
 public class CorsFilterConfig {

 @Bean
 public FilterRegistrationBean<CorsFilter> corsFilterRegistration() {
 CorsConfiguration config = new CorsConfiguration();
 config.setAllowCredentials(true);
 config.addAllowedOriginPattern("https://*.premiumproject.examly.io");
 config.addAllowedOriginPattern("http://*.premiumproject.examly.io");
 config.addAllowedHeader("*");
 config.addAllowedMethod("*");
 config.setMaxAge(3600L);

 UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
 source.registerCorsConfiguration("/**", config);

 FilterRegistrationBean<CorsFilter> bean = new FilterRegistrationBean<>(new CorsFilter(source));
 bean.setOrder(Ordered.HIGHEST_PRECEDENCE);
 return bean;
 }
 } 
