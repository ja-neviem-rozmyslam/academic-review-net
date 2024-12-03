package com.ukf.arn.Submissions;

import com.querydsl.jpa.impl.JPAQuery;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;

import java.util.List;

import java.util.UUID;

@Repository
public class SubmissionRepositoryCustomImpl implements SubmissionRepositoryCustom {
    private final QSubmission SUBMISSION = QSubmission.submission;

    @PersistenceContext
    private EntityManager entityManager;


    @Override
    public Submission findByConferenceIdAndUserId(Long conferenceId, UUID userId) {
        return new JPAQuery<>(entityManager)
                .select(SUBMISSION)
                .from(SUBMISSION)
                .where(SUBMISSION.conferencesId.eq(conferenceId)
                        .and(SUBMISSION.authors.any().id.eq(userId)
                                .or(SUBMISSION.reviewerId.eq(userId))))
                .fetchOne();
    }
}