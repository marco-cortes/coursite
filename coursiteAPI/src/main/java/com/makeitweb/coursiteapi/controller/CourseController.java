package com.makeitweb.coursiteapi.controller;

import com.makeitweb.coursiteapi.entity.course.Course;
import com.makeitweb.coursiteapi.service.CourseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/course")
@CrossOrigin("*")
public class CourseController {

    private final CourseService courseService;

    @PostMapping("/new")
    public ResponseEntity<Course> newCourse(@RequestBody Course course) {
        return ResponseEntity.ok(courseService.saveCourse(course));
    }

    @PutMapping("/update")
    public ResponseEntity<Course> updateCourse(@RequestBody Course course) {
        if(course.getId() == null || course.getId() <= 0)
            return ResponseEntity.badRequest().build();
        Course c = courseService.courseById(course.getId());
        if(c == null)
            return ResponseEntity.notFound().build();
        return ResponseEntity.ok(courseService.saveCourse(course));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Course> courseById(@PathVariable Long id) {
        Course c = courseService.courseById(id);
        if(c == null)
            return ResponseEntity.notFound().build();
        return ResponseEntity.ok(c);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Boolean> deleteCourse(@PathVariable Long id) {
        if(!courseService.deleteCourse(id))
            return ResponseEntity.notFound().build();
        return ResponseEntity.ok(Boolean.TRUE);
    }

    @GetMapping("/")
    public ResponseEntity<List<Course>> getAll() {
        return ResponseEntity.ok(courseService.allCourses());
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<List<Course>> getByCategory(@PathVariable  Long category) {
        List<Course> list = courseService.coursesByCategory(category);
        if(list == null)
            return ResponseEntity.notFound().build();
        return ResponseEntity.ok(list);
    }

    @GetMapping("/pending")
    public ResponseEntity<List<Course>> getPending(){
        List<Course> list = courseService.pendingCourses();
        if(list == null)
            return ResponseEntity.notFound().build();
        return ResponseEntity.ok(list);
    }

    @GetMapping("/user/{user}")
    public ResponseEntity<List<Course>> getUserCourses(@PathVariable  Long user) {
        List<Course> list = courseService.coursesByUser(user);
        if(list == null)
            return ResponseEntity.notFound().build();
        return ResponseEntity.ok(list);
    }

    @GetMapping("/teacher/{teacher}")
    public ResponseEntity<List<Course>> getTeacherCourses(@PathVariable  Long teacher) {
        List<Course> list = courseService.coursesByTeacher(teacher);
        if(list == null)
            return ResponseEntity.notFound().build();
        return ResponseEntity.ok(list);
    }

}
