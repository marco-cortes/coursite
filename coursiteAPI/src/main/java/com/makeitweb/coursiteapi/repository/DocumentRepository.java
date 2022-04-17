package com.makeitweb.coursiteapi.repository;

import com.makeitweb.coursiteapi.entity.Document;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DocumentRepository extends JpaRepository<Document, Long> {

    List<Document> findDocumentsByTeacher_Id(Long teacherId);
    void deleteDocumentsByTeacher_Id(Long teacherId);
}
