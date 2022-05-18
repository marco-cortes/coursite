package com.makeitweb.coursiteapi.entity;

import com.makeitweb.coursiteapi.entity.course.Course;
import com.makeitweb.coursiteapi.entity.course.Lesson;
import com.makeitweb.coursiteapi.entity.users.User;
import lombok.*;
import org.hibernate.Hibernate;

import javax.persistence.*;
import java.util.Objects;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class UserLesson {

    @EmbeddedId
    private UserLessonPK id;

    private Boolean status = false;

    @JoinColumn(name="user_id")
    @MapsId("userId")
    @ManyToOne
    private User user;

    @JoinColumn(name="lesson_id")
    @MapsId("lessonId")
    @ManyToOne
    private Lesson lesson;

    @JoinColumn(name="course_id")
    @MapsId("courseId")
    @ManyToOne
    private Course course;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        UserLesson that = (UserLesson) o;
        return id != null && Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
