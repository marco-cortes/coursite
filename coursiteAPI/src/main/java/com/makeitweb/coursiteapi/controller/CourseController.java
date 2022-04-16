package com.makeitweb.coursiteapi.controller;

import com.makeitweb.coursiteapi.dto.CourseDTO;
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
    public ResponseEntity<CourseDTO> newCourse(@RequestBody CourseDTO course) {
        return ResponseEntity.ok(courseService.saveCourse(course));
    }

    @PutMapping("/update")
    public ResponseEntity<CourseDTO> updateCourse(@RequestBody CourseDTO course) {
        if(course.getId() == null || course.getId() <= 0)
            return ResponseEntity.badRequest().build();
        CourseDTO c = courseService.courseById(course.getId());
        if(c == null)
            return ResponseEntity.notFound().build();
        return ResponseEntity.ok(courseService.saveCourse(course));
    }

    @GetMapping("/{id}")
    public ResponseEntity<CourseDTO> courseById(@PathVariable Long id) {
        CourseDTO c = courseService.courseById(id);
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
    public ResponseEntity<List<CourseDTO>> getAll() {
        return ResponseEntity.ok(courseService.allCourses());
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<List<CourseDTO>> getByCategory(@PathVariable  Long category) {
        List<CourseDTO> list = courseService.coursesByCategory(category);
        if(list == null)
            return ResponseEntity.notFound().build();
        return ResponseEntity.ok(list);
    }

    @GetMapping("/pending")
    public ResponseEntity<List<CourseDTO>> getPending(){
        List<CourseDTO> list = courseService.pendingCourses();
        if(list == null)
            return ResponseEntity.notFound().build();
        return ResponseEntity.ok(list);
    }

    @GetMapping("/user/{user}")
    public ResponseEntity<List<CourseDTO>> getUserCourses(@PathVariable  Long user) {
        List<CourseDTO> list = courseService.coursesByUser(user);
        if(list == null)
            return ResponseEntity.notFound().build();
        return ResponseEntity.ok(list);
    }

    @GetMapping("/teacher/{teacher}")
    public ResponseEntity<List<CourseDTO>> getTeacherCourses(@PathVariable  Long teacher) {
        List<CourseDTO> list = courseService.coursesByTeacher(teacher);
        if(list == null)
            return ResponseEntity.notFound().build();
        return ResponseEntity.ok(list);
    }

}
