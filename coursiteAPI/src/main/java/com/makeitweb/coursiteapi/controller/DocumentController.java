package com.makeitweb.coursiteapi.controller;

import com.makeitweb.coursiteapi.dto.DocumentDTO;
import com.makeitweb.coursiteapi.service.DocumentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin("*")
public class DocumentController {

    private final DocumentService documentService;

    @PostMapping("/api/document/save")
    public ResponseEntity<DocumentDTO> saveDocument(@RequestBody DocumentDTO documentDTO) {
        documentDTO = documentService.save(documentDTO);
        if(documentDTO == null)
            return ResponseEntity.notFound().build();
        return ResponseEntity.ok(documentDTO);
    }

    @GetMapping("/api/admin/document/{id}")
    public ResponseEntity<List<DocumentDTO>> getDocuments(@PathVariable Long id) {
        return ResponseEntity.ok(documentService.getDocumentsByTeacher(id));
    }

}
