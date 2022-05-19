package com.makeitweb.coursiteapi.service;

import com.makeitweb.coursiteapi.dto.CourseDTO;
import com.makeitweb.coursiteapi.dto.LessonDTO;
import com.makeitweb.coursiteapi.dto.UnitDTO;
import com.makeitweb.coursiteapi.dto.UserCourseDTO;
import com.makeitweb.coursiteapi.entity.UserCourse;
import com.makeitweb.coursiteapi.entity.course.Category;
import com.makeitweb.coursiteapi.entity.course.Course;
import com.makeitweb.coursiteapi.entity.course.Lesson;
import com.makeitweb.coursiteapi.entity.course.Unit;
import com.makeitweb.coursiteapi.helpers.Validation;
import com.makeitweb.coursiteapi.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class ICourseService implements CourseService {

    private final CourseRepository courseRepository;
    private final UnitRepository unitRepository;
    private final LessonRepository lessonRepository;
    private final UserRepository userRepository;
    private final UserCourseRepository userCourseRepository;
    private final CategoryRepository categoryRepository;

    @Override
    public CourseDTO saveCourse(CourseDTO course) {
        Course c = new Course();
        if(course.getId() != null)
            c = courseRepository.findById(course.getId()).orElse(new Course());

        Validation.validateCourse(c, course.getTitle(), course.getDescription(), course.getImage(), course.getPrice(), course.getStatus(), course.getScore());

        if(c.getTeacher() == null) {
            c.setTeacher(userRepository.findById(course.getIdTeacher()).orElse(null));
            if(c.getTeacher() == null)
                return null;
            course.setTeacher(c.getTeacher().getName() + " " + c.getTeacher().getLastName());
        }
        if(course.getIdCategory() == null)
            return  null;
        Category category = categoryRepository.findById(course.getIdCategory()).orElse(null);

        if(category == null)
            return null;

        course.setCategory(category.getName());

        c.setCategory(category);
        c = courseRepository.save(c);
        course.setId(c.getId());

        List<UnitDTO> unitDTOList = course.getUnits();
        if (unitDTOList == null || unitDTOList.size() <= 0)
            return  course;

        Unit unit = new Unit();
        for (UnitDTO u: unitDTOList) {
            if(u.getId() != null && u.getId() > 0)
                unit = unitRepository.findById(u.getId()).orElse(new Unit());
            Validation.validateUnit(unit, u.getTitle(), u.getDescription());
            unit.setCourse(c);
            unit = unitRepository.save(unit);
            u.setId(unit.getId());

            List<LessonDTO> lessonDTOList = u.getLessons();
            if (lessonDTOList != null && lessonDTOList.size() > 0) {
                Lesson lesson = new Lesson();
               for(LessonDTO l: lessonDTOList) {
                   if(l.getId() != null && l.getId() > 0)
                        lesson = lessonRepository.findById(l.getId()).orElse(new Lesson());
                   Validation.validateLesson(lesson, l.getTitle(), l.getDescription(), l.getLinkDoc(), l.getLinkVideo());
                   lesson.setUnit(unit);
                   lesson = lessonRepository.save(lesson);
                   l.setId(lesson.getId());
                   lesson = new Lesson();
               }
            }
            unit = new Unit();
        }

        return course;
    }

    @Override
    public Boolean deleteCourse(Long id) {
        Course c = courseRepository.findById(id).orElse(null);
        assert c != null;
            c.setStatus(-2);
        courseRepository.save(c);
        return Boolean.TRUE;
    }

    @Override
    public CourseDTO getCourseById(Long id) {
        return courseToDTO(courseRepository.findById(id).orElse(null));
    }

    @Override
    public CourseDTO getAllCourseById(Long id) {
        CourseDTO course = courseToDTO(courseRepository.findById(id).orElse(null));

        if(course == null)
            return null;

        List<Unit> units = unitRepository.getUnitsByCourse_Id(id);
        if(units == null || units.size() <= 0)
            return course;

        List<UnitDTO> unitDTOS = new ArrayList<>();
        UnitDTO unitDTO = new UnitDTO();

        for (Unit u: units) {
            unitDTO.setId(u.getId());
            unitDTO.setTitle(u.getTitle());
            unitDTO.setDescription(u.getDescription());

            List<Lesson> lessons = lessonRepository.getLessonsByUnit_Id(u.getId());

            if(lessons != null && units.size() > 0) {

                LessonDTO lessonDTO = new LessonDTO();
                List<LessonDTO> lessonDTOS = new ArrayList<>();

                for (Lesson l: lessons) {

                    lessonDTO.setId(l.getId());
                    lessonDTO.setTitle(l.getTitle());
                    lessonDTO.setDescription(l.getDescription());
                    lessonDTO.setLinkDoc(l.getLinkDoc());
                    lessonDTO.setLinkVideo(l.getLinkVideo());
                    lessonDTOS.add(lessonDTO);
                    lessonDTO = new LessonDTO();
                }
                unitDTO.setLessons(lessonDTOS);
            }
            unitDTOS.add(unitDTO);
            unitDTO = new UnitDTO();
        }
        course.setUnits(unitDTOS);
        return course;
    }

    @Override
    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    @Override
    public List<Course> getPendingCourses() {
        return courseRepository.getPendingCourses();
    }

    @Override
    public List<Course> getAvailableCourses() {
        return courseRepository.getCourses();
    }

    @Override
    public List<UserCourseDTO> getCoursesByStudent(Long id) {
        List<UserCourseDTO> list = new ArrayList<>();

        List<Course> courses = courseRepository.getCoursesByUserId(id);
        List<UserCourse> userCourses = userCourseRepository.findUserCourseByUser_Id(id);

        UserCourseDTO aux = new UserCourseDTO();

        for(int i = 0; i < courses.size(); i++) {
            aux.setCourseId(courses.get(i).getId());
            aux.setProgress(userCourses.get(i).getProgress());
            aux.setScore(courses.get(i).getScore());
            aux.setUserId(id);
            aux.setCourse(courseToDTO(courses.get(i)));
            list.add(aux);
            aux = new UserCourseDTO();
        }

        return list;
    }

    @Override
    public List<Course> getCoursesByTeacher(Long id) {
        return courseRepository.getCoursesByTeacher_Id(id);
    }

    @Override
    public Boolean deleteUnit(Long id) {
        Unit u = unitRepository.findById(id).orElse(null);
        if(u == null)
            return Boolean.FALSE;
        unitRepository.delete(u);
        return Boolean.TRUE;
    }

    @Override
    public Boolean deleteLesson(Long id) {
        Lesson l = lessonRepository.findById(id).orElse(null);
        if(l == null)
            return Boolean.FALSE;
        lessonRepository.delete(l);
        return Boolean.TRUE;
    }

    private CourseDTO courseToDTO(Course c) {
        if(c == null)
            return null;
        CourseDTO course = new CourseDTO();
        course.setId(c.getId());
        course.setTitle(c.getTitle());
        course.setDescription(c.getDescription());
        course.setImage(c.getImage());
        course.setPrice(c.getPrice());
        course.setScore(c.getScore());
        course.setIdCategory(c.getCategory().getId());
        course.setCategory(c.getCategory().getName());
        course.setIdTeacher(c.getTeacher().getId());
        course.setTeacher(c.getTeacher().getName() + " " + c.getTeacher().getLastName());
        course.setStatus(c.getStatus());
        course.setTeacherEmail(c.getTeacher().getEmail());
        course.setTeacherPhone(c.getTeacher().getPhone());
        return course;
    }
}
