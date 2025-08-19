package com.examly.springapp.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TeacherDTO {
        private String title;
            private String description;
                private int duration; // in minutes
                    private String createdBy;
                    }

