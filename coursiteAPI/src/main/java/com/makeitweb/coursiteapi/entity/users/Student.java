package com.makeitweb.coursiteapi.entity.users;

import com.makeitweb.coursiteapi.entity.CourseStudent;
import com.makeitweb.coursiteapi.entity.Notification;
import lombok.*;
import org.hibernate.Hibernate;

import javax.persistence.*;
import java.util.List;
import java.util.Objects;

@Entity
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    private User user;

    @OneToMany
    @ToString.Exclude
    private List<Notification> notifications;

    @OneToMany(mappedBy = "student", cascade = CascadeType.ALL)
    @ToString.Exclude
    private List<CourseStudent> courseStudents;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        Student student = (Student) o;
        return id != null && Objects.equals(id, student.id);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
