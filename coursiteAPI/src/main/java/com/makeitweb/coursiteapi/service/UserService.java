package com.makeitweb.coursiteapi.service;

import com.makeitweb.coursiteapi.entity.UserCourse;
import com.makeitweb.coursiteapi.entity.course.Course;
import com.makeitweb.coursiteapi.entity.users.User;

import java.util.List;

public interface UserService {
    User saveUser(User user);
    User getUserById(Long id);
    Boolean deleteUser(Long id);
    List<Course> getCourses(Long id);
    UserCourse buyCourse(Long user, Long course);
}

