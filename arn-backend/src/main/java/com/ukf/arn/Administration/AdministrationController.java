package com.ukf.arn.Administration;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/admin")
public class AdministrationController {

    private AdministrationService administrationService;

    public AdministrationController(AdministrationService administrationService) {
        this.administrationService = administrationService;
    }

    @PostMapping("/conference")
    public ResponseEntity<?> getConferenceData(
            @RequestBody Map<String, Object> searchObject,
            @RequestParam(required = false) String sortColumn,
            @RequestParam(required = false) String sortDirection) {
        return ResponseEntity.ok(administrationService.getConferenceData(searchObject, sortColumn, sortDirection));
    }
}
