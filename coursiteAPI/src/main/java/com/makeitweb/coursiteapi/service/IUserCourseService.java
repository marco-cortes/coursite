
package com.makeitweb.coursiteapi.service;

import com.makeitweb.coursiteapi.dto.UserCourseDTO;
import com.makeitweb.coursiteapi.entity.UserCourse;
import com.makeitweb.coursiteapi.entity.UserCoursePK;
import com.makeitweb.coursiteapi.entity.UserLesson;
import com.makeitweb.coursiteapi.entity.UserLessonPK;
import com.makeitweb.coursiteapi.entity.course.Course;
import com.makeitweb.coursiteapi.entity.course.Lesson;
import com.makeitweb.coursiteapi.entity.users.User;
import com.makeitweb.coursiteapi.helpers.Validation;
import com.makeitweb.coursiteapi.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class IUserCourseService implements UserCourseService {

    private final UserCourseRepository userCourseRepository;
    private final UserRepository userRepository;
    private final CourseRepository courseRepository;
    private final UserLessonRepository userLessonRepository;
    private final LessonRepository lessonRepository;

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

            List<Lesson> lessons = lessonRepository.getLessonsByCourse_Id(course.getId());

            if(lessons == null)
                return null;

            for (Lesson aux : lessons) {
                UserLessonPK ulpk = new UserLessonPK(user.getId(), course.getId(), aux.getId());
                UserLesson ul = new UserLesson();
                ul.setId(ulpk);
                ul.setUser(user);
                ul.setLesson(aux);
                ul.setCourse(course);
                userLessonRepository.save(ul);
            }
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
            Integer users = userCourseRepository.countUserCoursesByCourse_IdAndScoreNotNull(userCourse.getCourse().getId());
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

    @Override
    public UserLesson setLessonStatus(Long userId, Long courseId, Long lessonId, Boolean status) {

        User u = userRepository.findById(userId).orElse(null);
        if(u == null)
            return null;
        Lesson l = lessonRepository.findById(lessonId).orElse(null);
        if(l == null)
            return null;
        UserLessonPK ulpk = new UserLessonPK(userId, courseId, lessonId);
        UserLesson ul = userLessonRepository.findById(ulpk).orElse(null);

        if(ul == null)
            return null;

        if(status != null)
            ul.setStatus(status);

        ul = userLessonRepository.save(ul);

        List<UserLesson> ulList = getLessonsUser(userId, courseId);

        float c = 0f;
        for(UserLesson aux:ulList) {
            if(aux.getStatus())
                c++;
        }

        UserCoursePK ucpk = new UserCoursePK(userId, courseId);
        UserCourse uc = userCourseRepository.findById(ucpk).orElse(null);

        //float value = ;
        assert uc != null;
        uc.setProgress(100 * c / ulList.size());

        userCourseRepository.save(uc);

        return ul;
    }

    @Override
    public List<UserLesson> getLessonsUser(Long userId, Long courseId) {
        return userLessonRepository.getUserLessonsByUser_IdAndCourse_Id(userId, courseId);
    }
}