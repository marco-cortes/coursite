package com.makeitweb.coursiteapi.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CourseStudentPK implements Serializable {
    @Column(name="student_id")
    private Long studentId;

    @Column(name="course_id")
    private Long courseId;
}