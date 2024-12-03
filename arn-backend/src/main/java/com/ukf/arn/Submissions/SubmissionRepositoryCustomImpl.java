package com.ukf.arn.Submissions;

import com.querydsl.jpa.impl.JPAQuery;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public class SubmissionRepositoryCustomImpl implements SubmissionRepositoryCustom {

    @PersistenceContext
    private EntityManager entityManager;

    private final QSubmission SUBMISSION = QSubmission.submission;


    @Override
    public Submission findByConferenceIdAndUserId(Long conferenceId, UUID userId) {
        return new JPAQuery<>(entityManager)
                .select(QSubmission.submission)
                .from(QSubmission.submission)
                .where(QSubmission.submission.conferences.id.eq(conferenceId)
                        .and(QSubmission.submission.authors.id.eq(userId)))
                .fetchOne();
    }
}