package com.ukf.arn.Users;

import com.ukf.arn.Entities.Conference;
import com.ukf.arn.Conferences.Objects.ConferenceDto;
import com.ukf.arn.Conferences.Repository.ConferenceRepository;
import com.ukf.arn.Entities.University;
import com.ukf.arn.Entities.User;
import com.ukf.arn.Entities.Submission;
import com.ukf.arn.Submissions.Objects.SubmissionDto;
import com.ukf.arn.Submissions.Repository.SubmissionRepository;
import com.ukf.arn.Users.Objects.UpdateRequest;
import com.ukf.arn.Users.Objects.UserDto;
import com.ukf.arn.Users.Objects.UserDetailsDto;
import com.ukf.arn.Users.Repository.UserRepository;
import com.ukf.arn.config.SecurityConfig;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
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

    public UserDetailsDto getUserDetails() {

        User user = SecurityConfig.getLoggedInUser();
        UserDto userDTO = new UserDto();
        userDTO.setId(user.getId());
        userDTO.setName(user.getName());
        userDTO.setEmail(user.getEmail());
        userDTO.setSurname(user.getSurname());
        userDTO.setRegistrationDate(user.getRegistrationDate());
        userDTO.setUniversity(user.getUniversity());
        userDTO.setRoles(user.getRoles());

        List<Conference> conferences = conferenceRepository.findAllByUsersIdAndClosedFalseOrderByUploadDeadline(user.getId());
        List<ConferenceDto> conferenceDTOs = conferences.stream()
                .map(conference -> new ConferenceDto(
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

        List<SubmissionDto> submissionDtos = mapSubmissionsToDto(submissionRepository.findByUser(user.getId(), false));
        List<SubmissionDto> submissionDtosToReview = mapSubmissionsToDto(submissionRepository.findByUser(user.getId(), true));

        UserDetailsDto userDetailsDTO = new UserDetailsDto(userDTO, conferenceDTOs, submissionDtos, submissionDtosToReview);
        return userDetailsDTO;
    }

    public ResponseEntity<?> updateUserDetails(UpdateRequest userDto) {
        User user = SecurityConfig.getLoggedInUser();
        user.setName(userDto.getName());
        user.setSurname(userDto.getSurname());
        if (user.getUniversity() == null) {
            University university = new University();
            university.setId(userDto.getUniversityId());
            user.setUniversity(university);
        } else {
            user.getUniversity().setId(userDto.getUniversityId());
        }
        userRepository.save(user);
        return ResponseEntity.ok("User details updated successfully");
    }

    private List<SubmissionDto> mapSubmissionsToDto(List<Submission> submissions) {
        return submissions.stream()
                .map(submission -> {
                    SubmissionDto dto = new SubmissionDto();
                    dto.setConferenceId(submission.getConferencesId());
                    dto.setId(submission.getId());
                    dto.setTitle(submission.getThesisTitle());
                    dto.setTimestamp(submission.getTimestamp());
                    dto.setReviewed(submission.getReview() != null);
                    return dto;
                })
                .collect(Collectors.toList());
    }

}
