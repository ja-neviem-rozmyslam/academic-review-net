package com.ukf.arn.Submissions.Objects;

import com.ukf.arn.Users.Objects.UserDto;

import java.time.LocalDateTime;

public class SubmissionDto {
    private Long id;
    private String title;
    private Long category;
    private String coauthors;
    private String abstractEn;
    private String abstractSk;
    private Long conferenceId;
    private LocalDateTime timestamp;
    private UserDto author;
    private UserDto reviewer;

    private boolean isReviewed;

    public SubmissionDto() {
    }

    public SubmissionDto(Long id, String title, Long category, String abstractEn, String abstractSk) {
        this.id = id;
        this.title = title;
        this.category = category;
        this.abstractEn = abstractEn;
        this.abstractSk = abstractSk;
        this.coauthors = "";
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Long getCategory() {
        return category;
    }

    public void setCategory(Long category) {
        this.category = category;
    }

    public String getAbstractEn() {
        return abstractEn;
    }

    public void setAbstractEn(String abstractEn) {
        this.abstractEn = abstractEn;
    }

    public String getAbstractSk() {
        return abstractSk;
    }

    public void setAbstractSk(String abstractSk) {
        this.abstractSk = abstractSk;
    }

    public String getCoauthors() {
        return coauthors;
    }

    public void setCoauthors(String coauthors) {
        this.coauthors = coauthors;
    }

    public Long getConferenceId() {
        return conferenceId;
    }

    public void setConferenceId(Long conferenceId) {
        this.conferenceId = conferenceId;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }

    public UserDto getAuthor() { return author; }

    public void setAuthor(UserDto author) { this.author = author; }

    public UserDto getReviewer() { return reviewer; }

    public void setReviewer(UserDto reviewer) { this.reviewer = reviewer; }

    public boolean isReviewed() {
        return isReviewed;
    }

    public void setReviewed(boolean reviewed) {
        isReviewed = reviewed;
    }
}