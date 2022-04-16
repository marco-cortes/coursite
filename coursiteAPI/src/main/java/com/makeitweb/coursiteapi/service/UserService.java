package com.makeitweb.coursiteapi.service;

import com.makeitweb.coursiteapi.dto.UserDTO;

public interface UserService {
    UserDTO saveUser(UserDTO user);
    UserDTO getUserById(Long id);
    Boolean deleteUser(Long id);
}

