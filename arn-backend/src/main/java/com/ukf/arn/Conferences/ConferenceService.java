package com.ukf.arn.Conferences;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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

