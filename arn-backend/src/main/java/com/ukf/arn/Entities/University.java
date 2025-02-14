package com.ukf.arn.Entities;

import jakarta.persistence.*;

import java.io.Serializable;

@Entity
@Table(name = "universities")
public class University implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "university_name")
    private String name;

    public University(String name) {
        this.name = name;
    }

    public University() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}