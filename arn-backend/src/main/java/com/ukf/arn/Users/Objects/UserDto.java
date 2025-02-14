package com.ukf.arn.Users.Objects;

import com.ukf.arn.Entities.University;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public class UserDto {

    private UUID id;
    private String name;
    private String surname;
    private String email;
    private LocalDateTime registrationDate;
    private University university;
    private List<String> roles;
    private Boolean verified;

    public UserDto() {
    }

    public UserDto(UUID id, String name, String surname, String email, LocalDateTime registrationDate, University university, List<String> roles) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.registrationDate = registrationDate;
        this.university = university;
        this.roles = roles;

    }

    public void setVerified(Boolean verified) { this.verified = verified; }

    public Boolean getVerified() { return verified; }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
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
