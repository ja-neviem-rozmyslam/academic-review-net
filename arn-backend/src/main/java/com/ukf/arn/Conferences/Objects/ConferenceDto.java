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
}
