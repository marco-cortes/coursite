package com.makeitweb.coursiteapi.service;

import com.makeitweb.coursiteapi.dto.UserCourseDTO;

public interface UserCourseService {
    UserCourseDTO save(UserCourseDTO userCourseDTO);
    UserCourseDTO getProgress(UserCourseDTO userCourseDTO);
}