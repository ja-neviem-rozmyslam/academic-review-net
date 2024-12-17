package com.ukf.arn.Submissions;

import com.querydsl.core.Tuple;
import com.ukf.arn.Conferences.Conference;
import com.ukf.arn.Conferences.ConferenceRepository;
import com.ukf.arn.Users.User;
import com.ukf.arn.Users.UserRepository;
import com.ukf.arn.config.SecurityConfig;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.apache.coyote.Response;
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

import static com.ukf.arn.ConstantsKatalog.CONFERENCE;
import static com.ukf.arn.ConstantsKatalog.SUBMISSION;

@Service
public class SubmissionService {

    private final SubmissionRepository submissionRepository;
    private final SubmissionCategoryRepository submissionCategoryRepository;
    private final ConferenceRepository conferenceRepository;
    private final UserRepository userRepository;

    public SubmissionService(SubmissionRepository submissionRepository, UserRepository userRepository, ConferenceRepository conferenceRepository, SubmissionCategoryRepository submissionCategoryRepository) {
        this.submissionRepository = submissionRepository;
        this.submissionCategoryRepository = submissionCategoryRepository;
        this.conferenceRepository = conferenceRepository;
        this.userRepository = userRepository;
    }

    public List<SubmissionCategory> getCategories() {
        return submissionCategoryRepository.findAll();
    }

    @Transactional
    public ResponseEntity<?> getSubmission(Long submissionId) {

        Submission submission = submissionRepository.findById(submissionId).orElse(null);
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

        Conference conference = conferenceRepository.findById(submissionRequest.getConferenceId())
                .orElseThrow(() -> new IllegalArgumentException("Konferencia neexistuje."));

        if (conference.isClosed() && conference.isUserInConference(SecurityConfig.getLoggedInUser().getId())) {
            return ResponseEntity.badRequest().body("Konferencia je uzavretá.");
        }

        if (submissionRequest.getId() != null) {
            submission = submissionRepository.findById(submissionRequest.getId()).orElseThrow();
            submission.setThesisTitle(submissionRequest.getTitle());
            submission.setAbstractSk(submissionRequest.getAbstractSk());
            submission.setAbstractEn(submissionRequest.getAbstractEn());
            submission.setAuthorId(SecurityConfig.getLoggedInUser().getId());
            submission.setCoauthors(submissionRequest.getCoauthors());
        } else {
            submission = new Submission(
                    submissionRequest.getTitle(),
                    submissionRequest.getAbstractSk(),
                    submissionRequest.getAbstractEn(),
                    SecurityConfig.getLoggedInUser().getId(),
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
                savedSubmission.getAbstractSk()
        );

        return ResponseEntity.ok(submissionDto);
    }

    public ResponseEntity<?> findAllSubmissionsByUser(boolean submissionsForReview) {
        UUID userId = SecurityConfig.getLoggedInUser().getId();
        List<Tuple> results = submissionRepository.findUserSubmissions(userId, submissionsForReview);

        List<Map<String, Object>> submissionsWithStatus = new ArrayList<>();
        for (Tuple result : results) {
            Submission submission = result.get(SUBMISSION);
            boolean isClosed = result.get(CONFERENCE.closed);
            Long conferenceId = result.get(CONFERENCE.id);

            SubmissionDto submissionDto = new SubmissionDto();
            submissionDto.setConferenceId(conferenceId);
            if (submission != null) {
                submissionDto.setId(submission.getId());
                submissionDto.setTitle(submission.getThesisTitle());
                submissionDto.setCategory(submission.getThesesType());
            }

            Map<String, Object> submissionWithStatus = new HashMap<>();
            submissionWithStatus.put("submission", submissionDto);
            submissionWithStatus.put("isClosed", isClosed);

            submissionsWithStatus.add(submissionWithStatus);
        }

        return ResponseEntity.ok(submissionsWithStatus);
    }

    private void createFolderIfNotExists(String folderPath) throws IOException {
        Path path = Paths.get(folderPath);
        if (!Files.exists(path)) {
            Files.createDirectories(path);
        }
    }

    public ResponseEntity<?> getFiles(Long submissionId) {
        Submission submission = submissionRepository.findById(submissionId).orElseThrow();
        String conferenceFolderPath = "conferences/" + submission.getConferencesId();
        String userFolderPath = conferenceFolderPath + "/" + submission.getAuthorId().toString();
        Path path = Paths.get(userFolderPath);
        if (!Files.exists(path)) {
            return ResponseEntity.status(404).body("No files found for this submission.");
        }
        return ResponseEntity.ok(path.toFile().listFiles());
    }

    private void saveFilesToFolder(MultipartFile[] files, String folderPath) throws IOException {
        for (MultipartFile file : files) {
            Path destination = Paths.get(folderPath, file.getOriginalFilename());
            Files.copy(file.getInputStream(), destination, StandardCopyOption.REPLACE_EXISTING);
        }
    }

    public Resource getFileAsResource(Long submissionId, String filename) {
        try {
            Submission submission = submissionRepository.findById(submissionId).orElseThrow(() -> new RuntimeException("Submission not found"));
            String userFolderPath = "conferences/" + submission.getConferencesId() + "/" + submission.getAuthorId().toString();
            Path filePath = Paths.get(userFolderPath, filename).normalize();
            Resource resource = new UrlResource(filePath.toUri());
            if (resource.exists()) {
                return resource;
            } else {
                throw new RuntimeException("File not found " + filename);
            }
        } catch (Exception e) {
            throw new RuntimeException("File not found " + filename, e);
        }
    }
}