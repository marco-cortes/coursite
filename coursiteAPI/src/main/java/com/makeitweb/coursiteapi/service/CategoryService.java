package com.makeitweb.coursiteapi.service;

import com.makeitweb.coursiteapi.entity.course.Category;

public interface CategoryService {
    Category saveCategory(Category category);
    Boolean deleteCategory(Long id);
}
