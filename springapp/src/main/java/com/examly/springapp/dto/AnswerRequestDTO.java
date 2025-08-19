package com.examly.springapp.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AnswerRequestDTO {
    private Long questionId;
        private String selectedOption;
        }
        