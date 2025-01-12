package com.ukf.arn.Administration;

import com.querydsl.core.BooleanBuilder;
import com.ukf.arn.Administration.Objects.ConferenceSearchDto;
import com.ukf.arn.Administration.Objects.Sort;
import com.ukf.arn.Administration.Objects.UserSearchDto;
import com.ukf.arn.Conferences.Objects.ConferenceDto;
import com.ukf.arn.Conferences.Repository.ConferenceRepository;
import com.ukf.arn.Conferences.Repository.ConferenceRepositoryImpl;
import com.ukf.arn.ConstantsKatalog;
import com.ukf.arn.EmailDomain.EmailDomainDto;
import com.ukf.arn.EmailDomain.EmailDomainRepository;
import com.ukf.arn.Entities.*;
import com.ukf.arn.Submissions.Objects.SubmissionDto;
import com.ukf.arn.Submissions.Repository.SubmissionRepository;
import com.ukf.arn.Universities.UniversityDto;
import com.ukf.arn.Universities.UniversityRepository;
import com.ukf.arn.Users.Objects.UserDto;
import com.ukf.arn.Users.Repository.UserRepository;
import com.ukf.arn.Users.Repository.UserRepositoryImpl;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.*;
import java.nio.file.Path;
import java.util.*;
import java.util.stream.Collectors;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

@Service
public class AdministrationService {

    private final ConferenceRepository conferenceRepository;
    private final UserRepository userRepository;
    private final UniversityRepository universityRepository;
    private final EmailDomainRepository emailDomainRepository;
    private final SubmissionRepository submissionRepository;
    private final PasswordEncoder passwordEncoder;

    public AdministrationService(ConferenceRepository conferenceRepository,
                                 UserRepository userRepository,
                                 PasswordEncoder passwordEncoder,
                                 UniversityRepository universityRepository,
                                 EmailDomainRepository emailDomainRepository,
                                 SubmissionRepository submissionRepository) {
        this.conferenceRepository = conferenceRepository;
        this.userRepository = userRepository;
        this.universityRepository = universityRepository;
        this.passwordEncoder = passwordEncoder;
        this.emailDomainRepository = emailDomainRepository;
        this.submissionRepository = submissionRepository;

    }

    public List<Conference> getConferenceData(ConferenceSearchDto searchObject, Sort sort) {
        BooleanBuilder predicate = ConferenceRepositoryImpl.createPredicate(searchObject);
        List<Conference> conferences = conferenceRepository.findAllByPredicate(predicate, sort);
        return conferences;
    }

    public Conference getConference(Long id) {
        return conferenceRepository.findById(id).orElseThrow();
    }

    public List<UserDto> getUserData(UserSearchDto searchObject, Sort sort) {
        BooleanBuilder predicate = UserRepositoryImpl.createPredicate(searchObject);
        List<User> users = userRepository.findAllByPredicate(predicate, sort);
        return users.stream()
                .map(UserRepositoryImpl::mapToUserDto)
                .collect(Collectors.toList());
    }


    public List<UniversityDto> getAllUniversityDtos() {
        List<University> allUniversities = universityRepository.findAll();
        List<EmailDomain> allEmailDomains = emailDomainRepository.findAll();

        Map<Long, List<EmailDomain>> domainGroupedByUniversity = allEmailDomains.stream()
                .collect(Collectors.groupingBy(domain -> domain.getUniversity().getId()));

        return allUniversities.stream()
                .map(university -> {
                    List<EmailDomain> domains = domainGroupedByUniversity.getOrDefault(university.getId(), Collections.emptyList());

                    List<EmailDomainDto> domainDtos = domains.stream()
                            .map(domain -> new EmailDomainDto(domain.getId(), domain.getDomain()))
                            .collect(Collectors.toList());

                    return new UniversityDto(university.getId(), university.getName(), domainDtos);
                })
                .collect(Collectors.toList());
    }

    public ResponseEntity<?> saveUniversity(UniversityDto universityDto, List<Long> removedDomains) {
        University university;

        if (removedDomains != null && !removedDomains.isEmpty()) {
            emailDomainRepository.deleteAllById(removedDomains);
        }

        if (universityDto.getId() < 0) {
            university = new University(universityDto.getName());
        } else {
            university = universityRepository.findById(universityDto.getId()).orElseThrow();
            university.setName(universityDto.getName());
        }

        universityRepository.save(university);

        for (EmailDomainDto domainDto : universityDto.getDomain()) {
            EmailDomain domain;
            if (domainDto.getId() < 0) {
                domain = new EmailDomain(domainDto.getDomain(), university);
                emailDomainRepository.save(domain);
            } else {
                domain = emailDomainRepository.findById(domainDto.getId()).orElseThrow();
                domain.setDomain(domainDto.getDomain());
            }
            emailDomainRepository.save(domain);
        }

        return ResponseEntity.ok().build();
    }

    public ResponseEntity<?> createAdminUser(User userDto) {
        User user = new User();
        if (userRepository.findByEmail(userDto.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Admin s takýmto prihlasovacím menom už existuje");
        }
        user.setName(userDto.getName());
        user.setSurname(userDto.getSurname());
        user.setEmail(userDto.getEmail());
        user.setPassword(passwordEncoder.encode(userDto.getPassword()));
        user.setRoles(Collections.singletonList(ConstantsKatalog.Role.ADMIN.getCode()));
        user.setVerified(true);
        return ResponseEntity.ok(userRepository.save(user));
    }

    public ResponseEntity<?> removeUniversity(Long universityId, UniversityDto universityDto) {
        if (universityDto.getDomain() != null) {
            for (EmailDomainDto domainDto : universityDto.getDomain()) {
                EmailDomain domain = emailDomainRepository.findById(domainDto.getId()).orElseThrow();
                emailDomainRepository.delete(domain);
            }
        }
        University university = universityRepository.findById(universityId).orElseThrow();
        universityRepository.delete(university);
        return ResponseEntity.ok().build();
    }

    public ResponseEntity<?> updateConference(Conference conferenceDto) {
        Conference conference;
        if (conferenceDto.getId() != null) {
            conference = conferenceRepository.findById(conferenceDto.getId()).orElseThrow();
        } else {
            conference = new Conference();
        }

        if(conference.isClosed()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Cannot update closed conference");
        }

        conference.setConferenceName(conferenceDto.getConferenceName());
        conference.setFaculty(conferenceDto.getFaculty());
        conference.setReviewDeadline(conferenceDto.getReviewDeadline());
        conference.setUploadDeadline(conferenceDto.getUploadDeadline());
        conference.setPassword(conferenceDto.getPassword());
        conference.setClosed(conferenceDto.isClosed());
        conference.setReviewForm(conferenceDto.getReviewForm());
        conferenceRepository.save(conference);

        return ResponseEntity.ok().build();
    }

    public ResponseEntity<?> closeConference(Long conferenceId) {
        Conference conference = conferenceRepository.findById(conferenceId).orElseThrow();
        conference.setClosed(true);
        conferenceRepository.save(conference);
        return ResponseEntity.ok().build();
    }

    public ResponseEntity<?> getConferenceSubmissions(Long conferenceId) {
        List<Submission> submissions = submissionRepository.findByConferencesId(conferenceId);
        List<SubmissionDto> submissionsDto = submissions.stream()
                .map(submission -> submissionRepository.mapToSubmissionDto(submission))
                .collect(Collectors.toList());
        return ResponseEntity.ok(submissionsDto);
    }

    public byte[] downloadConferenceSubmissions(Long conferenceId) {
        try {
            String conferenceFolderPath = "conferences/" + conferenceId;

            File conferenceFolder = new File(conferenceFolderPath);
            if (!conferenceFolder.exists() || !conferenceFolder.isDirectory()) {
                throw new RuntimeException("Konferencia nemá žiadne odovzdané práce: " + conferenceFolderPath);
            }

            Map<String, String> uuidToUserNameMap = getUserMappingFromService(conferenceFolder);

            ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
            try (ZipOutputStream zipOutputStream = new ZipOutputStream(byteArrayOutputStream)) {
                addFilesToZip(conferenceFolder, zipOutputStream, conferenceFolder.toPath(), uuidToUserNameMap);
                zipOutputStream.finish();
            }

            return byteArrayOutputStream.toByteArray();

        } catch (Exception e) {
            throw new RuntimeException("Problém so zipovaním súborov", e);
        }
    }

    private void addFilesToZip(File folder, ZipOutputStream zipOutputStream, Path basePath, Map<String, String> uuidToUserNameMap) throws IOException {
        for (File file : folder.listFiles()) {
            if (file.isFile()) {
                Path relativePath = basePath.relativize(file.toPath());

                String zipEntryPath = replaceUuidWithUserName(relativePath.toString(), uuidToUserNameMap);

                try (FileInputStream fileInputStream = new FileInputStream(file)) {
                    zipOutputStream.putNextEntry(new ZipEntry(zipEntryPath.replace("\\", "/")));

                    byte[] buffer = new byte[1024];
                    int bytesRead;
                    while ((bytesRead = fileInputStream.read(buffer)) != -1) {
                        zipOutputStream.write(buffer, 0, bytesRead);
                    }

                    zipOutputStream.closeEntry();
                }
            } else if (file.isDirectory()) {
                addFilesToZip(file, zipOutputStream, basePath, uuidToUserNameMap);
            }
        }
    }

    private Map<String, String> getUserMappingFromService(File conferenceFolder) {
        Map<String, String> uuidToUserNameMap = new HashMap<>();

        for (File subFolder : conferenceFolder.listFiles()) {
            if (subFolder.isDirectory()) {
                String uuid = subFolder.getName();

                String userName = null;
                if (isValidUUID(uuid)) {
                    userName = userRepository.getNameAndSurnameById(uuid);
                }

                uuidToUserNameMap.put(uuid, Objects.requireNonNullElse(userName, uuid));
            }
        }

        return uuidToUserNameMap;
    }

    private String replaceUuidWithUserName(String path, Map<String, String> uuidToUserNameMap) {
        for (Map.Entry<String, String> entry : uuidToUserNameMap.entrySet()) {
            String uuid = entry.getKey();
            String userName = entry.getValue();

            if (path.contains(uuid)) {
                return path.replace(uuid, userName);
            }
        }
        return path;
    }

    private boolean isValidUUID(String uuid) {
        try {
            UUID.fromString(uuid);
            return true;
        } catch (IllegalArgumentException e) {
            return false;
        }
    }

    public ResponseEntity<?> deleteUser(UUID userId) {
        try {
            User user = userRepository.findById(userId).orElseThrow(() -> new NoSuchElementException("User not found"));
            userRepository.delete(user);
            return ResponseEntity.ok().build();
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while deleting the user");
        }
    }
}