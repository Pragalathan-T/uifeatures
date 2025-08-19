package com.examly.springapp.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class QuestionDTO {
private Long questionId;
private String questionText;
private String optionA;
private String optionB;
private String optionC;
private String optionD;
private String correctAnswer;

private String topic;
private String difficulty;
private String imageUrl;

private Long examId;  
}
