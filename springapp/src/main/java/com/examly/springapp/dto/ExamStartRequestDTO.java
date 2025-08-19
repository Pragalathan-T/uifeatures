package com.examly.springapp.dto;


import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ExamStartRequestDTO {
    private String username;
        private Long examId;
}
        