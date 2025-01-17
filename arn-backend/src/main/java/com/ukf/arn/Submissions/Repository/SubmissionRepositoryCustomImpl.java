package com.ukf.arn.Submissions.Repository;

import com.querydsl.core.Tuple;
import com.querydsl.jpa.impl.JPAQuery;
import com.ukf.arn.Entities.Submission;
import com.ukf.arn.Entities.User;
import com.ukf.arn.Submissions.Objects.SubmissionDto;
import com.ukf.arn.Users.Repository.UserRepository;
import com.ukf.arn.Users.Repository.UserRepositoryImpl;
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

    private final UserRepository userRepository;

    public SubmissionRepositoryCustomImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

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
        JPAQuery<Tuple> query = new JPAQuery<>(entityManager)
                .select(SUBMISSION, CONFERENCE.closed, CONFERENCE.id)
                .from(CONFERENCE)
                .leftJoin(CONFERENCE.users, USER);

        if (forReview) {
            query.innerJoin(SUBMISSION)
                    .on(SUBMISSION.conferencesId.eq(CONFERENCE.id)
                            .and(SUBMISSION.reviewerId.eq(userId)));
        } else {
            query.leftJoin(SUBMISSION)
                    .on(SUBMISSION.conferencesId.eq(CONFERENCE.id)
                            .and(SUBMISSION.authorId.eq(userId)));
        }

        return query.where(USER.id.eq(userId))
                .fetch();
    }


    @Override
    public List<Submission> findByUser(UUID userId, boolean forReview) {
        return new JPAQuery<>(entityManager)
                .select(SUBMISSION)
                .from(SUBMISSION)
                .join(CONFERENCE)
                .on(SUBMISSION.conferencesId.eq(CONFERENCE.id))
                .where((forReview ? SUBMISSION.reviewerId.eq(userId) : SUBMISSION.authorId.eq(userId))
                        .and(CONFERENCE.closed.isFalse()))
                .fetch();
    }

    public SubmissionDto mapToSubmissionDto(Submission submission) {
        SubmissionDto dto = new SubmissionDto();
        dto.setId(submission.getId());
        dto.setTitle(submission.getThesisTitle());

        if(submission.getReviewerId() != null) {
            User reviewer = userRepository.findById(submission.getReviewerId()).orElse(null);
            dto.setReviewer(UserRepositoryImpl.mapToUserDto(reviewer));
        }

        User author = userRepository.findById(submission.getAuthorId()).orElse(null);

        if(author != null) {
            dto.setAuthor(UserRepositoryImpl.mapToUserDto(author));
        }

        return dto;
    }
}