package com.ukf.arn.Conferences;

public class ConferenceDTO {
    private Long id;
    private String conferenceName;
    private String uploadDeadline;
    private String reviewDeadline;
    private String creationDate;
    private String faculty;
    private boolean closed;
    private String review_form;
    private boolean joined;

    public ConferenceDTO(Long id, String conferenceName, String uploadDeadline, String reviewDeadline, String creationDate, String faculty, boolean closed, String review_form, boolean joined) {
        this.id = id;
        this.conferenceName = conferenceName;
        this.uploadDeadline = uploadDeadline;
        this.reviewDeadline = reviewDeadline;
        this.creationDate = creationDate;
        this.faculty = faculty;
        this.closed = closed;
        this.review_form = review_form;
        this.joined = joined;
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

    public String getCreationDate() {
        return creationDate;
    }

    public String getFaculty() {
        return faculty;
    }

    public boolean isClosed() {
        return closed;
    }

    public String getReview_form() {
        return review_form;
    }

    public boolean isJoined() {
        return joined;
    }
}
