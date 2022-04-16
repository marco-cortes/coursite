package com.makeitweb.coursiteapi.controller;

import com.makeitweb.coursiteapi.dto.TeacherDTO;
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
    public ResponseEntity<List<TeacherDTO>> getPendingTeachers() {
        return ResponseEntity.ok(teacherService.pendingTeachers());
    }



    @GetMapping("/{id}")
    public ResponseEntity<TeacherDTO> getTeacherById(@PathVariable Long id) {
        TeacherDTO t = teacherService.getTeacherById(id);
        if(t == null)
            return ResponseEntity.notFound().build();
        return ResponseEntity.ok(t);
    }

    @PostMapping("/new")
    public ResponseEntity<TeacherDTO> newTeacher(@RequestBody TeacherDTO user) {
        return ResponseEntity.ok(teacherService.saveTeacher(user));
    }

    @PutMapping("/update")
    public ResponseEntity<TeacherDTO> updateTeacher(@RequestBody TeacherDTO teacher) {
        if(teacher.getId() == null || teacher.getId() <= 0)
            return ResponseEntity.badRequest().build();
        if(teacherService.getTeacherById(teacher.getId()) == null)
            return ResponseEntity.notFound().build();
        return ResponseEntity.ok(teacherService.saveTeacher(teacher));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Boolean> deleteTeacher(@PathVariable Long id) {
        if(!teacherService.deleteTeacher(id))
            return ResponseEntity.notFound().build();
        return ResponseEntity.ok(Boolean.TRUE);
    }
}
