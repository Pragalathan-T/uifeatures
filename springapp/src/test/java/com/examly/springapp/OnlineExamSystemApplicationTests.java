package com.examly.springapp;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
@SpringBootTest(properties = "app.security.enabled=false")
@ActiveProfiles("test")
class OnlineExamSystemApplicationTests {
	@Test
	void contextLoads() {
		// Context test for coverage
	}
}
