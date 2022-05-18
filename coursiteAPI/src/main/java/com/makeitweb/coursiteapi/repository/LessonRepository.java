package com.makeitweb.coursiteapi.repository;

import com.makeitweb.coursiteapi.entity.course.Lesson;
import com.makeitweb.coursiteapi.entity.course.Unit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface LessonRepository extends JpaRepository<Lesson, Long> {
    List<Lesson> getLessonsByUnit_Id(Long unitId);
    void deleteByUnit(Unit unit);

    @Query("select l from Lesson l where l.unit.id in (select u from Unit u where u.course.id = ?1)")
    List<Lesson> getLessonsByCourse_Id(Long courseId);

}
