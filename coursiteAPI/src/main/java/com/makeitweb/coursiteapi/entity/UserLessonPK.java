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
public class UserLessonPK  implements Serializable {
    @Column(name="user_id")
    private Long userId;

    @Column(name="course_id")
    private Long courseId;

    @Column(name="lesson_id")
    private Long lessonId;
}
