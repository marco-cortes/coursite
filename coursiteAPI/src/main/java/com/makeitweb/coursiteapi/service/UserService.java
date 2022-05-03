package com.makeitweb.coursiteapi.service;

import com.makeitweb.coursiteapi.entity.users.User;

import java.util.List;

public interface UserService {
    User saveUser(User user);
    Boolean deleteUser(Long id);
    User getUserByEmail(String email);
    User getUserById(Long id);
    User changePassword(Long id, String password);

    List<User> getTeachersPending();
    List<User> getAllTeachers();
}

