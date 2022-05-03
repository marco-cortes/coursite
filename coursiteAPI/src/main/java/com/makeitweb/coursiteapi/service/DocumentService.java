package com.makeitweb.coursiteapi.service;

import com.makeitweb.coursiteapi.entity.Document;

import java.util.List;

public interface DocumentService {
    Document save(Document document);
    List<Document> getDocumentsByTeacher(Long teacher);
}
