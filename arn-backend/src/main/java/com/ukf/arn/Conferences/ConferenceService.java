package com.ukf.arn.Conferences;

import com.ukf.arn.Users.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class ConferenceService {
    @Autowired
    private ConferenceRepository conferenceRepository;


    public ResponseEntity<?> getConferencesForUser(UUID userId) {
        List<Conference> conferences = conferenceRepository.findAll();

        return ResponseEntity.ok(conferences.stream()
                .map(conference -> mapToDTO(conference, userId))
                .toList());
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

