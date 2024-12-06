package com.ukf.arn.Users;

import com.ukf.arn.Conferences.ConferenceDTO;
import com.ukf.arn.Submissions.SubmissionDto;

import java.util.List;

public class UserDetailsDTO {
    private UserDTO user;
    private List<ConferenceDTO> conference;
    private List<SubmissionDto> submission;


    public UserDetailsDTO(UserDTO user, List<ConferenceDTO> conference, List<SubmissionDto> submission) {
        this.user = user;
        this.conference = conference;
        this.submission = submission;
    }

    public UserDTO getUser() {
        return user;
    }

    public void setUser(UserDTO user) {
        this.user = user;
    }

    public List<ConferenceDTO> getConference() {
        return conference;
    }

    public void setConference(List<ConferenceDTO> conference) {
        this.conference = conference;
    }

    public List<SubmissionDto> getSubmission() {
        return submission;
    }

    public void setSubmission(List<SubmissionDto> submission) {
        this.submission = submission;
    }
}
