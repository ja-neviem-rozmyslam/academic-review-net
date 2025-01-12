package com.ukf.arn.Users.Objects;

import java.util.List;
import java.util.UUID;

public class UpdateRequest {
    private UUID id;
    private String email;
    private String name;
    private String surname;
    private Long universityId;
    private List<String> roles;

    public UpdateRequest() {
    }

    public UpdateRequest(String email, String name, String surname, Long universityId) {
        this.email = email;
        this.name = name;
        this.surname = surname;
        this.universityId = universityId;
    }


    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
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

    public Long getUniversityId() {
        return universityId;
    }

    public void setUniversityId(Long universityId) {
        this.universityId = universityId;
    }

    public List<String> getRoles() {return roles;}

    public void setRoles(List<String> roles) {this.roles = roles;}

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

}
