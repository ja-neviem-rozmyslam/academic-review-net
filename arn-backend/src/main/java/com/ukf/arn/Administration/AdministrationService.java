package com.ukf.arn.Administration;

import com.ukf.arn.Conferences.Objects.ConferenceDto;
import com.ukf.arn.Conferences.Repository.ConferenceRepository;
import com.ukf.arn.Conferences.Repository.ConferenceRepositoryImpl;
import com.ukf.arn.Entities.Conference;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class AdministrationService {

    private final ConferenceRepository conferenceRepository;

    public AdministrationService(ConferenceRepository conferenceRepository) {
        this.conferenceRepository = conferenceRepository;
    }

    public List<ConferenceDto> getConferenceData(Map<String, Object> searchObject, String sortColumn, String sortDirection) {
        List<Conference> conferences = conferenceRepository.findAll();
        return conferences.stream()
                .map(ConferenceRepositoryImpl::mapToConferenceDto)
                .collect(Collectors.toList());
    }
}