package com.makeitweb.coursiteapi.controller;

import com.makeitweb.coursiteapi.dto.UserCourseDTO;
import com.makeitweb.coursiteapi.entity.course.Course;
import com.makeitweb.coursiteapi.entity.users.User;
import com.makeitweb.coursiteapi.service.CourseService;
import com.makeitweb.coursiteapi.service.UserCourseService;
import com.makeitweb.coursiteapi.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {

    /*
    *
    * Update data user
    * Get data user
    * Delete user
    * Buy a new Course
    * Get info of course bought
    * Get bought courses
    * Change password
    *
    */

    private final UserService userService;
    private final CourseService courseService;
    private final UserCourseService userCourseService;

    @GetMapping("/{email}")
    public ResponseEntity<User> getUserById(@PathVariable String email) {
        User u = userService.getUserByEmail(email);
        if(u == null)
            return ResponseEntity.notFound().build();
        return ResponseEntity.ok(u);
    }
    @PostMapping("/new")
    public ResponseEntity<User> newUser(@RequestBody User user) {
        return ResponseEntity.ok(userService.saveUser(user));
    }
    @PutMapping("/update")
    public ResponseEntity<User> updateUser(@RequestBody User user) {
        if(user.getId() == null || user.getId() <= 0)
            return ResponseEntity.badRequest().build();
        if(userService.getUserByEmail(user.getEmail()) == null)
            return ResponseEntity.notFound().build();
       return ResponseEntity.ok(userService.saveUser(user));
    }

    @PutMapping("/update-password/{id}")
    public ResponseEntity<?> updatePassword(@PathVariable Long id, @RequestBody User user) {
        Map<String, Object> response = new HashMap<>();

        user =  userService.changePassword(id, user.getPassword());

        if(user == null) {
            response.put("status", 404);
            response.put("error", "El usuario no existe.");
            return ResponseEntity.badRequest().body(response);
        }

        response.put("status", 200);
        response.put("user", user);

        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Boolean> deleteUser(@PathVariable Long id) {
        if(!userService.deleteUser(id))
            return ResponseEntity.notFound().build();
        return ResponseEntity.ok(Boolean.TRUE);
    }

    @GetMapping("/{id}/courses")
    public ResponseEntity<List<UserCourseDTO>> getStudentCourses(@PathVariable Long id) {
        System.out.println(id);
        return ResponseEntity.ok(courseService.getCoursesByStudent(id));
    }

    @PostMapping("/course/save")
    public ResponseEntity<UserCourseDTO> save(@RequestBody UserCourseDTO userCourseDTO) {
        UserCourseDTO u = userCourseService.save(userCourseDTO);
        if(u == null)
            return ResponseEntity.notFound().build();
        return ResponseEntity.ok(u);
    }

    @GetMapping("/course/{course}/info/{user}")
    public ResponseEntity<UserCourseDTO> getUserCourse(@PathVariable Long course, @PathVariable Long user) {
        UserCourseDTO u = new UserCourseDTO();
        u.setCourseId(course);
        u.setUserId(user);
        u = userCourseService.getProgress(u);
        if(u == null)
            return ResponseEntity.notFound().build();
        return ResponseEntity.ok(u);
    }



}
