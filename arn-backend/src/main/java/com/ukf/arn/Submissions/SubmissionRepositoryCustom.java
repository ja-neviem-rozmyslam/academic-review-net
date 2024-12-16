package com.ukf.arn.Submissions;

import com.querydsl.core.Tuple;

import java.util.List;
import java.util.UUID;

public interface SubmissionRepositoryCustom {
    Submission findByConferenceIdAndUserId(Long conferenceId, UUID userId);

    List<Tuple> findUserSubmissions(UUID userId, boolean forReview);
}
