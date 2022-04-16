package com.makeitweb.coursiteapi.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LessonDTO {
    private Long id;
    private String title;
    private String description;
    private String linkDoc;
    private Long unit;
    private String linkVideo;
}
