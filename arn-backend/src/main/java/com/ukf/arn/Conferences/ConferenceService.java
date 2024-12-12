package com.ukf.arn.Conferences;

import com.ukf.arn.Submissions.Submission;
import com.ukf.arn.Submissions.SubmissionDto;
import com.ukf.arn.Submissions.SubmissionRepository;
import com.ukf.arn.Users.User;
import com.ukf.arn.config.SecurityConfig;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class ConferenceService {

    private ConferenceRepository conferenceRepository;
    private SubmissionRepository submissionRepository;

    public ConferenceService(ConferenceRepository conferenceRepository, SubmissionRepository submissionRepository) {
        this.conferenceRepository = conferenceRepository;
        this.submissionRepository = submissionRepository;
    }

    public ResponseEntity<?> getConferencesForUser(UUID userId) {
        List<Conference> conferences = conferenceRepository.findAllOrderByJoined(userId);

        return ResponseEntity.ok(conferences.stream()
                .map(conference -> mapToDTO(conference, userId))
                .toList());
    }

    public ResponseEntity<?> joinConference(Long conferenceId, String password) {
        Conference conference = conferenceRepository.findById(conferenceId).orElse(null);
        if (conference == null || conference.isClosed()) {
            return ResponseEntity.badRequest().body("Konferencia neexistuje.");
        }

        if (conference.hasPassword() && !conference.getPassword().equals(password)) {
            return ResponseEntity.badRequest().body("Nesprávne heslo.");
        }

        User user = SecurityConfig.getLoggedInUser();
        if (conference.isUserInConference(user.getId())) {
            return ResponseEntity.badRequest().body("Už ste členom tejto konferencie.");
        }

        conference.getUsers().add(user);
        conferenceRepository.save(conference);
        return ResponseEntity.ok().build();
    }

    public ResponseEntity<?> getConferenceData(Long conferenceId) {
        Conference conference = conferenceRepository.findById(conferenceId).orElse(null);
        if (conference == null) {
            return ResponseEntity.badRequest().body("Konferencia neexistuje.");
        }

        User user = SecurityConfig.getLoggedInUser();
        if (!conference.isUserInConference(user.getId())) {
            return ResponseEntity.badRequest().body("Nemáte prístup k tejto konferencii.");
        }

        Submission submission = submissionRepository.findByConferenceIdAndUserId(conferenceId, user.getId());
        ConferenceDetail conferenceDetail = getConferenceDetail(submission, conference);

        return ResponseEntity.ok(conferenceDetail);
    }

    private static ConferenceDetail getConferenceDetail(Submission submission, Conference conference) {
        SubmissionDto submissionDto = (submission != null) ? new SubmissionDto(submission.getId(), submission.getThesisTitle(), submission.getThesesType(), submission.getAbstractEn(), submission.getAbstractSk(), new ArrayList<>()) : null;

        ConferenceDetail conferenceDetail = new ConferenceDetail();
        conferenceDetail.setId(conference.getId());
        conferenceDetail.setUploadDeadline(conference.getUploadDeadline());
        conferenceDetail.setReviewDeadline(conference.getReviewDeadline());
        conferenceDetail.setSubmission(submissionDto);
        return conferenceDetail;
    }

    public UUID getCurrentUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) authentication.getPrincipal();
        return user.getId();
    }

    private ConferenceDTO mapToDTO(Conference conference, UUID userId) {
        return new ConferenceDTO(
                conference.getId(),
                conference.getConferenceName(),
                conference.getUploadDeadline(),
                conference.getReviewDeadline(),
                conference.getCreationDate(),
                conference.getFaculty(),
                conference.isClosed(),
                conference.getReviewForm(),
                conference.isUserInConference(userId),
                conference.getPassword() != null
        );
    }
}

