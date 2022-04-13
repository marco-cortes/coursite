package com.makeitweb.coursiteapi.repository;

import com.makeitweb.coursiteapi.entity.course.Lesson;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LessonRepository extends JpaRepository<Lesson, Long> {
}
