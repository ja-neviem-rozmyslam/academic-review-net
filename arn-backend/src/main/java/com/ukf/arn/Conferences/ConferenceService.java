package com.ukf.arn.Conferences;

import com.ukf.arn.Submissions.Submission;
import com.ukf.arn.Submissions.SubmissionRepository;
import com.ukf.arn.Users.User;
import com.ukf.arn.config.SecurityConfig;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

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
        List<Conference> conferences = conferenceRepository.findAll();

        return ResponseEntity.ok(conferences.stream()
                .map(conference -> mapToDTO(conference, userId))
                .toList());
    }

    public ResponseEntity<?> getConferenceData(Long conferenceId) {

        Conference conference = conferenceRepository.findById(conferenceId).orElse(null);
        if (conference == null) {
            return ResponseEntity.badRequest().body("Conference not found.");
        }

        User user = SecurityConfig.getLoggedInUser();
        if (!conferenceRepository.isUserJoined(conferenceId, user.getId())) {
            return ResponseEntity.badRequest().body("User is not joined to this conference.");
        }




        return ResponseEntity.ok().build();
    }

    public UUID getCurrentUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) authentication.getPrincipal();
        return user.getId();
    }

    private ConferenceDTO mapToDTO(Conference conference, UUID userId) {
        boolean joined = conferenceRepository.isUserJoined(conference.getId(), userId);
        return new ConferenceDTO(
                conference.getId(),
                conference.getConferenceName(),
                conference.getUploadDeadline(),
                conference.getReviewDeadline(),
                conference.getCreationDate(),
                conference.getFaculty(),
                conference.isClosed(),
                conference.getReviewForm(),
                joined
        );
    }
}

