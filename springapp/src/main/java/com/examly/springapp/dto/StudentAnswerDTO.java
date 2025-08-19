package com.examly.springapp.dto;

import lombok.*;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StudentAnswerDTO {
        private Long studentExamId;
        private Long id;
        private Long questionId;
        private String selectedOption;
        private LocalDateTime submittedAt;
    }

