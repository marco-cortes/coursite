package com.makeitweb.coursiteapi.entity.course;

import com.makeitweb.coursiteapi.entity.CourseStudent;
import com.makeitweb.coursiteapi.entity.users.Teacher;
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
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String tittle;
    @Column(nullable = false)
    private String description;
    @Column(nullable = false)
    private String image;
    @Column(nullable = false)
    private Float price;
    @Column(nullable = false)
    private Integer score;
    @Column(nullable = false)
    private Integer status;

    @JoinColumn(nullable = false)
    @ManyToOne
    private Teacher teacher;

    @JoinColumn(nullable = false)
    @ManyToOne
    @ToString.Exclude
    private Category category;

    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL)
    @ToString.Exclude
    private List<CourseStudent> courseStudents;

    @OneToMany(mappedBy = "course")
    @ToString.Exclude
    private List<Unit> units;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        Course course = (Course) o;
        return id != null && Objects.equals(id, course.id);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}