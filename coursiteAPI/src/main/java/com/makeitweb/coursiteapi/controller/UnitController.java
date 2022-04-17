package com.makeitweb.coursiteapi.controller;

import com.makeitweb.coursiteapi.dto.UnitDTO;
import com.makeitweb.coursiteapi.service.UnitService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/unit")
@CrossOrigin("*")
@RequiredArgsConstructor
public class UnitController {

    private final UnitService unitService;

    @GetMapping("/{course}")
    public ResponseEntity<List<UnitDTO>> getUnitsByCourse(@PathVariable Long course) {
        return ResponseEntity.ok(unitService.getUnitsByCourse(course));
    }

    @PostMapping("/save")
    public ResponseEntity<UnitDTO> saveUnit(@RequestBody  UnitDTO unit) {
        System.out.println(unit);
        return ResponseEntity.ok(unitService.saveUnit(unit));
    }

    @DeleteMapping("/delete/{unit}")
    public ResponseEntity<Boolean> deleteUnit(@PathVariable Long unit) {
        if(!unitService.deleteUnit(unit))
            return ResponseEntity.notFound().build();
        return ResponseEntity.ok(Boolean.TRUE);
    }

}
