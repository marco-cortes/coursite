package com.makeitweb.coursiteapi.service;

import com.makeitweb.coursiteapi.dto.TeacherDTO;
import java.util.List;

public interface TeacherService {
    //List<TeacherDTO> getTeachers();
    List<TeacherDTO> pendingTeachers();
    TeacherDTO getTeacherById(Long id);
    TeacherDTO saveTeacher(TeacherDTO teacher);
    Boolean deleteTeacher(Long id);
}
