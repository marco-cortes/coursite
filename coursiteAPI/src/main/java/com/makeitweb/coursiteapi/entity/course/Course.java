package com.makeitweb.coursiteapi.entity.course;

import com.makeitweb.coursiteapi.entity.users.User;
import lombok.*;
import org.hibernate.Hibernate;

import javax.persistence.*;
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
    private String title;
    @Lob @Basic (fetch = FetchType.LAZY)
    @Column(nullable = false, columnDefinition = "text")
    @ToString.Exclude
    private String description;
    @Column(nullable = false)
    private String image;
    @Column(nullable = false)
    private Float price;
    @Column(nullable = false)
    private Float score;
    @Column(nullable = false)
    private Integer status;

    @JoinColumn(nullable = false)
    @ManyToOne
    private User teacher;

    @JoinColumn(nullable = false)
    @ManyToOne
    @ToString.Exclude
    private Category category;

    /* *
    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL)
    @ToString.Exclude
    private List<UserCourse> userCourses;


    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL)
    @ToString.Exclude
    private List<Unit> units;*/

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