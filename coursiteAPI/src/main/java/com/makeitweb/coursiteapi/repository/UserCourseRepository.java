package com.makeitweb.coursiteapi.repository;

import com.makeitweb.coursiteapi.entity.UserCourse;
import com.makeitweb.coursiteapi.entity.UserCoursePK;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserCourseRepository extends JpaRepository<UserCourse, UserCoursePK> {
}
