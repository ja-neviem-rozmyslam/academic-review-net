package com.ukf.arn.Conferences.Repository;

import com.ukf.arn.Entities.Conference;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface ConferenceRepository extends JpaRepository<Conference, Long>, ConferenceRepositoryCustom {
    List<Conference> findAllByUsersIdAndClosedFalseOrderByUploadDeadline(UUID userId);
}
