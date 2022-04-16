package com.makeitweb.coursiteapi.repository;

import com.makeitweb.coursiteapi.entity.course.Lesson;
import com.makeitweb.coursiteapi.entity.course.Unit;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LessonRepository extends JpaRepository<Lesson, Long> {
    List<Lesson> getLessonsByUnit_Id(Long unitId);
    void deleteByUnit(Unit unit);
}
