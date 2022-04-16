package com.makeitweb.coursiteapi.service;

import com.makeitweb.coursiteapi.dto.CourseDTO;

import java.util.List;

public interface CourseService {
    CourseDTO saveCourse(CourseDTO course);
    Boolean deleteCourse(Long course);
    CourseDTO courseById(Long id);
    List<CourseDTO> allCourses();
    List<CourseDTO> coursesByCategory(Long category);
    List<CourseDTO> coursesByTeacher(Long teacher);
    List<CourseDTO> coursesByUser(Long user);
    List<CourseDTO> pendingCourses();
}
