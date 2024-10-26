package com.ukf.arn.Users;

import com.ukf.arn.Universities.University;

import java.time.LocalDateTime;

public class UserDTO {

    private Long id;

    private String name;

    private String surname;

    private String email;

    private LocalDateTime registrationDate;

    private University university;

    public UserDTO() {
    }

    public UserDTO(Long id, String name, String surname, String email, LocalDateTime registrationDate, University university) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.registrationDate = registrationDate;
        this.university = university;
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
}
