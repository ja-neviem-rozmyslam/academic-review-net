package com.ukf.arn.Users;

import com.ukf.arn.Universities.University;
import jakarta.persistence.*;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "users")
public class User implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue
    private UUID id;

    private String name;

    private String surname;

    private String email;

    @Column(nullable = false, length = 255)
    private String password;

    @Column(name = "registration_date")
    private LocalDateTime registrationDate;

    @ManyToOne
    @JoinColumn(name = "universities_id")
    private University university;

    @ElementCollection
    @CollectionTable(name = "users_roles", joinColumns = @JoinColumn(name = "user_id"))
    @Column(name = "role_ident")
    private List<String> roles = new ArrayList<>();

    public User() {
    }

    @PrePersist
    public void generateGuid() {
        if (id == null) {
            id = UUID.randomUUID();
        }
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID guid) {
        this.id = id;
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

    public LocalDateTime getRegistrationDate() {
        return registrationDate;
    }

    public void setRegistrationDate(LocalDateTime registrationDate) {
        this.registrationDate = registrationDate;
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