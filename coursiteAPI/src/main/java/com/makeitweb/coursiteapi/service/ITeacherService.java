package com.makeitweb.coursiteapi.service;

import com.makeitweb.coursiteapi.entity.Document;
import com.makeitweb.coursiteapi.entity.users.Role;
import com.makeitweb.coursiteapi.entity.users.Teacher;
import com.makeitweb.coursiteapi.entity.users.User;
import com.makeitweb.coursiteapi.repository.DocumentRepository;
import com.makeitweb.coursiteapi.repository.RoleRepository;
import com.makeitweb.coursiteapi.repository.TeacherRepository;
import com.makeitweb.coursiteapi.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class ITeacherService implements TeacherService {

    private final TeacherRepository teacherRepository;
    private final UserRepository userRepository;
    private final DocumentRepository documentRepository;
    private final RoleRepository roleRepository;


    @Override
    public List<Teacher> getTeachers() {
        return teacherRepository.findAll();
    }

    @Override
    public List<Teacher> pendingTeachers() {
        return teacherRepository.getPendingTeachers();
    }

    @Override
    public Teacher getTeacherById(Long id) {
        return teacherRepository.findById(id).orElse(null);
    }

    @Override
    public Teacher saveTeacher(User user) {
        Teacher t = new Teacher();
        t.setStatus(0);
        t.setPhone("##########");
        Role r = roleRepository.findById(2L).orElse(null);
        user.getRoles().add(r);
        t.setUser(userRepository.save(user));
        return teacherRepository.save(t);
    }

    @Override
    public Teacher updateTeacher(Teacher teacher) {
        return teacherRepository.save(teacher);
    }

    @Override
    public Document addDocument(Document document) {
        return documentRepository.save(document);
    }

    @Override
    public Boolean deleteTeacher(Long id) {
        Teacher t = getTeacherById(id);
        if(t == null)
            return false;

        userRepository.delete(t.getUser());
        documentRepository.deleteDocumentsByTeacher(t);
        teacherRepository.delete(t);
        return true;
    }
}

