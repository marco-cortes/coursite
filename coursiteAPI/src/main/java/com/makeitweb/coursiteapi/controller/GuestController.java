package com.makeitweb.coursiteapi.controller;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.makeitweb.coursiteapi.dto.CourseDTO;
import com.makeitweb.coursiteapi.entity.course.Course;
import com.makeitweb.coursiteapi.entity.users.User;
import com.makeitweb.coursiteapi.service.CategoryService;
import com.makeitweb.coursiteapi.service.CourseService;
import com.makeitweb.coursiteapi.service.UserService;
import com.makeitweb.coursiteapi.util.Keys;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URI;
import java.util.*;

@RestController
@CrossOrigin("*")
@RequestMapping("/api")
@RequiredArgsConstructor
public class GuestController {
    /*
     *
     * Get available courses
     * view course details
     * login
     * register
     *
     */

    private final CourseService courseService;
    private final UserService userService;
    private final CategoryService categoryService;

    @GetMapping("/courses")
    public ResponseEntity<List<Course>> getAvailableCourses() {
        return ResponseEntity.ok(courseService.getAvailableCourses());
    }

    @GetMapping("/course/{id}")
    public ResponseEntity<CourseDTO> geCourse(@PathVariable Long id) {
        CourseDTO c = courseService.getAllCourseById(id);
        if(c == null)
            return ResponseEntity.notFound().build();
        return ResponseEntity.ok(c);
    }

    @GetMapping("/categories")
    public ResponseEntity<?> getCategories() {
        return ResponseEntity.ok(categoryService.getAllCategories());
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user){
        if(userService.getUserByEmail(user.getEmail()) != null) {
            Map<String, String> status = new HashMap<>();
            status.put("error", "El correo ya está registrado.");
            return ResponseEntity.badRequest().body(status);
        }

        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/user/new").toUriString());
        return ResponseEntity.created(uri).body(userService.saveUser(user));
    }

    @GetMapping("/token/refresh")
    public void refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String authorizationHeader = request.getHeader(HttpHeaders.AUTHORIZATION);

        if(authorizationHeader != null && authorizationHeader.startsWith(Keys.start)) {
            try {
                String refresh_token = authorizationHeader.substring(Keys.start.length());
                Algorithm algorithm = Algorithm.HMAC256(Keys.secret.getBytes());
                JWTVerifier verifier = JWT.require(algorithm).build();
                DecodedJWT decodedJWT = verifier.verify(refresh_token);
                String email = decodedJWT.getSubject();
                User user = userService.getUserByEmail(email);

                String access_token = JWT.create()
                        .withSubject(user.getEmail())
                        .withExpiresAt(new Date(System.currentTimeMillis() + Keys.jwtDuration))
                        .withIssuer(request.getRequestURL().toString())
                        .withClaim("roles", setRoles(user.getRole()))
                        .sign(algorithm);

                Map<String, String> tokens = new HashMap<>();
                tokens.put("access_token", Keys.start + access_token);
                tokens.put("refresh_token", Keys.start + refresh_token);

                response.setContentType(MediaType.APPLICATION_JSON_VALUE);
                new ObjectMapper().writeValue(response.getOutputStream(), tokens);

            } catch(Exception exception) {
                response.setHeader("error", exception.getMessage());
                response.setStatus(HttpStatus.FORBIDDEN.value());
                Map<String, String> error = new HashMap<>();
                error.put("error_message", exception.getMessage());
                response.setContentType(MediaType.APPLICATION_JSON_VALUE);
                new ObjectMapper().writeValue(response.getOutputStream(), error);
            }
        } else {
            throw new RuntimeException("Refresh token is missing");
        }
    }

    private List<String> setRoles(Integer id) {
        List<String> roles = new ArrayList<>();
        if (id == 1) {
            roles.add("ROLE_USER");
        }
        else if (id == 2) {
            roles.add("ROLE_USER");
            roles.add("ROLE_TEACHER");
        } else if (id == 3) {
            roles.add("ROLE_USER");
            roles.add("ROLE_TEACHER");
            roles.add("ROLE_ADMIN");
        }
        return roles;
    }
}
