package com.makeitweb.coursiteapi.entity;

import com.makeitweb.coursiteapi.entity.course.Course;
import com.makeitweb.coursiteapi.entity.users.Student;
import lombok.*;
import org.hibernate.Hibernate;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class CourseStudent {
    @EmbeddedId
    private CourseStudentPK id;

    @Column(nullable = false)
    private Float progress;

    @Column(nullable = false)
    private Float score;

    @JoinColumn(name="student_id")
    @MapsId("studentId")
    @ManyToOne
    private Student student;

    @JoinColumn(name="course_id")
    @MapsId("courseId")
    @ManyToOne
    private Course course;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        CourseStudent that = (CourseStudent) o;
        return id != null && Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}

