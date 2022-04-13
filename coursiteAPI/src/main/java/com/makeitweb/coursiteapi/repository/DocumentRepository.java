package com.makeitweb.coursiteapi.repository;

import com.makeitweb.coursiteapi.entity.Document;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DocumentRepository extends JpaRepository<Document, Long> {
}
