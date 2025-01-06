package com.ukf.arn.Administration.Objects;

public class ConferenceSearchDto {
    private String name;
    private String faculty;
    private String uploadDeadlineStart;
    private String uploadDeadlineEnd;
    private String reviewDeadlineStart;
    private String reviewDeadlineEnd;
    private String closed;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getFaculty() {
        return faculty;
    }

    public void setFaculty(String faculty) {
        this.faculty = faculty;
    }

    public String getUploadDeadlineStart() {
        return uploadDeadlineStart;
    }

    public void setUploadDeadlineStart(String uploadDeadlineStart) {
        this.uploadDeadlineStart = uploadDeadlineStart;
    }

    public String getUploadDeadlineEnd() {
        return uploadDeadlineEnd;
    }

    public void setUploadDeadlineEnd(String uploadDeadlineEnd) {
        this.uploadDeadlineEnd = uploadDeadlineEnd;
    }

    public String getReviewDeadlineStart() {
        return reviewDeadlineStart;
    }

    public void setReviewDeadlineStart(String reviewDeadlineStart) {
        this.reviewDeadlineStart = reviewDeadlineStart;
    }

    public String getReviewDeadlineEnd() {
        return reviewDeadlineEnd;
    }

    public void setReviewDeadlineEnd(String reviewDeadlineEnd) {
        this.reviewDeadlineEnd = reviewDeadlineEnd;
    }

    public String isClosed() {
        return closed;
    }

    public void setClosed(String closed) {
        this.closed = closed;
    }
}