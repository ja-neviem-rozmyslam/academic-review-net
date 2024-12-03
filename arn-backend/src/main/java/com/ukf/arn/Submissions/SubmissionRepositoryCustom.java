package com.ukf.arn.Submissions;

import java.util.UUID;

public interface SubmissionRepositoryCustom {
    Submission findByConferenceIdAndUserId(Long conferenceId, UUID userId);
}
