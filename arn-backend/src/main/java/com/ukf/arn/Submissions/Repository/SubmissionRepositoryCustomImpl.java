package com.ukf.arn.Submissions.Repository;

import com.querydsl.core.Tuple;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.jpa.impl.JPAQuery;
import com.ukf.arn.Administration.Objects.Sort;
import com.ukf.arn.Entities.QUser;
import com.ukf.arn.Entities.Submission;
import com.ukf.arn.Entities.User;
import com.ukf.arn.Submissions.Objects.SubmissionDto;
import com.ukf.arn.Users.Repository.UserRepositoryImpl;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;
import org.springframework.data.domain.Sort.Direction;

import static com.ukf.arn.ConstantsKatalog.*;
import static com.ukf.arn.Entities.SqlUtils.buildOrderSpecifiers;

@Repository
public class SubmissionRepositoryCustomImpl implements SubmissionRepositoryCustom {

    QUser AUTHOR = new QUser("author");
    QUser REVIEWER = new QUser("reviewer");

    @PersistenceContext
    private EntityManager entityManager;


    public SubmissionRepositoryCustomImpl() {
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

        return query.fetch();
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

    @Override
    public List<SubmissionDto> findSubmissionsForConference(Long conferenceId, Sort sort) {
        List<Tuple> results = new JPAQuery<>(entityManager)
                .select(SUBMISSION, AUTHOR, REVIEWER)
                .from(SUBMISSION)
                .leftJoin(AUTHOR).on(SUBMISSION.authorId.eq(AUTHOR.id))
                .leftJoin(REVIEWER).on(SUBMISSION.reviewerId.eq(REVIEWER.id))
                .where(SUBMISSION.conferencesId.eq(conferenceId))
                .orderBy(buildSort(sort))
                .fetch();

        return results.stream().map(tuple -> {
            Submission submission = tuple.get(SUBMISSION);
            User author = tuple.get(AUTHOR);
            User reviewer = tuple.get(REVIEWER);

            SubmissionDto dto = new SubmissionDto();
            if (submission != null) {
                dto.setId(submission.getId());
                dto.setTitle(submission.getThesisTitle());
                if (author != null) {
                    dto.setAuthor(UserRepositoryImpl.mapToUserDto(author));
                }
                if (reviewer != null) {
                    dto.setReviewer(UserRepositoryImpl.mapToUserDto(reviewer));
                }
            }

            return dto;
        }).collect(Collectors.toList());
    }

    private OrderSpecifier[] buildSort(Sort sort) {
        if (sort != null) {
            switch (sort.getColumn()) {
                case "title":
                    return buildOrderSpecifiers(List.of(SUBMISSION.thesisTitle), sort.getDirection());
                case "author":
                    return buildOrderSpecifiers(List.of(AUTHOR.surname, AUTHOR.name), sort.getDirection());
                case "reviewer":
                    return buildOrderSpecifiers(List.of(REVIEWER.surname, REVIEWER.name), sort.getDirection());
            }
        }
        return buildOrderSpecifiers(List.of(SUBMISSION.thesisTitle), Direction.ASC);
    }
}