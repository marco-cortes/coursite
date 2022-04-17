package com.makeitweb.coursiteapi.controller;


import com.makeitweb.coursiteapi.entity.course.Category;
import com.makeitweb.coursiteapi.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@CrossOrigin
@RequestMapping("/api/admin/category")
public class CategoryController {

    private final CategoryService categoryService;

    @PostMapping("/save")
    public ResponseEntity<Category> save(Category c) {
        return ResponseEntity.ok(categoryService.saveCategory(c));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Boolean> delete(@PathVariable Long id) {
        if(categoryService.deleteCategory(id))
            return ResponseEntity.ok(Boolean.TRUE);
        return ResponseEntity.notFound().build();
    }


}
