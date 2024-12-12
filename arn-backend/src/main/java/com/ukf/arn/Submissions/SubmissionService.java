package com.ukf.arn.Submissions;

import com.ukf.arn.Users.User;
import com.ukf.arn.Users.UserRepository;
import com.ukf.arn.config.SecurityConfig;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
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

    @Transactional
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
                submission.getThesesType(),
                submission.getCoauthors()
        );
        return ResponseEntity.ok(submissionRequest);
    }

    @Transactional
    public ResponseEntity<?> createSubmission(SubmissionRequest submissionRequest, MultipartFile[] uploadedFiles) throws IOException {
        Submission submission;

        if (submissionRequest.getId() != null) {
            submission = submissionRepository.findById(submissionRequest.getId()).orElseThrow();
            submission.setThesisTitle(submissionRequest.getTitle());
            submission.setAbstractSk(submissionRequest.getAbstractSk());
            submission.setAbstractEn(submissionRequest.getAbstractEn());
            submission.setAuthor(SecurityConfig.getLoggedInUser());
            submission.setCoauthors(submissionRequest.getCoauthors());
        } else {
            submission = new Submission(
                    submissionRequest.getTitle(),
                    submissionRequest.getAbstractSk(),
                    submissionRequest.getAbstractEn(),
                    SecurityConfig.getLoggedInUser(),
                    submissionRequest.getConferenceId(),
                    submissionRequest.getCategory(),
                    submissionRequest.getCoauthors()
            );
        }

        String conferenceFolderPath = "conferences/" + submissionRequest.getConferenceId();
        String userFolderPath = conferenceFolderPath + "/" + SecurityConfig.getLoggedInUser().getId().toString();
        createFolderIfNotExists(userFolderPath);

        saveFilesToFolder(uploadedFiles, userFolderPath);

        Submission savedSubmission = submissionRepository.save(submission);

        SubmissionDto submissionDto = new SubmissionDto(
                savedSubmission.getId(),
                savedSubmission.getThesisTitle(),
                savedSubmission.getThesesType(),
                savedSubmission.getAbstractEn(),
                savedSubmission.getAbstractSk(),
                null
        );

        return ResponseEntity.ok(submissionDto);
    }

    private Set<User> getAuthors(List<UUID> coauthors) {
        Set<User> authors = new HashSet<>();
        if (!coauthors.isEmpty()) {
            userRepository.findAllById(coauthors).forEach(authors::add);
        }
        authors.add(SecurityConfig.getLoggedInUser());
        return authors;
    }

    private void createFolderIfNotExists(String folderPath) throws IOException {
        Path path = Paths.get(folderPath);
        if (!Files.exists(path)) {
            Files.createDirectories(path);
        }
    }

    private void saveFilesToFolder(MultipartFile[] files, String folderPath) throws IOException {
        for (MultipartFile file : files) {
            Path destination = Paths.get(folderPath, file.getOriginalFilename());
            Files.copy(file.getInputStream(), destination, StandardCopyOption.REPLACE_EXISTING);
        }
    }
}