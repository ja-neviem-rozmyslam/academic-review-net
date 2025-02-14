package com.ukf.arn.Submissions;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.querydsl.core.Tuple;
import com.ukf.arn.Conferences.Repository.ConferenceRepository;
import com.ukf.arn.Entities.Conference;
import com.ukf.arn.Entities.Submission;
import com.ukf.arn.Entities.SubmissionCategory;
import com.ukf.arn.Submissions.Objects.ReviewBlock;
import com.ukf.arn.Submissions.Objects.SubmissionDto;
import com.ukf.arn.Submissions.Objects.SubmissionRequest;
import com.ukf.arn.Submissions.Repository.SubmissionCategoryRepository;
import com.ukf.arn.Submissions.Repository.SubmissionRepository;
import com.ukf.arn.Users.Repository.UserRepository;
import com.ukf.arn.config.SecurityConfig;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.*;
import java.util.stream.Collectors;

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
        submissionRequest.setId(submission.getId());
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
            submission.setThesesType(submissionRequest.getCategory());
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

    public ResponseEntity<?> saveReview(Long submissionId, List<ReviewBlock> reviewBlocks) {
        Submission submission = submissionRepository.findById(submissionId).orElse(null);
        if (submission != null) {
            ObjectMapper objectMapper = new ObjectMapper();
            try {
                String reviewBlocksJson = objectMapper.writeValueAsString(reviewBlocks);
                submission.setReview(reviewBlocksJson);
                submissionRepository.save(submission);
                return ResponseEntity.ok(reviewBlocks);
            } catch (JsonProcessingException e) {
                return ResponseEntity.status(500).body("Error parsing review to JSON.");
            }
        } else {
            return ResponseEntity.status(404).body("Submission not found.");
        }
    }

    public ResponseEntity<?> getReview(Long submissionId) {
        Submission submission = submissionRepository.findById(submissionId).orElse(null);
        if (submission != null) {
            ObjectMapper objectMapper = new ObjectMapper();
            try {
                List<ReviewBlock> reviewBlocks = objectMapper.readValue(submission.getReview(), objectMapper.getTypeFactory().constructCollectionType(List.class, ReviewBlock.class));
                return ResponseEntity.ok(reviewBlocks);
            } catch (JsonProcessingException e) {
                return ResponseEntity.status(500).body("Error parsing review from JSON.");
            }
        } else {
            return ResponseEntity.status(404).body("Submission not found.");
        }
    }

    public ResponseEntity<?> findAllSubmissionsByUser(boolean submissionsForReview) {
        UUID userId = SecurityConfig.getLoggedInUser().getId();
        List<Tuple> results = submissionRepository.findUserSubmissions(userId, submissionsForReview);

        List<Map<String, Object>> submissionsWithStatus = new ArrayList<>();
        for (Tuple result : results) {
            Submission submission = result.get(SUBMISSION);
            boolean isClosed = Boolean.TRUE.equals(result.get(CONFERENCE.closed));
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
        File[] files = path.toFile().listFiles();
        if (files == null) {
            return ResponseEntity.status(404).body("No files found for this submission.");
        }

        List<String> relativePaths = Arrays.stream(files)
                .map(file -> path.relativize(file.toPath()).toString())
                .collect(Collectors.toList());

        return ResponseEntity.ok(relativePaths);
    }

    private void saveFilesToFolder(MultipartFile[] files, String folderPath) throws IOException {

        Set<String> uploadedFileNames = new HashSet<>();
        for (MultipartFile file : files) {
            uploadedFileNames.add(file.getOriginalFilename());
        }

        Path folder = Paths.get(folderPath);
        if (Files.exists(folder)) {
            Files.list(folder).forEach(existingFile -> {
                if (!uploadedFileNames.contains(existingFile.getFileName().toString())) {
                    try {
                        Files.delete(existingFile);
                    } catch (IOException e) {
                        System.err.println("Error deleting file: " + existingFile.getFileName() + " - " + e.getMessage());
                    }
                }
            });
        }

        for (MultipartFile file : files) {
            if (file.isEmpty()) {
                continue;
            }
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