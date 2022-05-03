package com.makeitweb.coursiteapi.service;

import com.makeitweb.coursiteapi.entity.course.Category;

import java.util.List;

public interface CategoryService {
    Category saveCategory(Category category);
    Boolean deleteCategory(Long id);
    List<Category> getAllCategories();
}
