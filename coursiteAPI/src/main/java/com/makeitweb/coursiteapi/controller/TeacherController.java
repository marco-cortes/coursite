package com.makeitweb.coursiteapi.controller;

import com.makeitweb.coursiteapi.dto.TeacherDTO;
import com.makeitweb.coursiteapi.service.TeacherService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequiredArgsConstructor
public class TeacherController {

    private final TeacherService teacherService;

    @GetMapping("/api/admin/teacher/")
    public ResponseEntity<List<TeacherDTO>> getPendingTeachers() {
        return ResponseEntity.ok(teacherService.pendingTeachers());
    }

    @GetMapping("/api/teacher/{id}")
    public ResponseEntity<TeacherDTO> getTeacherById(@PathVariable Long id) {
        TeacherDTO t = teacherService.getTeacherById(id);
        if(t == null)
            return ResponseEntity.notFound().build();
        return ResponseEntity.ok(t);
    }

    @PostMapping("/api/teacher/new")
    public ResponseEntity<TeacherDTO> newTeacher(@RequestBody TeacherDTO user) {
        return ResponseEntity.ok(teacherService.saveTeacher(user));
    }

    @PutMapping("/api/teacher/update")
    public ResponseEntity<TeacherDTO> updateTeacher(@RequestBody TeacherDTO teacher) {
        if(teacher.getUserId() == null || teacher.getUserId() <= 0)
            return ResponseEntity.badRequest().build();
        if(teacherService.getTeacherById(teacher.getUserId()) == null)
            return ResponseEntity.notFound().build();
        return ResponseEntity.ok(teacherService.saveTeacher(teacher));
    }

    @DeleteMapping("/api/teacher/delete/{id}")
    public ResponseEntity<Boolean> deleteTeacher(@PathVariable Long id) {
        if(!teacherService.deleteTeacher(id))
            return ResponseEntity.notFound().build();
        return ResponseEntity.ok(Boolean.TRUE);
    }
}
