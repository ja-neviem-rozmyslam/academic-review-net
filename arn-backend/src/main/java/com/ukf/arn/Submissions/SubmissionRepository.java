package com.ukf.arn.Submissions;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface SubmissionRepository extends JpaRepository<Submission, Long> {
    Submission findByConferencesIdAndAuthorsId(Long conferenceId, UUID authorId);
}