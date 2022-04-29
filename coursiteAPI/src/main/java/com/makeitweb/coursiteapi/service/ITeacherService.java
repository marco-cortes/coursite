package com.makeitweb.coursiteapi.service;

import com.makeitweb.coursiteapi.dto.TeacherDTO;
import com.makeitweb.coursiteapi.entity.users.Role;
import com.makeitweb.coursiteapi.entity.users.Teacher;
import com.makeitweb.coursiteapi.entity.users.User;
import com.makeitweb.coursiteapi.repository.RoleRepository;
import com.makeitweb.coursiteapi.repository.TeacherRepository;
import com.makeitweb.coursiteapi.repository.UserRepository;
import com.makeitweb.coursiteapi.helpers.Validation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class ITeacherService implements TeacherService {

    private final TeacherRepository teacherRepository;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    @Override
    public List<TeacherDTO> pendingTeachers() {
        return setTeachersDTO(teacherRepository.getPendingTeachers());
    }

    @Override
    public TeacherDTO getTeacherById(Long id) {
        Teacher t = teacherRepository.findTeacherByUser_Id(id);
        if(t == null)
            return null;
        TeacherDTO teacherDTO = new TeacherDTO();
        teacherDTO.setUserId(id);
        teacherDTO.setTeacherId(t.getId());
        teacherDTO.setName(t.getUser().getName());
        teacherDTO.setLastName(t.getUser().getLastName());
        teacherDTO.setEmail(t.getUser().getEmail());
        teacherDTO.setStatus(t.getStatus());
        teacherDTO.setPhone(t.getPhone());
        teacherDTO.setRole(t.getUser().getRole().getId());
        return teacherDTO;
    }

    @Override
    public TeacherDTO saveTeacher(TeacherDTO teacher) {
        Teacher t = new Teacher();
        User u = new User();

        if(teacher.getTeacherId() != null && teacher.getTeacherId() >= 1) {
            t = teacherRepository.findById(teacher.getTeacherId()).orElse(null);
            if(t == null)
                return null;
            u = t.getUser();
        }

        Validation.validateUser(u, teacher.getName(), teacher.getLastName(), teacher.getEmail(), teacher.getPassword());

        if(u.getRole() == null) {
            Role r = roleRepository.findById(2L).orElse(null);
            u.setRole(r);
        }

        Validation.validateTeacher(t, teacher.getPhone(), teacher.getStatus());

        t.setUser(userRepository.save(u));
        teacher.setUserId(t.getId());
        teacher.setTeacherId(teacherRepository.save(t).getId());
        teacher.setPassword(null);
        return teacher;
    }

    @Override
    public Boolean deleteTeacher(Long id) {
        Teacher t = teacherRepository.findById(id).orElse(null);
        if(t == null)
            return Boolean.FALSE;
        teacherRepository.delete(t);
        return Boolean.TRUE;
    }

    private List<TeacherDTO> setTeachersDTO(List<Teacher> teachers) {
        TeacherDTO aux = new TeacherDTO();
        List<TeacherDTO> list = new ArrayList<>();
        for (Teacher teacher : teachers) {
            aux.setUserId(teacher.getUser().getId());
            aux.setTeacherId(teacher.getId());
            aux.setName(teacher.getUser().getName());
            aux.setLastName(teacher.getUser().getLastName());
            aux.setEmail(teacher.getUser().getEmail());
            aux.setRole(teacher.getUser().getRole().getId());
            aux.setPhone(teacher.getPhone());
            aux.setStatus(teacher.getStatus());
            list.add(aux);
            aux = new TeacherDTO();
        }
        return list;
    }


}

