package com.makeitweb.coursiteapi.repository;

import com.makeitweb.coursiteapi.entity.course.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CourseRepository extends JpaRepository<Course, Long> {

    @Query("SELECT c FROM Course c WHERE c.id IN (SELECT u.course.id FROM UserCourse u where u.user.id = ?1)")
    List<Course> getCoursesByUserId(Long idUser);

    List<Course> getCoursesByTeacher_Id(Long teacherId);
    List<Course> getCoursesByCategory_Id(Long categoryId);
    @Query("SELECT c FROM Course c WHERE c.status=0")
    List<Course> getPendingCourses();
    @Query("SELECT c FROM Course c WHERE c.status=1")
    List<Course> getCourses();


}