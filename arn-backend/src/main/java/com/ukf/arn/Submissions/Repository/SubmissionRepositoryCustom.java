package com.ukf.arn.Submissions.Repository;

import com.querydsl.core.Tuple;
import com.ukf.arn.Entities.Submission;
import com.ukf.arn.Submissions.Objects.SubmissionDto;

import java.util.List;
import java.util.UUID;

public interface SubmissionRepositoryCustom {
    Submission findByConferenceIdAndUserId(Long conferenceId, UUID userId);

    List<Tuple> findUserSubmissions(UUID userId, boolean forReview);

    SubmissionDto mapToSubmissionDto(Submission submission);

    List<Submission> findByUser(UUID userId, boolean forReview);
}
