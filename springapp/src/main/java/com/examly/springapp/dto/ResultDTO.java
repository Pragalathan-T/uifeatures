package com.examly.springapp.dto;

import lombok.*;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ResultDTO {
        private Long studentExamId;
            private String examTitle;
                private String studentUsername;
                    private LocalDateTime startTime;
                        private LocalDateTime endTime;
                            private Integer attemptNumber;
                                private String feedback;
                                    private Integer correctAnswers;
                                        private Integer wrongAnswers;
                                            private Integer totalQuestions;
                                                private List<Map<String, Object>> questionDetails;
                                                }

