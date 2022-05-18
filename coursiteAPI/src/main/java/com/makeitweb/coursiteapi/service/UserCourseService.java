package com.makeitweb.coursiteapi.service;

import com.makeitweb.coursiteapi.dto.UserCourseDTO;
import com.makeitweb.coursiteapi.entity.UserLesson;

import java.util.List;

public interface UserCourseService {
    UserCourseDTO save(UserCourseDTO userCourseDTO);
    UserCourseDTO getProgress(UserCourseDTO userCourseDTO);
    UserLesson setLessonStatus(Long userId, Long courseId, Long lessonId, Boolean status);
    List<UserLesson> getLessonsUser(Long userId, Long courseId);
}