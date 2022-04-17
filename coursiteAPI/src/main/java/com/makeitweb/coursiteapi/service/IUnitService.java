package com.makeitweb.coursiteapi.service;

import com.makeitweb.coursiteapi.dto.LessonDTO;
import com.makeitweb.coursiteapi.dto.UnitDTO;
import com.makeitweb.coursiteapi.entity.course.Course;
import com.makeitweb.coursiteapi.entity.course.Lesson;
import com.makeitweb.coursiteapi.entity.course.Unit;
import com.makeitweb.coursiteapi.helpers.Validation;
import com.makeitweb.coursiteapi.repository.CourseRepository;
import com.makeitweb.coursiteapi.repository.LessonRepository;
import com.makeitweb.coursiteapi.repository.UnitRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class IUnitService implements UnitService {

    private final UnitRepository unitRepository;
    private final LessonRepository lessonRepository;
    private final CourseRepository courseRepository;

    @Override
    public List<UnitDTO> getUnitsByCourse(Long course) {
        List<Unit> units = unitRepository.getUnitsByCourse_Id(course);
        List<UnitDTO> unitDTOList = new ArrayList<>();
        UnitDTO unitDTO = new UnitDTO();
        for (Unit u:units) {
            unitDTO.setId(u.getId());
            unitDTO.setCourse(u.getCourse().getId());
            unitDTO.setTitle(u.getTitle());
            unitDTO.setDescription(u.getDescription());
            List<LessonDTO> lessonDTOS = new ArrayList<>();
            List<Lesson> lessons = lessonRepository.getLessonsByUnit_Id(u.getId());
            LessonDTO lessonDTO = new LessonDTO();
            for (Lesson l:lessons) {
                lessonDTO.setUnit(unitDTO.getId());
                lessonDTO.setTitle(l.getTitle());
                lessonDTO.setDescription(l.getDescription());
                lessonDTO.setLinkDoc(l.getLinkDoc());
                lessonDTO.setLinkVideo(l.getLinkVideo());
                lessonDTO.setId(l.getId());
                lessonDTOS.add(lessonDTO);
                lessonDTO = new LessonDTO();
            }
            unitDTO.setLessons(lessonDTOS);
            unitDTOList.add(unitDTO);
            unitDTO = new UnitDTO();
        }
        return unitDTOList;
    }

    @Override
    public UnitDTO saveUnit(UnitDTO unit) {
        Unit u = new Unit();
        if(unit.getId() != null && unit.getId() >= 1) {
            u = unitRepository.findById(unit.getId()).orElse(null);
            if(u == null)
                return null;
        }
        if(u.getCourse() != null && !unit.getCourse().equals(u.getCourse().getId()))
            return null;
        if(u.getCourse() == null) {
            Course c = courseRepository.findById(unit.getCourse()).orElse(null);
            if(c == null)
                return null;
            u.setCourse(c);
        }
        Validation.validateUnit(u, unit.getTitle(), unit.getDescription());
        unit.setId(unitRepository.save(u).getId());
        return unit;
    }

    @Override
    public Boolean deleteUnit(Long id) {
        Unit u = unitRepository.findById(id).orElse(null);
        if(u == null)
            return Boolean.FALSE;
        lessonRepository.deleteByUnit(u);
        unitRepository.delete(u);
        return Boolean.TRUE;
    }
}
