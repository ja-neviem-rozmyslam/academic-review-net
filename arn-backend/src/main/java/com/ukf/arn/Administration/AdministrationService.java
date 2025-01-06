package com.ukf.arn.Administration;

import com.ukf.arn.Administration.Objects.ConferenceSearchDto;
import com.ukf.arn.Administration.Objects.Sort;
import com.ukf.arn.Conferences.Objects.ConferenceDto;
import com.ukf.arn.Conferences.Repository.ConferenceRepository;
import com.ukf.arn.Conferences.Repository.ConferenceRepositoryImpl;
import com.ukf.arn.Entities.Conference;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AdministrationService {

    private final ConferenceRepository conferenceRepository;

    public AdministrationService(ConferenceRepository conferenceRepository) {
        this.conferenceRepository = conferenceRepository;
    }

    public List<ConferenceDto> getConferenceData(ConferenceSearchDto searchObject, Sort sort) {
        List<Conference> conferences = conferenceRepository.findAllByPredicate(ConferenceRepositoryImpl.createPredicate(searchObject));
        return conferences.stream()
                .map(ConferenceRepositoryImpl::mapToConferenceDto)
                .collect(Collectors.toList());
    }
}