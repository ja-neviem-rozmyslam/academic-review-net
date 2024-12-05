package com.ukf.arn.Conferences;

import com.querydsl.core.types.dsl.CaseBuilder;
import com.querydsl.jpa.impl.JPAQuery;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

import java.util.List;
import java.util.UUID;

import static com.ukf.arn.ConstantsKatalog.CONFERENCE;

public class ConferenceRepositoryImpl implements ConferenceRepositoryCustom {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<Conference> findAllOrderByJoined(UUID userId) {
        return new JPAQuery<>(entityManager)
                .select(CONFERENCE)
                .from(CONFERENCE)
                .orderBy(
                        new CaseBuilder()
                                .when(CONFERENCE.users.any().id.eq(userId)).then(1)
                                .otherwise(0).desc(),
                        CONFERENCE.conferenceName.asc()
                )
                .fetch();

    }
}
