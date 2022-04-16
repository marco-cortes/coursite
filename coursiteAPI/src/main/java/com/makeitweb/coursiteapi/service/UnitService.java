package com.makeitweb.coursiteapi.service;

import com.makeitweb.coursiteapi.dto.UnitDTO;
import com.makeitweb.coursiteapi.entity.course.Unit;

import java.util.List;

public interface UnitService {
    List<UnitDTO> getUnitsByCourse(Long course);
    UnitDTO saveUnit(UnitDTO unit);
    Boolean deleteUnit(Long id);
}
