package com.makeitweb.coursiteapi.service;

import com.makeitweb.coursiteapi.entity.course.Category;
import com.makeitweb.coursiteapi.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class ICategoryService implements CategoryService {

    private final CategoryRepository categoryRepository;

    @Override
    public Category saveCategory(Category category) {
        return categoryRepository.save(category);
    }

    @Override
    public Boolean deleteCategory(Long id) {
        Category c = categoryRepository.findById(id).orElse(null);
        if(c == null)
            return  Boolean.FALSE;
        categoryRepository.delete(c);
        return Boolean.TRUE;
    }

    @Override
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }
}
