package com.makeitweb.coursiteapi.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TeacherDTO {
    private Long id;
    private String name;
    private String lastName;
    private String email;
    private String password;
    private Long role = 2L;
    private String phone;
    private Integer status = 0;
}
