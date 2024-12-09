package com.ukf.arn.Conferences;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface ConferenceRepository extends JpaRepository<Conference, Long>, ConferenceRepositoryCustom {
    List<Conference> findAllByUsersIdOrderByUploadDeadline(UUID userId);
}
