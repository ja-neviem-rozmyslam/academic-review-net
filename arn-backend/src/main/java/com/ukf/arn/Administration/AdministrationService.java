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
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.*;
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