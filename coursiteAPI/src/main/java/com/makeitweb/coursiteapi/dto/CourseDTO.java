package com.makeitweb.coursiteapi.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CourseDTO {
    private Long id;
    private String title;
    private String description;
    private String image;
    private Float price;
    private Integer score;
    private Integer status = 0;
    private Long teacher;
    private Long category;
    private List<UnitDTO> units;
}