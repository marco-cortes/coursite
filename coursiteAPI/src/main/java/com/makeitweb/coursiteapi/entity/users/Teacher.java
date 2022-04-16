package com.makeitweb.coursiteapi.entity.users;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.makeitweb.coursiteapi.entity.Document;
import com.makeitweb.coursiteapi.entity.course.Course;
import lombok.*;
import org.hibernate.Hibernate;

import javax.persistence.*;
import java.util.List;
import java.util.Objects;

@Entity
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class Teacher {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JoinColumn(nullable = false, unique = true)
    @OneToOne(cascade = CascadeType.ALL)
    private User user;

    private String phone;
    private Integer status;

    /* *@OneToMany(mappedBy = "teacher", cascade = CascadeType.ALL)
    @ToString.Exclude
    private List<Course> courses;

    @OneToMany(mappedBy = "teacher", cascade = CascadeType.ALL)
    @ToString.Exclude
    private List<Document> documents;*/

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        Teacher teacher = (Teacher) o;
        return id != null && Objects.equals(id, teacher.id);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
