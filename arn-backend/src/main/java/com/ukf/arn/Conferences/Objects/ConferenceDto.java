package com.ukf.arn.Conferences.Objects;

import java.time.LocalDateTime;

public class ConferenceDto {
    private Long id;
    private String conferenceName;
    private String uploadDeadline;
    private String reviewDeadline;
    private LocalDateTime creationDate;
    private String faculty;
    private boolean closed;
    private String reviewForm;
    private boolean joined;
    private boolean hasPassword;

    public ConferenceDto() {
    }

    public ConferenceDto(Long id, String conferenceName, String uploadDeadline, String reviewDeadline, LocalDateTime creationDate, String faculty, boolean closed, String review_form, boolean joined, boolean hasPassword) {
        this.id = id;
        this.conferenceName = conferenceName;
        this.uploadDeadline = uploadDeadline;
        this.reviewDeadline = reviewDeadline;
        this.creationDate = creationDate;
        this.faculty = faculty;
        this.closed = closed;
        this.reviewForm = review_form;
        this.joined = joined;
        this.hasPassword = hasPassword;
    }

    public Long getId() {
        return id;
    }

    public String getConferenceName() {
        return conferenceName;
    }

    public String getUploadDeadline() {
        return uploadDeadline;
    }

    public String getReviewDeadline() {
        return reviewDeadline;
    }

    public LocalDateTime getCreationDate() {
        return creationDate;
    }

    public String getFaculty() {
        return faculty;
    }

    public boolean isClosed() {
        return closed;
    }

    public String getReviewForm() {
        return reviewForm;
    }

    public boolean isJoined() {
        return joined;
    }

    public boolean isHasPassword() {
        return hasPassword;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setConferenceName(String conferenceName) {
        this.conferenceName = conferenceName;
    }

    public void setUploadDeadline(String uploadDeadline) {
        this.uploadDeadline = uploadDeadline;
    }

    public void setReviewDeadline(String reviewDeadline) {
        this.reviewDeadline = reviewDeadline;
    }

    public void setCreationDate(LocalDateTime creationDate) {
        this.creationDate = creationDate;
    }

    public void setFaculty(String faculty) {
        this.faculty = faculty;
    }

    public void setClosed(boolean closed) {
        this.closed = closed;
    }

    public void setReviewForm(String reviewForm) {
        this.reviewForm = reviewForm;
    }

    public void setJoined(boolean joined) {
        this.joined = joined;
    }

    public void setHasPassword(boolean hasPassword) {
        this.hasPassword = hasPassword;
    }
}
