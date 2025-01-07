package com.ukf.arn.Administration;

import com.ukf.arn.Administration.Objects.ConferenceSearchDto;
import com.ukf.arn.Administration.Objects.Sort;
import com.ukf.arn.Administration.Objects.UserSearchDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api-admin")
public class AdministrationController {

    private AdministrationService administrationService;

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
}
