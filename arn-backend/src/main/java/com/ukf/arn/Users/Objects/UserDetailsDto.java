package com.ukf.arn.Users.Objects;

import com.ukf.arn.Conferences.Objects.ConferenceDto;
import com.ukf.arn.Submissions.Objects.SubmissionDto;

import java.util.List;

public class UserDetailsDto {
    private UserDto user;
    private List<ConferenceDto> conference;
    private List<SubmissionDto> submission;
    private List<SubmissionDto> submissionsToReview;


    public UserDetailsDto(UserDto user, List<ConferenceDto> conference, List<SubmissionDto> submission, List<SubmissionDto> submissionsToReview) {
        this.user = user;
        this.conference = conference;
        this.submission = submission;
        this.submissionsToReview = submissionsToReview;
    }

    public UserDto getUser() {
        return user;
    }

    public void setUser(UserDto user) {
        this.user = user;
    }

    public List<ConferenceDto> getConference() {
        return conference;
    }

    public void setConference(List<ConferenceDto> conference) {
        this.conference = conference;
    }

    public List<SubmissionDto> getSubmission() {
        return submission;
    }

    public void setSubmission(List<SubmissionDto> submission) {
        this.submission = submission;
    }

    public List<SubmissionDto> getSubmissionsToReview() { return submissionsToReview; }

    public void setSubmissionsToReview(List<SubmissionDto> submissionsToReview) {}
}
