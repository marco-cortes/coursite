package com.makeitweb.coursiteapi.service;

import com.makeitweb.coursiteapi.dto.CourseDTO;
import com.makeitweb.coursiteapi.dto.LessonDTO;
import com.makeitweb.coursiteapi.dto.UnitDTO;
import com.makeitweb.coursiteapi.entity.course.Category;
import com.makeitweb.coursiteapi.entity.course.Course;
import com.makeitweb.coursiteapi.entity.course.Lesson;
import com.makeitweb.coursiteapi.entity.course.Unit;
import com.makeitweb.coursiteapi.entity.users.Teacher;
import com.makeitweb.coursiteapi.repository.*;
import com.makeitweb.coursiteapi.helpers.Validation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
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
    public CourseDTO saveCourse(CourseDTO course) {
        Course c = new Course();
        if(course.getId() != null && course.getId() >= 1) {
            c = courseRepository.findById(course.getId()).orElse(null);
            if(c == null)
                return null;
            course.setId(c.getId());
        }

        if(course.getIdTeacher() != null && course.getIdTeacher() >= 1) {
            Teacher t = teacherRepository.findById(course.getIdTeacher()).orElse(null);
            if(t == null)
                return null;
            c.setTeacher(t);
            course.setTeacher(t.getUser().getName() + " " + t.getUser().getLastName());
        }

        if(course.getIdCategory() != null && course.getIdCategory() >= 1) {
            Category ca = categoryRepository.findById(course.getIdCategory()).orElse(null);
            if(ca == null)
                return null;
            c.setCategory(ca);
            course.setCategory(ca.getName());
        }

        if(course.getStatus() == 0 && c.getStatus() != null && c.getStatus() == 1)
            course.setStatus(1);

        Validation.validateCourse(c, course.getTitle(), course.getDescription(), course.getImage(), course.getPrice(), course.getStatus(), course.getScore());

        c = courseRepository.save(c);
        course.setId(c.getId());

        if(course.getUnits() != null && course.getUnits().size() > 0)
            saveUnits(course.getUnits(), c);
        return course;
    }

    @Override
    public Boolean deleteCourse(Long course) {
        Course c = courseRepository.findById(course).orElse(null);
        if(c == null)
            return Boolean.FALSE;
        courseRepository.delete(c);
        return Boolean.TRUE;
    }

    @Override
    public CourseDTO courseById(Long id) {
        Course c = courseRepository.findById(id).orElse(null);
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
        course.setIdTeacher(c.getTeacher().getUser().getId());
        course.setTeacher(c.getTeacher().getUser().getName() + " " + c.getTeacher().getUser().getLastName());
        course.setStatus(c.getStatus());
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
    public List<CourseDTO> allCourses() {
        return getCourseDTOS(courseRepository.findAll());
    }

    @Override
    public List<CourseDTO> coursesByCategory(Long category) {
        return getCourseDTOS(courseRepository.getCoursesByCategory_Id(category));
    }

    @Override
    public List<CourseDTO> coursesByTeacher(Long teacher) {
        return getCourseDTOS(courseRepository.getCoursesByTeacher_Id(teacher));
    }

    @Override
    public List<CourseDTO> coursesByUser(Long user) {
        return getCourseDTOS(courseRepository.getCoursesByUserId(user));
    }

    @Override
    public List<CourseDTO> pendingCourses() {
        return getCourseDTOS(courseRepository.getPendingCourses());
    }

    @Override
    public List<CourseDTO> enabledCourses() {
        return getCourseDTOS(courseRepository.getCourses());
    }

    private void saveUnits(List<UnitDTO> units, Course c) {
        Unit aux = new Unit();
        for (UnitDTO unit: units) {
            aux.setCourse(c);
            unit.setCourse(c.getId());
            Validation.validateUnit(aux, unit.getTitle(), unit.getDescription());
            aux = unitRepository.save(aux);
            unit.setId(aux.getId());
            if(unit.getLessons() != null && unit.getLessons().size() > 0)
                saveLessons(unit.getLessons(), aux);
            aux = new Unit();
        }
    }

    private void saveLessons(List<LessonDTO> lessons, Unit u) {
        Lesson aux = new Lesson();
        for (LessonDTO lesson: lessons) {
            aux.setUnit(u);
            lesson.setUnit(u.getId());
            Validation.validateLesson(aux, lesson.getTitle(), lesson.getDescription(), lesson.getLinkDoc(), lesson.getLinkVideo());
            lesson.setId(lessonRepository.save(aux).getId());
            aux = new Lesson();
        }
    }

    private List<CourseDTO> getCourseDTOS(List<Course> courses) {
        List<CourseDTO> courseDTOS = new ArrayList<>();
        CourseDTO aux = new CourseDTO();
        for (Course c: courses) {
            aux.setId(c.getId());
            aux.setTitle(c.getTitle());
            aux.setDescription(c.getDescription());
            aux.setIdCategory(c.getCategory().getId());
            aux.setCategory(c.getCategory().getName());
            aux.setIdTeacher(c.getTeacher().getId());
            aux.setTeacher(c.getTeacher().getUser().getName() + " " + c.getTeacher().getUser().getLastName());
            aux.setImage(c.getImage());
            aux.setScore(c.getScore());
            aux.setPrice(c.getPrice());
            aux.setStatus(c.getStatus());
            courseDTOS.add(aux);
            aux = new CourseDTO();
        }

        return courseDTOS;
    }
}
