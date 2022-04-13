package com.makeitweb.coursiteapi.service;

import com.makeitweb.coursiteapi.entity.Document;
import com.makeitweb.coursiteapi.entity.users.Teacher;
import com.makeitweb.coursiteapi.entity.users.User;

import java.util.List;

public interface TeacherService {
    List<Teacher> getTeachers();
    Teacher getTeacherById(Long id);
    Teacher saveTeacher(User user);
    Teacher updateTeacher(Teacher teacher);
    Document addDocument(Document document);
    Boolean deleteTeacher(Long id);
}
