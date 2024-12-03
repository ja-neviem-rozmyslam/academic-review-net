package com.ukf.arn.Submissions;

import com.ukf.arn.Users.User;
import com.ukf.arn.Users.UserDTO;
import com.ukf.arn.Users.UserRepository;
import com.ukf.arn.config.SecurityConfig;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;


import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.*;

@Service
public class SubmissionService {

    private final SubmissionRepository submissionRepository;
    private final SubmissionCategoryRepository submissionCategoryRepository;
    private final UserRepository userRepository;

    public SubmissionService(SubmissionRepository submissionRepository, UserRepository userRepository, SubmissionCategoryRepository submissionCategoryRepository) {
        this.submissionRepository = submissionRepository;
        this.submissionCategoryRepository = submissionCategoryRepository;
        this.userRepository = userRepository;
    }

    public List<SubmissionCategory> getCategories() {
        return submissionCategoryRepository.findAll();
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
        if (getSubmission(submission.getConferenceId()).getStatusCodeValue() == 200) {
            return ResponseEntity.badRequest().body("Submission already exists for this conference.");
        }
        String conferenceFolderPath = "conferences/" + submission.getConferenceId();
        createFolderIfNotExists(conferenceFolderPath);

        String folderHash = generateFolderHash();
        String userFolderPath = conferenceFolderPath + "/" + folderHash;
        createFolderIfNotExists(userFolderPath);

        saveFilesToFolder(uploadedFiles, userFolderPath);

        Set<User> authors = new HashSet<>(userRepository.findAllById(submission.getCoauthors()));
        User loggedInUser = SecurityConfig.getLoggedInUser();
        authors.add(loggedInUser);

        if (authors.isEmpty()) {
            return ResponseEntity.status(404).body("No authors found.");
        }

        Submission newSubmission = new Submission();
        newSubmission.setThesisTitle(submission.getTitle());
        newSubmission.setAbstractSk(submission.getAbstractSk());
        newSubmission.setAbstractEn(submission.getAbstractEn());
        newSubmission.setFolderHash(folderHash);
        newSubmission.setConferencesId(submission.getConferenceId());
        newSubmission.setThesesCategoriesId(submission.getCategory());
        newSubmission.setAuthors(authors);

        Submission savedSubmission = submissionRepository.save(newSubmission);
        return ResponseEntity.ok(savedSubmission);
    }

    public ResponseEntity<?> getSubmission(Long conferenceId) {
        UUID userId = SecurityConfig.getLoggedInUser().getId();

        Submission submission = submissionRepository.findByConferencesIdAndAuthorsId(conferenceId, userId);
        if (submission == null) {
            return ResponseEntity.status(404).body("No submission found for this conference.");
        }
        SubmissionRequest submissionRequest = new SubmissionRequest(
                submission.getThesisTitle(),
                submission.getAbstractSk(),
                submission.getAbstractEn(),
                submission.getConferencesId(),
                submission.getThesesCategoriesId(),
                submission.getAuthors().stream().map(User::getId).toList()
        );
        return ResponseEntity.ok(submissionRequest);
    }
}