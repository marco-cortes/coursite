package com.makeitweb.coursiteapi.controller;

import com.makeitweb.coursiteapi.dto.UserDTO;
import com.makeitweb.coursiteapi.entity.UserCourse;
import com.makeitweb.coursiteapi.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> getUserById(@PathVariable Long id) {
        UserDTO u = userService.getUserById(id);
        if(u == null)
            return ResponseEntity.notFound().build();
        return ResponseEntity.ok(u);
    }

    @PostMapping("/new")
    public ResponseEntity<UserDTO> newUser(@RequestBody UserDTO user) {
        return ResponseEntity.ok(userService.saveUser(user));
    }

    @PutMapping("/update")
    public ResponseEntity<UserDTO> updateUser(@RequestBody UserDTO user) {
        if(user.getId() == null || user.getId() <= 0)
            return ResponseEntity.badRequest().build();
        if(userService.getUserById(user.getId()) == null)
            return ResponseEntity.notFound().build();
        return ResponseEntity.ok(userService.saveUser(user));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Boolean> deleteUser(@PathVariable Long id) {
        if(!userService.deleteUser(id))
            return ResponseEntity.notFound().build();
        return ResponseEntity.ok(Boolean.TRUE);
    }

    @PostMapping("/{user}/buy/{id}")
    public ResponseEntity<UserCourse> buyCourse(@PathVariable Long user, @PathVariable Long id) {
        /* * UserCourse uc = userService.buyCourse(user, id);
        if(uc == null)
            return ResponseEntity.notFound().build();*/
        return ResponseEntity.ok().build();
    }


}
