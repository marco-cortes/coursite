package com.makeitweb.coursiteapi.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {
    private Long id;
    private String name;
    private String lastName;
    private String email;
    private String password;
    private Long role = 1L;
    private Boolean admin = Boolean.FALSE;
}