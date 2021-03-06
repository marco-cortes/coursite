package com.makeitweb.coursiteapi.entity.course;

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
public class Lesson {
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
    private String linkDoc;
    @Column(nullable = false)
    private String linkVideo;

    @ManyToOne
    private Unit unit;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        Lesson material = (Lesson) o;
        return id != null && Objects.equals(id, material.id);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}