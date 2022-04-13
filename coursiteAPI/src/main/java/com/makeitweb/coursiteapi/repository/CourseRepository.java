package com.makeitweb.coursiteapi.repository;

import com.makeitweb.coursiteapi.entity.course.Course;
import com.makeitweb.coursiteapi.entity.users.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CourseRepository extends JpaRepository<Course, Long> {

    @Query("SELECT c FROM Course c WHERE c.id = (SELECT u.course.id FROM UserCourse u where u.user.id = ?1)")
    List<Course> getCoursesByUserId(Long idUser);

    List<Course> getCoursesByTeacher(Teacher teacher);
}