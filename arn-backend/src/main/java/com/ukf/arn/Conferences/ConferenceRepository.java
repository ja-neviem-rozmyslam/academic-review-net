package com.ukf.arn.Conferences;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ConferenceRepository extends JpaRepository<Conference, Long>, ConferenceRepositoryCustom {

}
