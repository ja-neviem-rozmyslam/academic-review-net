package com.ukf.arn.Users;

import com.ukf.arn.Conferences.Conference;
import com.ukf.arn.Conferences.ConferenceDTO;
import com.ukf.arn.Conferences.ConferenceRepository;
import com.ukf.arn.Submissions.Submission;
import com.ukf.arn.Submissions.SubmissionDto;
import com.ukf.arn.Submissions.SubmissionRepository;
import com.ukf.arn.config.SecurityConfig;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final ConferenceRepository conferenceRepository;
    private final SubmissionRepository submissionRepository;

    public UserService(UserRepository userRepository, ConferenceRepository conferenceRepository, SubmissionRepository submissionRepository) {
        this.userRepository = userRepository;
        this.conferenceRepository = conferenceRepository;
        this.submissionRepository = submissionRepository;
    }

    public UserDetailsDTO getUserDetails() {

        User user = SecurityConfig.getLoggedInUser();
        UserDTO userDTO = new UserDTO();
        userDTO.setId(user.getId());
        userDTO.setName(user.getName());
        userDTO.setEmail(user.getEmail());
        userDTO.setSurname(user.getSurname());
        userDTO.setRegistrationDate(user.getRegistrationDate());
        userDTO.setUniversity(user.getUniversity());
        userDTO.setRoles(user.getRoles());

        List<Conference> conferences = conferenceRepository.findAllByUsersIdOrderByUploadDeadline(user.getId());
        List<ConferenceDTO> conferenceDTOs = conferences.stream()
                .map(conference -> new ConferenceDTO(
                        conference.getId(),
                        conference.getConferenceName(),
                        conference.getUploadDeadline(),
                        conference.getReviewDeadline(),
                        conference.getCreationDate(),
                        conference.getFaculty(),
                        conference.isClosed(),
                        conference.getReviewForm(),
                        true,
                        conference.hasPassword()
                ))
                .collect(Collectors.toList());

        List<Submission> submissions = submissionRepository.findByAuthorsId(user.getId());
        List<SubmissionDto> submissionDtos;


        submissionDtos = submissions.stream()
                .map(submission -> new SubmissionDto(
                        submission.getId(),
                        submission.getThesisTitle(),
                        submission.getThesesType(),
                        submission.getAbstractEn(),
                        submission.getAbstractSk(),
                        null
                ))
                .collect(Collectors.toList());

        UserDetailsDTO userDetailsDTO = new UserDetailsDTO(userDTO, conferenceDTOs, submissionDtos);
        return userDetailsDTO;
    }
}
