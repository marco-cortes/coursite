package com.makeitweb.coursiteapi.repository;

import com.makeitweb.coursiteapi.entity.CourseStudent;
import com.makeitweb.coursiteapi.entity.CourseStudentPK;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CourseStudentRepository extends JpaRepository<CourseStudent, CourseStudentPK> {
}
