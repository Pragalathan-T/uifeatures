package com.examly.springapp.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StudentExamDTO {
    private Long studentId;
        private Long examId;
        private String studentUsername;
        }
