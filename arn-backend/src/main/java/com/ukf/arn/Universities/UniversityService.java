package com.ukf.arn.Universities;

import com.ukf.arn.Entities.University;
import org.springframework.stereotype.Service;

@Service
public class UniversityService {
    private final UniversityRepository universityRepository;

    public UniversityService(UniversityRepository universityRepository) {
        this.universityRepository = universityRepository;
    }

    public University getUniversityById(int id) {
        return universityRepository.findById(id).orElse(null);
    }
}
