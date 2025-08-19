package com.examly.springapp;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.boot.autoconfigure.condition.ConditionalOnBean;

import com.examly.springapp.repository.UserRepository;
import com.examly.springapp.model.Admin;
import com.examly.springapp.model.Teacher;

@SpringBootApplication
public class OnlineExamSystemApplication {

public static void main(String[] args) {
SpringApplication.run(OnlineExamSystemApplication.class, args);
}

@Bean
@Profile("!test")
@ConditionalOnBean(UserRepository.class)

CommandLineRunner initUsers(UserRepository repo, PasswordEncoder encoder) {
return args -> {
if (!repo.existsByUsername("admin1")) {
Admin admin = new Admin();
admin.setName("System Admin");
admin.setEmail("admin@example.com");
admin.setUsername("admin1");
admin.setPassword(encoder.encode("adminpass"));
admin.setRole("ADMIN");
repo.save(admin);
}

if (!repo.existsByUsername("teacher1")) {
Teacher teacher = new Teacher();
teacher.setName("Math Teacher");
teacher.setEmail("teacher@example.com");
teacher.setUsername("teacher1");
teacher.setPassword(encoder.encode("password"));
teacher.setRole("TEACHER");
repo.save(teacher);
}
};
}
}
