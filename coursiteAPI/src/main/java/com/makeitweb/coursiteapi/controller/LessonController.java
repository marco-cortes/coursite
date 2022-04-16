package com.makeitweb.coursiteapi.controller;

import com.makeitweb.coursiteapi.dto.LessonDTO;
import com.makeitweb.coursiteapi.service.LessonService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/lesson")
@CrossOrigin("*")
public class LessonController {

    private final LessonService lessonService;

    @PostMapping("/save")
    public ResponseEntity<LessonDTO> save(@RequestBody LessonDTO lesson) {
        LessonDTO l = lessonService.save(lesson);
        if(l == null)
            return ResponseEntity.notFound().build();
        return ResponseEntity.ok(l);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Boolean> delete(@PathVariable Long id) {
        if(lessonService.delete(id))
            return ResponseEntity.ok(Boolean.TRUE);
        return ResponseEntity.notFound().build();
    }

}
