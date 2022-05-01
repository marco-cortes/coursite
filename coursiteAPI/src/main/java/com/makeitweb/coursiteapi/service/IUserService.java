package com.makeitweb.coursiteapi.service;

import com.makeitweb.coursiteapi.dto.UserDTO;
import com.makeitweb.coursiteapi.entity.users.Role;
import com.makeitweb.coursiteapi.entity.users.User;
import com.makeitweb.coursiteapi.repository.RoleRepository;
import com.makeitweb.coursiteapi.repository.UserRepository;
import com.makeitweb.coursiteapi.helpers.Validation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Collection;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class IUserService implements UserService, UserDetailsService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;


    @Override
    public UserDTO saveUser(UserDTO user) {
        User u = new User();
        if(user.getId() != null && user.getId() >= 1) {
            u = userRepository.findById(user.getId()).orElse(null);
            if(u == null)
                return null;
        }
        if(user.getPassword() != null)
            user.setPassword(passwordEncoder.encode(user.getPassword()));
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
    public UserDTO getUserById(String email) {
        return userToDTO(userRepository.findUserByEmail(email));
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

    @Override
    public User getUserByEmail(String email) {
        return userRepository.findUserByEmail(email);
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findUserByEmail(email);
        if(user == null){
            log.error("User not found in the database");
            throw new UsernameNotFoundException("User not found in the database");
        } else {
            log.info("User found in the database: {}", email);
        }
        Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();

        if (user.getRole().getId().equals(2L)) {
            authorities.add(new SimpleGrantedAuthority("ROLE_USER"));
        } else if (user.getRole().getId().equals(3L)) {
            authorities.add(new SimpleGrantedAuthority("ROLE_USER"));
            authorities.add(new SimpleGrantedAuthority("ROLE_TEACHER"));
        }

        authorities.add(new SimpleGrantedAuthority(user.getRole().getName()));
        return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(), authorities);
    }

    private UserDTO userToDTO (User u) {
        if(u == null)
            return null;
        UserDTO user = new UserDTO();
        user.setId(u.getId());
        user.setName(u.getName());
        user.setLastName(u.getLastName());
        user.setEmail(u.getEmail());
        user.setRole(u.getRole().getId());
        if(user.getRole() == 3)
            user.setAdmin(Boolean.TRUE);
        return user;
    }
}