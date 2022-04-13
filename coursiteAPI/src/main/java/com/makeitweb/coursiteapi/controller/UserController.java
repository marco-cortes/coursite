package com.makeitweb.coursiteapi.controller;

import com.makeitweb.coursiteapi.entity.UserCourse;
import com.makeitweb.coursiteapi.entity.course.Course;
import com.makeitweb.coursiteapi.entity.users.User;
import com.makeitweb.coursiteapi.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        User u = userService.getUserById(id);
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
        if(userService.getUserById(user.getId()) == null)
            return ResponseEntity.notFound().build();
        return ResponseEntity.ok(userService.saveUser(user));
    }

    @GetMapping("/courses/{id}")
    public ResponseEntity<List<Course>> getUserCourses(@PathVariable Long id) {
        List<Course> list = userService.getCourses(id);
        if(list == null)
            return ResponseEntity.notFound().build();
        return ResponseEntity.ok(list);
    }

    @PostMapping("/courses/{id}/buy")
    public ResponseEntity<UserCourse> buyCourse(Long user, @PathVariable Long id) {
        UserCourse uc = userService.buyCourse(user, id);
        if(uc == null)
            return ResponseEntity.notFound().build();
        return ResponseEntity.ok(uc);
    }


}
