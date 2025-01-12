package com.ukf.arn.Conferences.Repository;

import com.querydsl.core.BooleanBuilder;
import com.ukf.arn.Administration.Objects.Sort;
import com.ukf.arn.Entities.Conference;

import java.util.List;
import java.util.UUID;

public interface ConferenceRepositoryCustom {
    List<Conference> findAllOrderByJoined(UUID userId, boolean isReviewer);

    List<Conference> findAllByPredicate(BooleanBuilder predicate, Sort sort);
}
