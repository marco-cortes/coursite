package com.makeitweb.coursiteapi.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DocumentDTO {
    private Long id;
    private String name;
    private String url;
    private Long teacher;
}
