package com.ukf.arn.Administration;

import com.ukf.arn.Administration.Objects.ConferenceSearchDto;
import com.ukf.arn.Administration.Objects.Sort;
import com.ukf.arn.Administration.Objects.UserSearchDto;
import com.ukf.arn.Universities.UniversityDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping("/university/{id}/add-domain")
    public ResponseEntity<?> addDomainToUniversity(
            @PathVariable Long id) {
        return ResponseEntity.ok(administrationService.addDomainToUniversity(id));
    }

    @PostMapping("/university/remove-domain/{id}")
    public ResponseEntity<?> removeDomainFromUniversity(
            @PathVariable Long id) {
        return administrationService.removeDomainFromUniversity(id);
    }

    @PostMapping("/university/save")
    public ResponseEntity<?> saveUniversity(
            @RequestBody UniversityDto universityDto) {
        return administrationService.saveUniversity(universityDto);
    }

    @PostMapping("/university/add")
    public ResponseEntity<?> addUniversity() {
        return ResponseEntity.ok(administrationService.addUniversity());
    }

    @PostMapping("/university/{id}/remove")
    public ResponseEntity<?> deleteUniversity(
            @PathVariable Long id, @RequestBody UniversityDto universityDto) {
        return ResponseEntity.ok(administrationService.removeUniversity(id, universityDto));
    }

}
