package com.makeitweb.coursiteapi.service;

import com.makeitweb.coursiteapi.entity.UserCourse;
import com.makeitweb.coursiteapi.entity.UserCoursePK;
import com.makeitweb.coursiteapi.entity.course.Course;
import com.makeitweb.coursiteapi.entity.users.User;
import com.makeitweb.coursiteapi.repository.CourseRepository;
import com.makeitweb.coursiteapi.repository.UserCourseRepository;
import com.makeitweb.coursiteapi.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class IUserService implements UserService {

    private final UserRepository userRepository;
    private final CourseRepository courseRepository;
    private final UserCourseRepository userCourseRepository;

    @Override
    public User saveUser(User user) {
        /*ADD ROLES*/
        return userRepository.save(user);
    }

    @Override
    public User getUserById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    @Override
    public List<Course> getCourses(Long id) {
        return courseRepository.getCoursesByUserId(id);
    }

    @Override
    public UserCourse buyCourse(Long user, Long course) {
        Course c = courseRepository.findById(course).orElse(null);
        if(c == null)
            return null;
        User u = getUserById(user);
        if(u == null)
            return null;

        UserCourse uc = new UserCourse();
        uc.setCourse(c);
        uc.setUser(u);
        uc.setProgress(0f);
        uc.setId(new UserCoursePK(course,user));
        return userCourseRepository.save(uc);
    }
}
