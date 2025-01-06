package com.ukf.arn.Conferences.Repository;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.CaseBuilder;
import com.querydsl.jpa.impl.JPAQuery;
import com.ukf.arn.Administration.Objects.ConferenceSearchDto;
import com.ukf.arn.Administration.Objects.Sort;
import com.ukf.arn.Conferences.Objects.ConferenceDto;
import com.ukf.arn.Entities.Conference;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

import java.util.List;
import java.util.UUID;

import static com.ukf.arn.ConstantsKatalog.CONFERENCE;
import static com.ukf.arn.Entities.SqlUtils.*;

public class ConferenceRepositoryImpl implements ConferenceRepositoryCustom {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<Conference> findAllOrderByJoined(UUID userId, boolean isReviewer) {
        JPAQuery<Conference> query = new JPAQuery<>(entityManager)
                .select(CONFERENCE)
                .from(CONFERENCE)
                .where(CONFERENCE.closed.isFalse());

        if (isReviewer) {
            query.where(CONFERENCE.users.any().id.eq(userId));
        }

        query.orderBy(
                new CaseBuilder()
                        .when(CONFERENCE.users.any().id.eq(userId)).then(1)
                        .otherwise(0).desc(),
                CONFERENCE.conferenceName.asc()
        );

        return query.fetch();
    }

    @Override
    public List<Conference> findAllByPredicate(BooleanBuilder predicate, OrderSpecifier orderSpecifier) {
        return new JPAQuery<>(entityManager)
                .select(CONFERENCE)
                .from(CONFERENCE)
                .where(predicate)
                .orderBy(orderSpecifier)
                .fetch();
    }

    public static BooleanBuilder createPredicate(ConferenceSearchDto searchObject) {
        BooleanBuilder predicate = new BooleanBuilder();

        if (!isValueEmpty(searchObject.getName())) {
            predicate.and(createLikePredicate(CONFERENCE.conferenceName, searchObject.getName()));
        }

        if (!isValueEmpty(searchObject.getFaculty())) {
            predicate.and(createLikePredicate(CONFERENCE.faculty, searchObject.getFaculty()));
        }

        if (!isValueEmpty(searchObject.getUploadDeadlineStart())) {
            predicate.and(CONFERENCE.uploadDeadline.goe(searchObject.getUploadDeadlineStart()));
        }

        if (!isValueEmpty(searchObject.getUploadDeadlineEnd())) {
            predicate.and(CONFERENCE.uploadDeadline.loe(searchObject.getUploadDeadlineEnd()));
        }

        if (!isValueEmpty(searchObject.getReviewDeadlineStart())) {
            predicate.and(CONFERENCE.reviewDeadline.goe(searchObject.getReviewDeadlineStart()));
        }

        if (!isValueEmpty(searchObject.getReviewDeadlineEnd())) {
            predicate.and(CONFERENCE.reviewDeadline.loe(searchObject.getReviewDeadlineEnd()));
        }

        if (!isValueEmpty(searchObject.isClosed())) {
            boolean isClosed = Boolean.parseBoolean(searchObject.isClosed());
            predicate.and(CONFERENCE.closed.eq(isClosed));
        }

        return predicate;
    }


    public static OrderSpecifier buildSort(Sort sort) {
        if (sort != null) {
            switch (sort.getColumn()) {
                case "conferenceName":
                    return buildOrderSpecifier(CONFERENCE.conferenceName, sort.getDirection());
                case "uploadDeadline":
                    return buildOrderSpecifier(CONFERENCE.uploadDeadline, sort.getDirection());
                case "reviewDeadline":
                    return buildOrderSpecifier(CONFERENCE.reviewDeadline, sort.getDirection());
                case "creationDate":
                    return buildOrderSpecifier(CONFERENCE.creationDate, sort.getDirection());
                case "faculty":
                    return buildOrderSpecifier(CONFERENCE.faculty, sort.getDirection());
                case "closed":
                    return buildOrderSpecifier(CONFERENCE.closed, sort.getDirection());
                default:
                    return null;
            }
        }
        return null;
    }

    public static ConferenceDto mapToConferenceDto(Conference conference) {
        ConferenceDto conferenceDto = new ConferenceDto();
        conferenceDto.setId(conference.getId());
        conferenceDto.setConferenceName(conference.getConferenceName());
        conferenceDto.setUploadDeadline(conference.getUploadDeadline().toString());
        conferenceDto.setReviewDeadline(conference.getReviewDeadline().toString());
        conferenceDto.setCreationDate(conference.getCreationDate());
        conferenceDto.setFaculty(conference.getFaculty());
        conferenceDto.setClosed(conference.isClosed());
        conferenceDto.setReviewForm(conference.getReviewForm());
        conferenceDto.setHasPassword(conference.hasPassword());
        return conferenceDto;
    }
}
