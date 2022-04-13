package com.makeitweb.coursiteapi.repository;

import com.makeitweb.coursiteapi.entity.users.Student;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepository extends JpaRepository<Student, Long> {

}
