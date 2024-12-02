package com.ukf.arn.Submissions;

import com.ukf.arn.config.SecurityConfig;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;


import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@Service
public class SubmissionService {

    private final SubmissionRepository submissionRepository;

    public SubmissionService(SubmissionRepository submissionRepository) {
        this.submissionRepository = submissionRepository;
    }

    public String generateFolderHash() {
        UUID id = SecurityConfig.getLoggedInUser().getId();
        return id.toString();
    }

    public void createFolderIfNotExists(String folderPath) throws IOException {
        Path path = Paths.get(folderPath);
        if (!Files.exists(path)) {
            Files.createDirectories(path);
        }
    }

    public void saveFilesToFolder(MultipartFile[] files, String folderPath) throws IOException {
        for (MultipartFile file : files) {
            Path destination = Paths.get(folderPath, file.getOriginalFilename());
            Files.copy(file.getInputStream(), destination, StandardCopyOption.REPLACE_EXISTING);
        }
    }

    public ResponseEntity<?> createSubmission(SubmissionRequest submission, MultipartFile[] uploadedFiles) throws IOException {
        String conferenceFolderPath = "conferences/" + submission.getConferenceId();
        createFolderIfNotExists(conferenceFolderPath);

        String folderHash = generateFolderHash();
        String userFolderPath = conferenceFolderPath + "/" + folderHash;
        createFolderIfNotExists(userFolderPath);

        saveFilesToFolder(uploadedFiles, userFolderPath);

        Submission newSubmission = new Submission();
        newSubmission.setThesisTitle(submission.getTitle());
        newSubmission.setAbstractSk(submission.getAbstractSk());
        newSubmission.setAbstractEn(submission.getAbstractEn());
        newSubmission.setFolderHash(generateFolderHash());
        newSubmission.setConferencesId(submission.getConferenceId());
        newSubmission.setThesesCategoriesId(submission.getCategory());
        return ResponseEntity.ok(submissionRepository.save(newSubmission));
    }
}