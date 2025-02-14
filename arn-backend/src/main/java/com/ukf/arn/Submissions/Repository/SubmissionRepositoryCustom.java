package com.ukf.arn.Submissions.Repository;

import com.querydsl.core.Tuple;
import com.ukf.arn.Administration.Objects.Sort;
import com.ukf.arn.Entities.Submission;
import com.ukf.arn.Submissions.Objects.SubmissionDto;

import java.util.List;
import java.util.UUID;

public interface SubmissionRepositoryCustom {

    List<Tuple> findUserSubmissions(UUID userId, boolean forReview);

    List<Submission> findByUser(UUID userId, boolean forReview);

    List<SubmissionDto> findSubmissionsForConference(Long conferenceId, Sort sort);
}
