package com.examly.springapp.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserDTO {
        private Long userId;
            private String name;
                private String email;
                    private String role;
 }

