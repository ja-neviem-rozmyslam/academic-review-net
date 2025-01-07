package com.ukf.arn.Conferences;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
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
            @RequestParam(required = false) Long submissionId,
            @RequestParam boolean includeCoAuthors) throws IOException {
        return conferenceService.getConferenceData(conferenceId, submissionId, includeCoAuthors);
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