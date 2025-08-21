package com.examly.springapp.config;

import java.util.Collections;

import jakarta.servlet.Filter;
import org.springframework.boot.autoconfigure.AutoConfiguration;
import org.springframework.boot.autoconfigure.AutoConfigureBefore;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Profile;
import org.springframework.security.web.DefaultSecurityFilterChain;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@AutoConfiguration
@AutoConfigureBefore(SecurityAutoConfiguration.class)
@Profile("test")
public class TestNoopSecurityAutoConfiguration {

    @Bean
    @ConditionalOnMissingBean(SecurityFilterChain.class)
    public SecurityFilterChain noopSecurityFilterChain() {
        return new DefaultSecurityFilterChain(new AntPathRequestMatcher("/**"), Collections.<Filter>emptyList());
    }
}

