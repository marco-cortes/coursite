package com.makeitweb.coursiteapi.controller;

import com.makeitweb.coursiteapi.dto.CourseDTO;
import com.makeitweb.coursiteapi.entity.Document;
import com.makeitweb.coursiteapi.entity.course.Category;
import com.makeitweb.coursiteapi.entity.users.User;
import com.makeitweb.coursiteapi.service.CategoryService;
import com.makeitweb.coursiteapi.service.CourseService;
import com.makeitweb.coursiteapi.service.DocumentService;
import com.makeitweb.coursiteapi.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    /*
    *
    * Change status of courses
    * Change status of teachers
    * view all courses
    * view all teachers
    * view stats of app
    * add categories
    * remove categories
    * get categories
    *
    */

    private final CourseService courseService;
    private final UserService userService;
    private final CategoryService categoryService;
    private final DocumentService documentService;

    @PutMapping("/course/{id}/status/{value}")
    public ResponseEntity<?> changeCourseStatus(@PathVariable Long id, @PathVariable Integer value) {
        CourseDTO c = courseService.getCourseById(id);
        Map<String, Object> response = new HashMap<>();

        if(c == null) {
            response.put("status", 404);
            response.put("error", "Curso no encontrado");
            return ResponseEntity.badRequest().body(response);
        }

        c.setStatus(value);

        c = courseService.saveCourse(c);
        response.put("status", 200);
        response.put("course", c);

        return ResponseEntity.ok(response);
    }

    @PutMapping("/teacher/{id}/status/{value}")
    public ResponseEntity<?> changeTeacherStatus(@PathVariable Long id, @PathVariable Integer value) {
        User u = userService.getUserById(id);

        Map<String, Object> response = new HashMap<>();

        if (u ==  null) {
            response.put("status", 404);
            response.put("error", "Profesor no encontrado");
            return ResponseEntity.badRequest().body(response);
        }

        if (u.getRole() == 2) {
            u.setStatus(value);
            u = userService.saveUser(u);
            response.put("status", 200);
            response.put("user", u);
            return ResponseEntity.ok(response);
        }

        response.put("status", 500);
        response.put("error", "El usuario no es un profesor");
        return ResponseEntity.badRequest().body(response);
    }

    @GetMapping("/courses")
    public ResponseEntity<?> getCourses() {
        return ResponseEntity.ok(courseService.getAllCourses());
    }

    @GetMapping("/teachers")
    public ResponseEntity<?> getTeachers() {
        return ResponseEntity.ok(userService.getAllTeachers());
    }

    @GetMapping("/teacher/{id}")
    public ResponseEntity<?> getTeacherById(@PathVariable Long id) {
        User t = userService.getUserById(id);
        List<Document> docs = documentService.getDocumentsByTeacher(id);

        Map<String, Object> response = new HashMap<>();

        response.put("teacher", t);
        response.put("documents", docs);

        return ResponseEntity.ok(response);
    }

    @PostMapping("/category/save")
    public ResponseEntity<?> addCategory(@RequestBody Category category) {
        return ResponseEntity.ok(categoryService.saveCategory(category));
    }

    @PutMapping("/category/update")
    public ResponseEntity<?> updateCategory(@RequestBody Category category) {
        category = categoryService.saveCategory(category);
        if (category == null) {
           return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(category);
    }

    @DeleteMapping("/category/{id}/delete")
    public ResponseEntity<?> deleteCategory(@PathVariable Long id) {
        if(!categoryService.deleteCategory(id)) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(Boolean.TRUE);
    }

}
