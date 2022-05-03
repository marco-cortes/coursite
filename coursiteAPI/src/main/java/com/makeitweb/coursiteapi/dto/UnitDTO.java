package com.makeitweb.coursiteapi.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UnitDTO {
    private Long id;
    private String title;
    private String description;
    private Long course;
    private List<LessonDTO> lessons;
}