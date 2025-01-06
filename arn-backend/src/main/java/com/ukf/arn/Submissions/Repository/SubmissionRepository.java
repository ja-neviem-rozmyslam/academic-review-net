package com.ukf.arn.Submissions.Repository;

import com.ukf.arn.Entities.Submission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface SubmissionRepository extends JpaRepository<Submission, Long>, SubmissionRepositoryCustom {
    Submission findByConferencesIdAndAuthorId(Long conferenceId, UUID authorId);

    List<Submission> findByAuthorId(UUID authorId);

    List<Submission> findByReviewerId(UUID reviewerId);
}