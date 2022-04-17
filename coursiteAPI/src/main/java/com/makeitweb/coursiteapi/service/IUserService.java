package com.makeitweb.coursiteapi.service;

import com.makeitweb.coursiteapi.dto.UserDTO;
import com.makeitweb.coursiteapi.entity.users.Role;
import com.makeitweb.coursiteapi.entity.users.User;
import com.makeitweb.coursiteapi.repository.RoleRepository;
import com.makeitweb.coursiteapi.repository.UserRepository;
import com.makeitweb.coursiteapi.helpers.Validation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class IUserService implements UserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

    @Override
    public UserDTO saveUser(UserDTO user) {
        User u = new User();
        if(user.getId() != null && user.getId() >= 1) {
            u = userRepository.findById(user.getId()).orElse(null);
            if(u == null)
                return null;
        }
        Validation.validateUser(u, user.getName(), user.getLastName(), user.getEmail(), user.getPassword());
        if(u.getRole() == null) {
            if(user.getAdmin())
                user.setRole(3L);
            Role r = roleRepository.findById(user.getRole()).orElse(null);
            if(r == null)
                return null;
            u.setRole(r);
        }
        user.setId(userRepository.save(u).getId());
        user.setPassword(null);
        return user;
    }

    @Override
    public UserDTO getUserById(Long id) {
        User u = userRepository.findById(id).orElse(null);
        if(u == null)
            return null;
        UserDTO user = new UserDTO();
        user.setId(id);
        user.setName(u.getName());
        user.setLastName(u.getLastName());
        user.setEmail(u.getEmail());
        user.setRole(u.getRole().getId());
        if(user.getRole() == 3)
            user.setAdmin(Boolean.TRUE);
        return user;
    }

    @Override
    public Boolean deleteUser(Long id) {
        User u = userRepository.findById(id).orElse(null);
        if(u == null)
            return false;
        //delete notifications and roles
        //userCourseRepository.deleteUserCoursesByUser(u);
        userRepository.delete(u);
        return true;
    }
}
