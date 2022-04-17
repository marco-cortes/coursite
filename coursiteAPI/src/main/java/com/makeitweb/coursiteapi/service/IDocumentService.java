package com.makeitweb.coursiteapi.service;

import com.makeitweb.coursiteapi.dto.DocumentDTO;
import com.makeitweb.coursiteapi.entity.Document;
import com.makeitweb.coursiteapi.entity.users.Teacher;
import com.makeitweb.coursiteapi.helpers.Validation;
import com.makeitweb.coursiteapi.repository.DocumentRepository;
import com.makeitweb.coursiteapi.repository.TeacherRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class IDocumentService implements DocumentService{

    private final DocumentRepository documentRepository;
    private final TeacherRepository teacherRepository;

    @Override
    public DocumentDTO save(DocumentDTO document) {
        Document doc = new Document();
        Teacher teacher;
        if(document.getId() != null && document.getId() >= 1) {
            doc = documentRepository.findById(document.getId()).orElse(null);
            if(doc == null)
                return null;
        }
        if(document.getTeacher() != null && document.getTeacher() >= 1) {
            teacher = teacherRepository.findById(document.getId()).orElse(null);
            if(teacher == null)
                return null;
            if(doc.getTeacher() == null)
                doc.setTeacher(teacher);
        }
        Validation.validateDocument(doc, document.getName(), document.getUrl());
        document.setId(documentRepository.save(doc).getId());
        return document;
    }

    @Override
    public List<DocumentDTO> getDocumentsByTeacher(Long teacher) {
        List<Document> docs = documentRepository.findDocumentsByTeacher_Id(teacher);
        List<DocumentDTO> documents = new ArrayList<>();
        DocumentDTO document = new DocumentDTO();
        for (Document doc: docs) {
            document.setId(doc.getId());
            document.setName(doc.getName());
            document.setUrl(doc.getUrl());
            document.setTeacher(doc.getTeacher().getId());
            documents.add(document);
            document = new DocumentDTO();
        }
        return documents;
    }
}
