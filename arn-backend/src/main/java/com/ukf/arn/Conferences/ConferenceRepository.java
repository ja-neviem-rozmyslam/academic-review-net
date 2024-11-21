package com.ukf.arn.Conferences;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ConferenceRepository extends JpaRepository<Conference, Long> {

    //TODO: Use jpa query instead of native query
    @Query("SELECT COUNT(c) > 0 FROM Conference c JOIN c.users u WHERE c.id = :conferenceId AND u.id = :userId")
    boolean isUserJoined(@Param("conferenceId") Long conferenceId, @Param("userId") UUID userId);

}
