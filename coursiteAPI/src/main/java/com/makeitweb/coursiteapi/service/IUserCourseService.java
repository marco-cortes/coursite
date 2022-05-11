
package com.makeitweb.coursiteapi.service;

import com.makeitweb.coursiteapi.dto.UserCourseDTO;
import com.makeitweb.coursiteapi.entity.UserCourse;
import com.makeitweb.coursiteapi.entity.UserCoursePK;
import com.makeitweb.coursiteapi.entity.course.Course;
import com.makeitweb.coursiteapi.entity.users.User;
import com.makeitweb.coursiteapi.helpers.Validation;
import com.makeitweb.coursiteapi.repository.CourseRepository;
import com.makeitweb.coursiteapi.repository.UserCourseRepository;
import com.makeitweb.coursiteapi.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class IUserCourseService implements UserCourseService {

    private final UserCourseRepository userCourseRepository;
    private final UserRepository userRepository;
    private final CourseRepository courseRepository;

    @Override
    public UserCourseDTO save(UserCourseDTO userCourseDTO) {
        UserCourse userCourse;
        User user;
        Course course;

        if (userCourseDTO.getUserId() == null || userCourseDTO.getUserId() <= 0)
            return null;

        user = userRepository.findById(userCourseDTO.getUserId()).orElse(null);
        if (user == null)
            return null;

        if (userCourseDTO.getCourseId() == null || userCourseDTO.getCourseId() <= 0)
            return null;

        course = courseRepository.findById(userCourseDTO.getCourseId()).orElse(null);
        if (course == null)
            return null;



        userCourse = userCourseRepository.findById(new UserCoursePK(user.getId(), course.getId())).orElse(null);

        if (userCourse == null) {
            userCourse = new UserCourse();
            userCourse.setUser(user);
            userCourse.setCourse(course);
            userCourse.setProgress(0F);
            userCourse.setScore(null);
            userCourse.setId(new UserCoursePK(user.getId(), course.getId()));
            userCourseRepository.save(userCourse);
            return userCourseDTO;
        }

        if (Validation.floatValue(userCourseDTO.getScore())) {
            userCourse.setScore(userCourseDTO.getScore());
        }
        if (Validation.floatValue(userCourseDTO.getProgress()))
            userCourse.setProgress(userCourseDTO.getProgress());
        userCourse = userCourseRepository.save(userCourse);

        if(userCourse.getScore() > 0) {
            Float score = userCourseRepository.getScoresById(userCourse.getCourse().getId());
            Integer users = userCourseRepository.countUserCoursesByCourse_Id(userCourse.getCourse().getId());
            course.setScore(score/users);
            courseRepository.save(course);
        }

        return userCourseDTO;
    }

    @Override
    public UserCourseDTO getProgress(UserCourseDTO userCourseDTO) {
        UserCourse userCourse;
        User user;
        Course course;

        if (userCourseDTO.getUserId() == null || userCourseDTO.getUserId() <= 0)
            return null;

        user = userRepository.findById(userCourseDTO.getUserId()).orElse(null);
        if (user == null)
            return null;

        if (userCourseDTO.getCourseId() == null || userCourseDTO.getCourseId() <= 0)
            return null;

        course = courseRepository.findById(userCourseDTO.getCourseId()).orElse(null);
        if (course == null)
            return null;

        userCourse = userCourseRepository.findById(new UserCoursePK(user.getId(), course.getId())).orElse(null);
        if (userCourse == null)
            return null;
        userCourseDTO.setProgress(userCourse.getProgress());
        userCourseDTO.setScore(userCourse.getScore());

        return userCourseDTO;
    }
}