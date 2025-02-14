package com.ukf.arn.Administration;

import com.ukf.arn.Administration.Objects.ConferenceSearchDto;
import com.ukf.arn.Administration.Objects.SaveUniversityRequest;
import com.ukf.arn.Administration.Objects.Sort;
import com.ukf.arn.Administration.Objects.UserSearchDto;
import com.ukf.arn.Entities.Conference;
import com.ukf.arn.Entities.User;
import com.ukf.arn.Universities.UniversityDto;
import com.ukf.arn.Users.Objects.UpdateRequest;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api-admin")
public class AdministrationController {

    private final AdministrationService administrationService;

    public AdministrationController(AdministrationService administrationService) {
        this.administrationService = administrationService;
    }

    @PostMapping("/conference")
    public ResponseEntity<?> getConferenceData(
            @RequestBody ConferenceSearchDto searchObject,
            Sort sort) {
        return ResponseEntity.ok(administrationService.getConferenceData(searchObject, sort));
    }

    @GetMapping("/conference/{id}")
    public ResponseEntity<?> getConference(@PathVariable Long id) {
        return ResponseEntity.ok(administrationService.getConference(id));
    }

    @PostMapping("/user")
    public ResponseEntity<?> getUserData(
            @RequestBody UserSearchDto searchObject,
            Sort sort) {
        return ResponseEntity.ok(administrationService.getUserData(searchObject, sort));
    }

    @GetMapping("/university")
    public ResponseEntity<?> getUniversityData() {
        return ResponseEntity.ok(administrationService.getAllUniversityDtos());
    }

    @PostMapping("/university/save")
    public ResponseEntity<?> saveUniversity(
            @RequestBody SaveUniversityRequest request) {
        UniversityDto universityDto = request.getUniversity();
        List<Long> removedDomains = request.getRemovedDomains();
        return administrationService.saveUniversity(universityDto, removedDomains);
    }

    @PostMapping("/university/{id}/remove")
    public ResponseEntity<?> deleteUniversity(
            @PathVariable Long id, @RequestBody UniversityDto universityDto) {
        return ResponseEntity.ok(administrationService.removeUniversity(id, universityDto));
    }

    @PostMapping("/conference/update")
    public ResponseEntity<?> updateConference(@RequestBody Conference conferenceDto) {
        return ResponseEntity.ok(administrationService.updateConference(conferenceDto));
    }

    @GetMapping("/conference/{id}/close")
    public ResponseEntity<?> closeConference(@PathVariable Long id) {
        return ResponseEntity.ok(administrationService.closeConference(id));
    }

    @GetMapping("/conference/{id}/submissions")
    public ResponseEntity<?> getConferenceSubmissions(@PathVariable Long id, Sort sort) {
        return ResponseEntity.ok(administrationService.getConferenceSubmissions(id, sort));
    }

    @GetMapping("/conference/{id}/download")
    public ResponseEntity<byte[]> downloadConferenceSubmissions(@PathVariable Long id) {
        byte[] zipBytes = administrationService.downloadConferenceSubmissions(id);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentDispositionFormData("attachment", "konferencia-" + id + ".zip");
        headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);

        return ResponseEntity.ok()
                .headers(headers)
                .body(zipBytes);
    }

    @PostMapping("/user/{userId}/delete")
    public ResponseEntity<?> deleteUser(@PathVariable UUID userId) {
        return administrationService.deleteUser(userId);
    }

    @PostMapping("/conference/{submissionId}/assign-reviewer/{reviewerId}")
    public ResponseEntity<?> assignReviewer(@PathVariable Long submissionId, @PathVariable UUID reviewerId) {
        return ResponseEntity.ok(administrationService.assignReviewer(submissionId, reviewerId));
    }

    @GetMapping("/conference/reviewers")
    public ResponseEntity<?> getReviewers() {
        return ResponseEntity.ok(administrationService.getReviewers());
    }

    @PostMapping("/user/createAdmin")
    public ResponseEntity<?> createAdmin(@RequestBody User user) {
        return administrationService.createAdminUser(user);
    }

    @PostMapping("/user/updateUserProfile")
    public ResponseEntity<?> updateEditUserData(@RequestBody UpdateRequest userDto) {
        return ResponseEntity.ok(administrationService.EditUserProfileUpdate(userDto));
    }
}
