package com.ukf.arn.Conferences.Repository;

import com.querydsl.core.types.dsl.CaseBuilder;
import com.querydsl.jpa.impl.JPAQuery;
import com.ukf.arn.Conferences.Objects.ConferenceDto;
import com.ukf.arn.Entities.Conference;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

import java.util.List;
import java.util.UUID;

import static com.ukf.arn.ConstantsKatalog.CONFERENCE;

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
