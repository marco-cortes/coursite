package com.makeitweb.coursiteapi.repository;

import com.makeitweb.coursiteapi.entity.Document;
import com.makeitweb.coursiteapi.entity.users.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DocumentRepository extends JpaRepository<Document, Long> {

    List<Document> findDocumentsByTeacher(Teacher t);
    void deleteDocumentsByTeacher(Teacher t);
}
