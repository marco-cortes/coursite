package com.makeitweb.coursiteapi.service;

import com.makeitweb.coursiteapi.entity.course.Course;
import com.makeitweb.coursiteapi.entity.course.Lesson;
import com.makeitweb.coursiteapi.entity.course.Unit;

import java.util.List;

public interface CourseService {
    Course saveCourse(Course course);
    Unit saveUnit(Unit unit);
    Unit saveLesson(Lesson lesson);
    Boolean deleteCourse(Long course);
    Course courseById(Long id);
    List<Course> allCourses();
    List<Course> coursesByCategory(Long category);
    List<Course> coursesByTeacher(Long teacher);
    List<Course> coursesByUser(Long user);
    List<Course> pendingCourses();
}
