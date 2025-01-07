package com.ukf.arn.Conferences;

import com.ukf.arn.Conferences.Objects.ConferenceDto;
import com.ukf.arn.Conferences.Objects.ConferenceDetail;
import com.ukf.arn.Conferences.Repository.ConferenceRepository;
import com.ukf.arn.Entities.Conference;
import com.ukf.arn.Entities.Submission;
import com.ukf.arn.Submissions.Objects.SubmissionDto;
import com.ukf.arn.Submissions.Repository.SubmissionRepository;
import com.ukf.arn.Entities.User;
import com.ukf.arn.config.SecurityConfig;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

import static com.ukf.arn.ConstantsKatalog.Role.REVIEWER;
import static com.ukf.arn.ConstantsKatalog.Role.STUDENT;

@Service
public class ConferenceService {

    private final ConferenceRepository conferenceRepository;
    private final SubmissionRepository submissionRepository;

    public ConferenceService(ConferenceRepository conferenceRepository, SubmissionRepository submissionRepository) {
        this.conferenceRepository = conferenceRepository;
        this.submissionRepository = submissionRepository;
    }

    public ResponseEntity<?> getConferencesForUser(UUID userId) {
        boolean isReviewer = SecurityConfig.getLoggedInUser().getRoles().size() == 1
                && SecurityConfig.getLoggedInUser().getRoles().contains(REVIEWER.getCode());
        List<Conference> conferences = conferenceRepository.findAllOrderByJoined(userId, isReviewer);

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

    public ResponseEntity<?> getConferenceData(Long conferenceId, Long submissionId, boolean includeCoAuthors) {
        Conference conference = conferenceRepository.findById(conferenceId).orElse(null);
        if (conference == null) {
            return ResponseEntity.badRequest().body("Konferencia neexistuje.");
        }

        User user = SecurityConfig.getLoggedInUser();
        if (!conference.isUserInConference(user.getId())) {
            return ResponseEntity.badRequest().body("Nemáte prístup k tejto konferencii.");
        }

        Submission submission;
        if (submissionId != null) {
            submission = submissionRepository.findById(submissionId).orElse(null);
            if (!submission.getAuthorId().equals(user.getId()) && !submission.getReviewerId().equals(user.getId())) {
                return ResponseEntity.badRequest().body("Nemáte prístup k tejto práci.");
            }
        } else {
            submission = submissionRepository.findByConferencesIdAndAuthorId(conferenceId, user.getId());
        }
        ConferenceDetail conferenceDetail = getConferenceDetail(submission, conference, includeCoAuthors);

        return ResponseEntity.ok(conferenceDetail);
    }


    private static ConferenceDetail getConferenceDetail(Submission submission, Conference conference, boolean includeCoAuthors) {
        ConferenceDetail conferenceDetail = new ConferenceDetail();
        SubmissionDto submissionDto = null;

        if (submission != null){
            submissionDto = new SubmissionDto();
            submissionDto.setId(submission.getId());
            submissionDto.setTitle(submission.getThesisTitle());
            submissionDto.setCategory(submission.getThesesType());
            submissionDto.setAbstractEn(submission.getAbstractEn());
            submissionDto.setAbstractSk(submission.getAbstractSk());
            if (includeCoAuthors) {
                submissionDto.setCoauthors(submission.getCoauthors());
            }
            conferenceDetail.setReview(submission.getReview());
        }

        String userRole = (submission != null
                && SecurityConfig.getLoggedInUser().getId().equals(submission.getReviewerId())) ? REVIEWER.getCode() : STUDENT.getCode();

        conferenceDetail.setId(conference.getId());
        conferenceDetail.setUploadDeadline(conference.getUploadDeadline());
        conferenceDetail.setReviewDeadline(conference.getReviewDeadline());
        conferenceDetail.setReviewForm(conference.getReviewForm());
        conferenceDetail.setSubmission(submissionDto);
        conferenceDetail.setSubmissionRole(userRole);
        return conferenceDetail;
    }

    public UUID getCurrentUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) authentication.getPrincipal();
        return user.getId();
    }

    private ConferenceDto mapToDTO(Conference conference, UUID userId) {
        return new ConferenceDto(
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

