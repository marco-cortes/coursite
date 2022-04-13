package com.makeitweb.coursiteapi.controller;

import com.makeitweb.coursiteapi.entity.Document;
import com.makeitweb.coursiteapi.entity.users.Teacher;
import com.makeitweb.coursiteapi.entity.users.User;
import com.makeitweb.coursiteapi.service.TeacherService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/teacher")
@RequiredArgsConstructor
public class TeacherController {

    private final TeacherService teacherService;

    @GetMapping("/")
    public ResponseEntity<List<Teacher>> getTeachers() {
        return ResponseEntity.ok(teacherService.getTeachers());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Teacher> getTeacherById(@PathVariable Long id) {
        Teacher t = teacherService.getTeacherById(id);
        if(t == null)
            return ResponseEntity.notFound().build();
        return ResponseEntity.ok(t);
    }

    @PostMapping("/new")
    public ResponseEntity<Teacher> newTeacher(@RequestBody User user) {
        return ResponseEntity.ok(teacherService.saveTeacher(user));
    }

    @PutMapping("/update")
    public ResponseEntity<Teacher> updateTeacher(@RequestBody Teacher teacher) {
        if(teacher.getId() == null || teacher.getId() <= 0)
            return ResponseEntity.badRequest().build();
        if(teacherService.getTeacherById(teacher.getId()) == null)
            return ResponseEntity.notFound().build();
        return ResponseEntity.ok(teacherService.updateTeacher(teacher));
    }

    @PostMapping("/document/new")
    public ResponseEntity<Document> addDoc(@RequestBody Document document) {
        return ResponseEntity.ok(teacherService.addDocument(document));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Boolean> deleteTeacher(@PathVariable Long id) {
        if(!teacherService.deleteTeacher(id))
            return ResponseEntity.notFound().build();
        return ResponseEntity.ok(Boolean.TRUE);
    }
}
