package com.ukf.arn.Administration;

import com.ukf.arn.Administration.Objects.ConferenceSearchDto;
import com.ukf.arn.Administration.Objects.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

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
            @RequestParam(required = false) Sort sort) {
        return ResponseEntity.ok(administrationService.getConferenceData(searchObject, sort));
    }
}
