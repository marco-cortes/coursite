package com.makeitweb.coursiteapi.repository;

import com.makeitweb.coursiteapi.entity.UserLesson;
import com.makeitweb.coursiteapi.entity.UserLessonPK;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserLessonRepository extends JpaRepository<UserLesson, UserLessonPK> {


    List<UserLesson> getUserLessonsByUser_IdAndCourse_Id(Long userId, Long CourseId);
}
