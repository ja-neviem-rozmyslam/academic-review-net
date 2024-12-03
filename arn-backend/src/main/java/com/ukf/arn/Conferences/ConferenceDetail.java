package com.ukf.arn.Conferences;

import com.ukf.arn.Submissions.Submission;
import com.ukf.arn.Submissions.SubmissionDto;

public class ConferenceDetail {
    private Long id;
    private String uploadDeadline;
    private String reviewDeadline;
    private SubmissionDto submission;
    private String review;
    private String reviewForm;

    public ConferenceDetail() {
    }

    public Long getId() {

        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public SubmissionDto getSubmission() {
        return submission;
    }

    public void setSubmission(SubmissionDto submission) {
        this.submission = submission;
    }

    public String getReview() {
        return review;
    }

    public void setReview(String review) {
        this.review = review;
    }

    public String getReviewForm() {
        return reviewForm;
    }

    public void setReviewForm(String reviewForm) {
        this.reviewForm = reviewForm;
    }
}
