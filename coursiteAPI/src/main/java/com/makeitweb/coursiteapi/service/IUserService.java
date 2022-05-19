package com.makeitweb.coursiteapi.service;

import com.makeitweb.coursiteapi.entity.course.Course;
import com.makeitweb.coursiteapi.entity.users.User;
import com.makeitweb.coursiteapi.helpers.Validation;
import com.makeitweb.coursiteapi.repository.CourseRepository;
import com.makeitweb.coursiteapi.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class IUserService implements UserService, UserDetailsService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final CourseRepository courseRepository;
    private final JavaMailSender mailSender;


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
        //user.getRole().forEach(role -> authorities.add(new SimpleGrantedAuthority(role.getName())));

        if (user.getRole() == 1) {
            authorities.add(new SimpleGrantedAuthority("ROLE_USER"));
        } else if (user.getRole() == 2) {
            authorities.add(new SimpleGrantedAuthority("ROLE_USER"));
            authorities.add(new SimpleGrantedAuthority("ROLE_TEACHER"));
        } else if (user.getRole() == 3) {
            authorities.add(new SimpleGrantedAuthority("ROLE_USER"));
            authorities.add(new SimpleGrantedAuthority("ROLE_TEACHER"));
            authorities.add(new SimpleGrantedAuthority("ROLE_ADMIN"));
        }
        return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(), authorities);
    }

    @Override
    public User saveUser(User user) {
        if(user.getPassword() != null && user.getId() == null)
            user.setPassword(passwordEncoder.encode(user.getPassword()));

        if(user.getId() == null) {
            User old = getUserByEmail(user.getEmail());
            if(old == null) {
                if(user.getRole() == null) {
                    user.setRole(1);
                } else if (user.getRole() == 2)
                    user.setStatus(0);
                return userRepository.save(user);
            }
            return null;
        }

        User old = getUserById(user.getId());
        if(old == null) {
            if(user.getRole() == null)
                user.setRole(1);
            else if(user.getRole() == 2)
                user.setStatus(0);
            return userRepository.save(user);
        }

        if(user.getImage() != null)
            old.setImage(user.getImage());

        if(user.getStatus() != null)
            old.setStatus(user.getStatus());

        if(user.getStatus().equals(-2))
            deleteCoursesTeacher(user.getId());

        if(!user.getEmail().equals(old.getEmail()))
            old.setStatus(1);

        if(old.getRole() == 2) {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom("coursite.app@gmail.com");
            message.setTo(user.getEmail());
            message.setSubject("Status de su solicitud de Coursite");
            if(user.getStatus() == -1)
                message.setText("Su solicitud para ser profesor de Coursite fue rechazada :(");
            else
                message.setText("Su solicitud para ser profesor de Coursite fue aprobada :)");
            mailSender.send(message);
        }

        Validation.validateUser(old, user.getName(), user.getLastName(), user.getEmail(), user.getPassword(), user.getPhone());
        return userRepository.save(old);
    }

    private void deleteCoursesTeacher(Long id) {
        List<Course> courses = courseRepository.getCoursesByTeacher_Id(id);
        for(Course c : courses) {
            c.setStatus(-2);
            courseRepository.save(c);
        }
    }

    @Override
    public User changePassword(Long id, String password) {
        User u = getUserById(id);
        if(u == null)
            return null;
        u.setPassword(passwordEncoder.encode(password));
        return userRepository.save(u);
    }

    @Override
    public Boolean deleteUser(Long id) {
        User u = getUserById(id);
        if (u == null)
            return Boolean.FALSE;
        userRepository.delete(u);
        return Boolean.TRUE;
    }

    @Override
    public User getUserByEmail(String email) {
        return userRepository.findUserByEmail(email);
    }

    @Override
    public User getUserById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    @Override
    public List<User> getTeachersPending() {
        return userRepository.findAllByStatus(0);
    }

    @Override
    public List<User> getAllTeachers() {
        return userRepository.findAllByRole(2);
    }
}
