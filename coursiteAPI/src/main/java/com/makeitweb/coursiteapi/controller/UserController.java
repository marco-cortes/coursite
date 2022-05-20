package com.makeitweb.coursiteapi.controller;

import com.makeitweb.coursiteapi.dto.UserCourseDTO;
import com.makeitweb.coursiteapi.entity.UserLesson;
import com.makeitweb.coursiteapi.entity.users.User;
import com.makeitweb.coursiteapi.service.CourseService;
import com.makeitweb.coursiteapi.service.DocumentService;
import com.makeitweb.coursiteapi.service.UserCourseService;
import com.makeitweb.coursiteapi.service.UserService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@CrossOrigin(origins = "https://coursite-api.web.app/")
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
    private final DocumentService documentService;

    @GetMapping("/{email}")
    public ResponseEntity<?> getUserById(@PathVariable String email) {
        Map<String, Object> response = new HashMap<>();



        User u = userService.getUserByEmail(email);
        if(u == null)
            return ResponseEntity.notFound().build();

        response.put("user", u);

        if(u.getRole() == 2) {
            response.put("docs", documentService.getDocumentsByTeacher(u.getId()));
        }

        return ResponseEntity.ok(response);
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
        u.setCourse(courseService.getCourseById(u.getCourseId()));
        return ResponseEntity.ok(u);
    }

    @GetMapping("/course/{course}/lessons/{user}")
    public ResponseEntity<?> getLessonsByUser(@PathVariable Long user, @PathVariable Long course) {
        return ResponseEntity.ok(userCourseService.getLessonsUser(user, course));
    }

    @PostMapping("/lesson/save")
    public ResponseEntity<?> setStatusLesson(@RequestBody statusLesson sl) {
        UserLesson ul = userCourseService.setLessonStatus(sl.getIdUser(), sl.idCourse, sl.idLesson, sl.getStatus());
        if(ul == null)
            return ResponseEntity.notFound().build();
        return ResponseEntity.ok(ul);
    }
}

@Data
class statusLesson {
    Long idLesson;
    Long idUser;
    Long idCourse;
    Boolean status;
}
