package com.makeitweb.coursiteapi.service;

import com.makeitweb.coursiteapi.entity.Document;
import com.makeitweb.coursiteapi.repository.DocumentRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class IDocumentService implements DocumentService {

    private final DocumentRepository documentRepository;

    @Override
    public Document save(Document document) {
        return documentRepository.save(document);
    }

    @Override
    public List<Document> getDocumentsByTeacher(Long teacher) {
        return documentRepository.findDocumentsByTeacher_Id(teacher);
    }
}
