package com.ukf.arn.Users;

import com.ukf.arn.Submissions.Submission;
import com.ukf.arn.Universities.University;
import jakarta.persistence.*;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.*;

@Entity
@Table(name = "users")
public class User implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @JdbcTypeCode(SqlTypes.VARCHAR)
    private UUID id;

    private String name;

    private String surname;

    private String email;

    private boolean verified;

    @Column(nullable = false)
    private String password;

    @Column(name = "registration_date")
    private LocalDateTime registrationDate;

    @ManyToOne
    @JoinColumn(name = "universities_id")
    private University university;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "users_roles", joinColumns = @JoinColumn(name = "users_id"))
    @Column(name = "role_ident")
    private List<String> roles = new ArrayList<>();

    @ManyToMany(mappedBy = "authors")
    private Set<Submission> authoredTheses = new HashSet<>();

    public User() {
    }

    public User(String name, String surname, String email, String password, University university, List<String> roles) {
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.password = password;
        this.university = university;
        this.roles = roles;
    }

    @PrePersist
    public void prePersist() {
        id = UUID.randomUUID();
        registrationDate = LocalDateTime.now();
    }

    public UUID getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public boolean isVerified() {
        return verified;
    }

    public void setVerified(boolean verified) {
        this.verified = verified;
    }

    public LocalDateTime getRegistrationDate() {
        return registrationDate;
    }

    public University getUniversity() {
        return university;
    }

    public void setUniversity(University university) {
        this.university = university;
    }

    public List<String> getRoles() {
        return roles;
    }

    public void setRoles(List<String> roles) {
        this.roles = roles;
    }
}