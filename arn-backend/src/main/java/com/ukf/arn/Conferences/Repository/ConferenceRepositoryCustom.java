package com.ukf.arn.Conferences.Repository;

import com.ukf.arn.Entities.Conference;

import java.util.List;
import java.util.UUID;

public interface ConferenceRepositoryCustom {
    List<Conference> findAllOrderByJoined(UUID userId, boolean isReviewer);
}
