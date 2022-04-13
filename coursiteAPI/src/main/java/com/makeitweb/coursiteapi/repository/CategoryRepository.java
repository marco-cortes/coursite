package com.makeitweb.coursiteapi.repository;

import com.makeitweb.coursiteapi.entity.course.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {
}
