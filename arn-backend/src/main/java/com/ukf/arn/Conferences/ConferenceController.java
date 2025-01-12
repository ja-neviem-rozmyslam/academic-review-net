package com.ukf.arn.Conferences;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/conferences")
public class ConferenceController {

    private ConferenceService conferenceService;

    public ConferenceController(ConferenceService conferenceService) {
        this.conferenceService = conferenceService;
    }

    @GetMapping("/{conferenceId}")
    public ResponseEntity<?> getConferenceData(
            @PathVariable Long conferenceId,
            @RequestParam boolean includeCoAuthors) {
        return conferenceService.getConferenceData(conferenceId, includeCoAuthors);
    }

    @GetMapping("/submission/{submissionId}")
    public ResponseEntity<?> getSubmissionData(@PathVariable Long submissionId, @RequestParam boolean includeCoAuthors) {
        return conferenceService.getSubmissionData(submissionId, includeCoAuthors);
    }

    @PostMapping("/join/{conferenceId}")
    public ResponseEntity<?> joinConference(@PathVariable Long conferenceId, @RequestBody Map<String, String> request) {
        String password = request.get("password");
        return conferenceService.joinConference(conferenceId, password);
    }

    @GetMapping
    public ResponseEntity<?> getConferences() {
        UUID userId = conferenceService.getCurrentUserId();
        return conferenceService.getConferencesForUser(userId);
    }

}