package com.makeitweb.coursiteapi.service;

import com.makeitweb.coursiteapi.dto.LessonDTO;
import com.makeitweb.coursiteapi.entity.course.Lesson;
import com.makeitweb.coursiteapi.entity.course.Unit;
import com.makeitweb.coursiteapi.helpers.Validation;
import com.makeitweb.coursiteapi.repository.LessonRepository;
import com.makeitweb.coursiteapi.repository.UnitRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class ILessonService implements LessonService{

    private final LessonRepository lessonRepository;
    private final UnitRepository unitRepository;

    @Override
    public LessonDTO save(LessonDTO lessonDTO) {
        Lesson lesson = new Lesson();
        if(lessonDTO.getId() != null && lessonDTO.getId() >= 1) {
            lesson = lessonRepository.findById(lessonDTO.getId()).orElse(null);
            if(lesson == null)
                return null;
            lessonDTO.setId(lesson.getId());
        }

        if(lesson.getUnit() != null && !lesson.getUnit().getId().equals(lessonDTO.getUnit()))
            return null;

        if(lesson.getUnit() == null) {
            Unit u = unitRepository.findById(lessonDTO.getUnit()).orElse(null);
            if(u == null)
                return null;
            lesson.setUnit(u);
        }

        Validation.validateLesson(lesson, lessonDTO.getTitle(), lessonDTO.getDescription(), lessonDTO.getLinkDoc(), lessonDTO.getLinkVideo());
        lessonDTO.setId(lessonRepository.save(lesson).getId());
        return lessonDTO;
    }

    @Override
    public Boolean delete(Long id) {
        Lesson lesson = lessonRepository.findById(id).orElse(null);
        if(lesson == null)
            return Boolean.FALSE;
        lessonRepository.delete(lesson);
        return Boolean.TRUE;
    }
}
