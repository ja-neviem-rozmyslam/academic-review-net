package com.ukf.arn.Universities;

import com.ukf.arn.Entities.University;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UniversityRepository extends JpaRepository<University, Long> {

}