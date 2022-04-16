package com.makeitweb.coursiteapi.service;

import com.makeitweb.coursiteapi.dto.LessonDTO;

public interface LessonService {
    LessonDTO save(LessonDTO lessonDTO);
    Boolean delete(Long id);
}
