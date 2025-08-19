package com.examly.springapp.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StudentDTO {
        private Long examId;
            private String questionText;
                private String optionA;
                    private String optionB;
                        private String optionC;
                            private String optionD;
                                private String correctOption;
                                    private String topic;
                                        private String difficulty;
                                            private Integer timeLimit; // seconds
                                                private String imageUrl;
                                                }


                                                