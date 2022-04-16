package com.makeitweb.coursiteapi.service;

import com.makeitweb.coursiteapi.dto.LessonDTO;
import com.makeitweb.coursiteapi.entity.course.Lesson;
import com.makeitweb.coursiteapi.helpers.Validation;
import com.makeitweb.coursiteapi.repository.LessonRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class ILessonService implements LessonService{

    private final LessonRepository lessonRepository;

    @Override
    public LessonDTO save(LessonDTO lessonDTO) {
        Lesson lesson = new Lesson();
        if(lessonDTO.getId() != null && lessonDTO.getId() >= 1) {
            lesson = lessonRepository.findById(lessonDTO.getId()).orElse(null);
            if(lesson == null)
                return null;
            lessonDTO.setId(lesson.getId());
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
