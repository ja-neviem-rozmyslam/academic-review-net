package com.ukf.arn.Submissions;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
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
        return submissionService.createSubmission(submissionRequest, uploadedFiles);
    }

    @GetMapping("/categories")
    public List<SubmissionCategory> getCategories() {
        return submissionService.getCategories();
    }

    @GetMapping("/files/{submissionId}")
    public ResponseEntity<?> getFiles(@PathVariable Long submissionId) {
        return submissionService.getFiles(submissionId);
    }

    @GetMapping("/files/{submissionId}/{filename}")
    public ResponseEntity<Resource> downloadFile(@PathVariable Long submissionId, @PathVariable String filename) {
        Resource resource = submissionService.getFileAsResource(submissionId, filename);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                .body(resource);
    }
}