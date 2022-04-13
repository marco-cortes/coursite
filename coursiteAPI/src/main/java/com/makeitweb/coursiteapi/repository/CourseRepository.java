package com.makeitweb.coursiteapi.repository;

import com.makeitweb.coursiteapi.entity.course.Course;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CourseRepository extends JpaRepository<Course, Long> {
}
