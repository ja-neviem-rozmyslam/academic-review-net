package com.ukf.arn.Universities;

import com.ukf.arn.Entities.University;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UniversityService {
    private final UniversityRepository universityRepository;

    public UniversityService(UniversityRepository universityRepository) {
        this.universityRepository = universityRepository;
    }

    public University getUniversityById(Long id) {
        return universityRepository.findById(id).orElse(null);
    }

    public List<University> getAllUniversities() {
        return universityRepository.findAll();
    }
}
