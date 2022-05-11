package com.makeitweb.coursiteapi.service;

import com.makeitweb.coursiteapi.dto.CourseDTO;
import com.makeitweb.coursiteapi.dto.UserCourseDTO;
import com.makeitweb.coursiteapi.entity.course.Course;

import java.util.List;

public interface CourseService {

    CourseDTO saveCourse(CourseDTO course);

    CourseDTO getCourseById(Long id);
    CourseDTO getAllCourseById(Long id);

    List<Course> getAllCourses();
    List<Course> getPendingCourses();
    List<Course> getAvailableCourses();

    List<UserCourseDTO> getCoursesByStudent(Long id);
    List<Course> getCoursesByTeacher(Long id);

    Boolean deleteCourse(Long id);
    Boolean deleteUnit(Long id);
    Boolean deleteLesson(Long id);

}
