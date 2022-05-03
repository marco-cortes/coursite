package com.makeitweb.coursiteapi.controller;

import com.makeitweb.coursiteapi.dto.CourseDTO;
import com.makeitweb.coursiteapi.entity.Document;
import com.makeitweb.coursiteapi.entity.course.Course;
import com.makeitweb.coursiteapi.service.CourseService;
import com.makeitweb.coursiteapi.service.DocumentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/teacher")
@RequiredArgsConstructor
public class TeacherController {

    /*
    *
    * Create new course
    * update courses
    * delete courses
    * upload documents
    * get his courses
    *
    */

    private final CourseService courseService;
    private final DocumentService documentService;

    @PostMapping("/course/new")
    public ResponseEntity<?> addCourse(@RequestBody CourseDTO course) {
        System.out.println(course);
        Map<String, Object> response = new HashMap<>();
        course = courseService.saveCourse(course);
        System.out.println(course);
        if(course == null) {
            response.put("status", 500);
            response.put("error", "Error al guardar el curso. Verifique sus datos.");
            return ResponseEntity.badRequest().body(response);
        }

        response.put("status", 200);
        response.put("course", course);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/course/update/{id}")
    public ResponseEntity<?> saveCourse(@PathVariable Long id, @RequestBody CourseDTO course) {
        Map<String, Object> response = new HashMap<>();

        if(courseService.getCourseById(id) == null) {
            response.put("status", 404);
            response.put("error", "El curso no existe.");
            return ResponseEntity.badRequest().body(response);
        }

        return saveCourse(course, response);
    }

    @DeleteMapping("/course/delete/{id}")
    public ResponseEntity<?> deleteCourse(@PathVariable Long id) {
        Map<String, Object> response = new HashMap<>();

        if(!courseService.deleteCourse(id)) {
            response.put("status", 404);
            response.put("error", "El curso no existe.");
            return ResponseEntity.badRequest().body(response);
        }
        response.put("status", 200);
        response.put("message", "Curso eliminado exitosamente.");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/courses/{id}")
    public ResponseEntity<?> getTeacherCourses(@PathVariable Long id) {
        Map<String, Object> response = new HashMap<>();
        List<Course> courses = courseService.getCoursesByTeacher(id);
        if(courses == null) {
            response.put("status", 404);
            response.put("error", "El profesor no existe.");
            return ResponseEntity.badRequest().body(response);
        }
        response.put("status", 200);
        response.put("courses", courses);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/document/save")
    public ResponseEntity<?> addCourse(@RequestBody Document document) {
        Map<String, Object> response = new HashMap<>();
        document = documentService.save(document);
        if(document == null) {
            response.put("status", 404);
            response.put("error", "El profesor no existe.");
            return  ResponseEntity.badRequest().body(response);
        }
        response.put("status", 200);
        response.put("document", document);
        return ResponseEntity.ok(response);
    }


    private ResponseEntity<?> saveCourse(@RequestBody CourseDTO course, Map<String, Object> response) {
        course = courseService.saveCourse(course);
        if(course == null) {
            response.put("status", 500);
            response.put("error", "Error al guardar el curso. Verifique sus datos.");
            return ResponseEntity.badRequest().body(response);
        }

        response.put("status", 200);
        response.put("course", course);

        return ResponseEntity.ok(response);
    }

}
