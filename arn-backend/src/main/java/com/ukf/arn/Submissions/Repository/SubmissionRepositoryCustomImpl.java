package com.ukf.arn.Submissions.Repository;

import com.querydsl.core.Tuple;
import com.querydsl.jpa.impl.JPAQuery;
import com.ukf.arn.Entities.Submission;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

import static com.ukf.arn.ConstantsKatalog.*;

@Repository
public class SubmissionRepositoryCustomImpl implements SubmissionRepositoryCustom {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Submission findByConferenceIdAndUserId(Long conferenceId, UUID userId) {
        return new JPAQuery<>(entityManager)
                .select(SUBMISSION)
                .from(SUBMISSION)
                .where(SUBMISSION.conferencesId.eq(conferenceId)
                        .and(SUBMISSION.authorId.eq(userId)
                                .or(SUBMISSION.reviewerId.eq(userId))))
                .fetchFirst();
    }

    @Override
    public List<Tuple> findUserSubmissions(UUID userId, boolean forReview) {
        return new JPAQuery<Tuple>(entityManager)
                .select(SUBMISSION, CONFERENCE.closed, CONFERENCE.id)
                .from(CONFERENCE)
                .leftJoin(CONFERENCE.users, USER)
                .leftJoin(SUBMISSION)
                .on(SUBMISSION.conferencesId.eq(CONFERENCE.id)
                        .and(forReview ? SUBMISSION.reviewerId.eq(userId) : SUBMISSION.authorId.eq(userId)))
                .where(USER.id.eq(userId))
                .fetch();
    }
}