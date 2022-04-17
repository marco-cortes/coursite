package com.makeitweb.coursiteapi.controller;

import com.makeitweb.coursiteapi.dto.UserCourseDTO;
import com.makeitweb.coursiteapi.service.UserCourseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/usercourse")
@CrossOrigin("*")
public class UserCourseController {

    private final UserCourseService courseService;

    @PostMapping("/save")
    public ResponseEntity<UserCourseDTO> save(@RequestBody UserCourseDTO userCourseDTO) {
        UserCourseDTO u = courseService.save(userCourseDTO);
        if(u == null)
            return ResponseEntity.notFound().build();
        return ResponseEntity.ok(u);
    }

    @GetMapping("/{course}/get-progress/{user}")
    public ResponseEntity<UserCourseDTO> getUserCourse(@PathVariable Long course, @PathVariable Long user) {
        UserCourseDTO u = new UserCourseDTO();
        u.setCourseId(course);
        u.setUserId(user);
        u = courseService.getProgress(u);
        if(u == null)
            return ResponseEntity.notFound().build();
        return ResponseEntity.ok(u);
    }
}
