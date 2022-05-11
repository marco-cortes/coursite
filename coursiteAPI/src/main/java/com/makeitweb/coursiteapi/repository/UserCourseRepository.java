package com.makeitweb.coursiteapi.repository;

import com.makeitweb.coursiteapi.entity.UserCourse;
import com.makeitweb.coursiteapi.entity.UserCoursePK;
import com.makeitweb.coursiteapi.entity.users.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UserCourseRepository extends JpaRepository<UserCourse, UserCoursePK> {
    void deleteUserCoursesByUser(User user);

    List<UserCourse> findUserCourseByUser_Id(Long id);


    Integer countUserCoursesByCourse_IdAndScoreNotNull(Long id);

    @Query("SELECT SUM(c.score) FROM UserCourse c WHERE c.course.id = ?1")
    Float getScoresById(Long id);
}
