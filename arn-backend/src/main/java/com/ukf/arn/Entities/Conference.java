package com.ukf.arn.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Set;
import java.util.UUID;

@Entity
@Table(name = "conferences")
public class Conference implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "conference_name")
    private String conferenceName;

    private String password;

    @Column(name = "upload_deadline")
    private String uploadDeadline;

    @Column(name = "review_deadline")
    private String reviewDeadline;

    @CreationTimestamp
    @Column(name = "creation_date", insertable = false)
    private LocalDateTime creationDate;

    private String faculty;

    private boolean closed;

    @Column(name = "review_form")
    private String reviewForm;

    @ManyToMany
    @JoinTable(
            name = "users_in_conferences",
            joinColumns = @JoinColumn(name = "conference_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private Set<User> users;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getConferenceName() {
        return conferenceName;
    }

    public void setConferenceName(String conferenceName) {
        this.conferenceName = conferenceName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getUploadDeadline() {
        return uploadDeadline;
    }

    public void setUploadDeadline(String uploadDeadline) {
        this.uploadDeadline = uploadDeadline;
    }

    public String getReviewDeadline() {
        return reviewDeadline;
    }

    public void setReviewDeadline(String reviewDeadline) {
        this.reviewDeadline = reviewDeadline;
    }

    public LocalDateTime getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(LocalDateTime creationDate) {
        this.creationDate = creationDate;
    }

    public String getFaculty() {
        return faculty;
    }

    public void setFaculty(String faculty) {
        this.faculty = faculty;
    }

    public boolean isClosed() {
        return closed;
    }

    public void setClosed(boolean closed) {
        this.closed = closed;
    }

    public String getReviewForm() {
        return reviewForm;
    }

    public void setReviewForm(String reviewForm) {
        this.reviewForm = reviewForm;
    }

    public Set<User> getUsers() {
        return users;
    }

    public void setUsers(Set<User> users) {
        this.users = users;
    }

    @JsonIgnore
    public boolean hasPassword() {
        return password != null && !password.isEmpty();
    }

    @JsonIgnore
    public boolean isUserInConference(UUID userId) {
        return users.stream().anyMatch(user -> user.getId().equals(userId));
    }
}
