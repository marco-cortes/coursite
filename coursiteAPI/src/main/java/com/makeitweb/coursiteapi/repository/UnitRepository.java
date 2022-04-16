package com.makeitweb.coursiteapi.repository;

import com.makeitweb.coursiteapi.entity.course.Unit;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UnitRepository extends JpaRepository<Unit, Long> {
    List<Unit> getUnitsByCourse_Id(Long courseId);
}
