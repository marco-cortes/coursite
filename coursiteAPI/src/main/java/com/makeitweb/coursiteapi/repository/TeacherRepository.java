package com.makeitweb.coursiteapi.repository;

import com.makeitweb.coursiteapi.entity.users.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TeacherRepository extends JpaRepository<Teacher, Long> {

    @Query("SELECT t FROM Teacher t WHERE t.status=0")
    List<Teacher> getPendingTeachers();

    Teacher findTeacherByUser_Id(Long userId);
}
