package com.makeitweb.coursiteapi.service;

import com.makeitweb.coursiteapi.dto.DocumentDTO;

import java.util.List;

public interface DocumentService {
    DocumentDTO save(DocumentDTO document);
    List<DocumentDTO> getDocumentsByTeacher(Long teacher);
}
