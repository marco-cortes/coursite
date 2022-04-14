package com.makeitweb.coursiteapi.service;

import com.makeitweb.coursiteapi.entity.course.Category;
import com.makeitweb.coursiteapi.entity.course.Course;
import com.makeitweb.coursiteapi.entity.course.Lesson;
import com.makeitweb.coursiteapi.entity.course.Unit;
import com.makeitweb.coursiteapi.entity.users.Teacher;
import com.makeitweb.coursiteapi.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class ICourseService implements CourseService {

    private final CourseRepository courseRepository;
    private final CategoryRepository categoryRepository;
    private final TeacherRepository teacherRepository;
    private final UnitRepository unitRepository;
    private final LessonRepository lessonRepository;

    @Override
    public Course saveCourse(Course course) {
        List<Unit> units = course.getUnits();
        for(Unit u: units) {
            if(u.getId() == null || u.getId() <= 0) {
                u.setCourse(course);
            }
            unitRepository.save(u);
            System.out.println(u);
            List<Lesson> lessons = u.getLessons();
            for (Lesson l: lessons) {
                if(l.getId() == null || l.getId() <= 0) {
                    l.setUnit(u);
                }
                lessonRepository.save(l);
                System.out.println(l);
            }
        }
        //return null;
        return courseRepository.save(course);
    }

    @Override
    public Unit saveUnit(Unit unit) {
        return null;
    }

    @Override
    public Unit saveLesson(Lesson lesson) {
        return null;
    }

    @Override
    public Boolean deleteCourse(Long course) {
        Course c = courseById(course);
        if(c == null)
            return false;
        //delete units, lessons and relations with users
        courseRepository.delete(c);
        return true;
    }

    @Override
    public Course courseById(Long id) {
        return courseRepository.findById(id).orElse(null);
    }

    @Override
    public List<Course> allCourses() {
        return courseRepository.findAll();
    }

    @Override
    public List<Course> coursesByCategory(Long category) {
        Category c = categoryRepository.findById(category).orElse(null);
        if(c == null)
            return null;
        return courseRepository.getCoursesByCategory(c);
    }

    @Override
    public List<Course> coursesByTeacher(Long teacher) {
        Teacher t = teacherRepository.findById(teacher).orElse(null);
        if(t == null)
            return null;
        return courseRepository.getCoursesByTeacher(t);
    }

    @Override
    public List<Course> coursesByUser(Long user) {
        return courseRepository.getCoursesByUserId(user);
    }

    @Override
    public List<Course> pendingCourses() {
        return courseRepository.getPendingCourses();
    }
}
