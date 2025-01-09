package com.ukf.arn.Administration;

import com.ukf.arn.Administration.Objects.ConferenceSearchDto;
import com.ukf.arn.Administration.Objects.SaveUniversityRequest;
import com.ukf.arn.Administration.Objects.Sort;
import com.ukf.arn.Administration.Objects.UserSearchDto;
import com.ukf.arn.Universities.UniversityDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @PostMapping("/university/save")
    public ResponseEntity<?> saveUniversity(
            @RequestBody SaveUniversityRequest request) {
        UniversityDto universityDto = request.getUniversity();
        List<Long> removedDomains = request.getRemovedDomains();
        return administrationService.saveUniversity(universityDto, removedDomains);
    }

}
