package com.makeitweb.coursiteapi.service;

import com.makeitweb.coursiteapi.entity.course.Category;

public interface CategoryService {
    Category save(Category category);
    Boolean delete(Long id);
}
