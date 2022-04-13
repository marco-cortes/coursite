package com.makeitweb.coursiteapi.repository;

import com.makeitweb.coursiteapi.entity.users.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TeacherRepository extends JpaRepository<Teacher, Long> {

}
