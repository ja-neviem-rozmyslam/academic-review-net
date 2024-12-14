package com.ukf.arn.Conferences;

import java.util.List;
import java.util.UUID;

public interface ConferenceRepositoryCustom {
    List<Conference> findAllOrderByJoined(UUID userId, boolean isReviewer);
}
