package com.ukf.arn.Submissions;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/submissions")
public class SubmissionController {

    private final SubmissionService submissionService;

    public SubmissionController(SubmissionService submissionService) {
        this.submissionService = submissionService;
    }

    @PostMapping("/upload")
    public ResponseEntity<?> uploadSubmission(
            @RequestPart("submissionRequest") SubmissionRequest submissionRequest,
            @RequestPart("uploadedFiles") MultipartFile[] uploadedFiles
    ) throws IOException {
        return ResponseEntity.ok(submissionService.createSubmission(submissionRequest, uploadedFiles));
    }
}