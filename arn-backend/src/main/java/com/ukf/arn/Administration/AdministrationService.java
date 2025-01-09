package com.ukf.arn.Administration;

import com.querydsl.core.BooleanBuilder;
import com.ukf.arn.Administration.Objects.ConferenceSearchDto;
import com.ukf.arn.Administration.Objects.Sort;
import com.ukf.arn.Administration.Objects.UserSearchDto;
import com.ukf.arn.Conferences.Objects.ConferenceDto;
import com.ukf.arn.Conferences.Repository.ConferenceRepository;
import com.ukf.arn.Conferences.Repository.ConferenceRepositoryImpl;
import com.ukf.arn.EmailDomain.EmailDomainDto;
import com.ukf.arn.EmailDomain.EmailDomainRepository;
import com.ukf.arn.Entities.Conference;
import com.ukf.arn.Entities.EmailDomain;
import com.ukf.arn.Entities.University;
import com.ukf.arn.Entities.User;
import com.ukf.arn.Universities.UniversityDto;
import com.ukf.arn.Universities.UniversityRepository;
import com.ukf.arn.Users.Objects.UserDto;
import com.ukf.arn.Users.Repository.UserRepository;
import com.ukf.arn.Users.Repository.UserRepositoryImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class AdministrationService {

    private final ConferenceRepository conferenceRepository;
    private final UserRepository userRepository;
    private final UniversityRepository universityRepository;
    private final EmailDomainRepository emailDomainRepository;

    public AdministrationService(ConferenceRepository conferenceRepository, UserRepository userRepository, UniversityRepository universityRepository, EmailDomainRepository emailDomainRepository) {
        this.conferenceRepository = conferenceRepository;
        this.userRepository = userRepository;
        this.universityRepository = universityRepository;
        this.emailDomainRepository = emailDomainRepository;
    }

    public List<ConferenceDto> getConferenceData(ConferenceSearchDto searchObject, Sort sort) {
        BooleanBuilder predicate = ConferenceRepositoryImpl.createPredicate(searchObject);
        List<Conference> conferences = conferenceRepository.findAllByPredicate(predicate, sort);
        return conferences.stream()
                .map(ConferenceRepositoryImpl::mapToConferenceDto)
                .collect(Collectors.toList());
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

    public EmailDomainDto addDomainToUniversity(Long universityId) {
        University university = universityRepository.findById(universityId).orElseThrow();
        EmailDomain emailDomain = new EmailDomain("", university);
        emailDomainRepository.save(emailDomain);

        return new EmailDomainDto(emailDomain.getId(), emailDomain.getDomain());
    }

    public ResponseEntity<?> removeDomainFromUniversity(Long domainId) {
        EmailDomain emailDomain = emailDomainRepository.findById(domainId).orElseThrow();
        emailDomainRepository.delete(emailDomain);
        return ResponseEntity.ok().build();
    }

    public ResponseEntity<?> saveUniversity(UniversityDto universityDto) {
        University university = universityRepository.findById(universityDto.getId()).orElseThrow();
        university.setName(universityDto.getName());
        universityRepository.save(university);

        for (EmailDomainDto domainDto : universityDto.getDomain()) {
            EmailDomain domain = emailDomainRepository.findById(domainDto.getId()).orElseThrow();
            domain.setDomain(domainDto.getDomain());
            emailDomainRepository.save(domain);
        }

        return ResponseEntity.ok().build();
    }

    public UniversityDto addUniversity() {
        University university = new University("");
        universityRepository.save(university);

        return new UniversityDto(university.getId(), university.getName(), new ArrayList<>());
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
}