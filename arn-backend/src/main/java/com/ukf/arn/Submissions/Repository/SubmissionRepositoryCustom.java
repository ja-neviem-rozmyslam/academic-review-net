package com.ukf.arn.Submissions.Repository;

import com.querydsl.core.Tuple;
import com.ukf.arn.Entities.Submission;

import java.util.List;
import java.util.UUID;

public interface SubmissionRepositoryCustom {
    Submission findByConferenceIdAndUserId(Long conferenceId, UUID userId);

    List<Tuple> findUserSubmissions(UUID userId, boolean forReview);
}
