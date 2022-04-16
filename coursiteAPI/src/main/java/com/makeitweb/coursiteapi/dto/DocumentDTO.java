package com.makeitweb.coursiteapi.dto;

import lombok.Data;

@Data
public class DocumentDTO {
    private Long id;
    private String name;
    private String url;
    private Long teacher;
}
