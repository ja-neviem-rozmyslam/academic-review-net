package com.ukf.arn.Administration.Objects;

public class UserSearchDto {
    private String name;
    private String email;
    private Long university;
    private String role;
    private boolean isAdmin;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getUniversity() {
        return university;
    }

    public void setUniversity(Long university) {
        this.university = university;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public boolean isAdmin() {
        return isAdmin;
    }

    public void setIsAdmin(boolean isAdmin) {
        this.isAdmin = isAdmin;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}

