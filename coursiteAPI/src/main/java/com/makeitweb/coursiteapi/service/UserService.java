package com.makeitweb.coursiteapi.service;

import com.makeitweb.coursiteapi.dto.UserDTO;
import com.makeitweb.coursiteapi.entity.users.User;

public interface UserService {
    UserDTO saveUser(UserDTO user);
    UserDTO getUserById(String email);
    Boolean deleteUser(Long id);
    User getUserByEmail(String email);
}

