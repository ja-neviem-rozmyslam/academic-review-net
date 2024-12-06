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

}
