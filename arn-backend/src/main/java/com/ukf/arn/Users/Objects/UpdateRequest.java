package com.ukf.arn.Users.Objects;

public class UpdateRequest {
    private String email;
    private String name;
    private String surname;
    private Long universityId;

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

}
