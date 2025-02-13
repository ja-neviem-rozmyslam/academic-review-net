package com.ukf.arn.Notifications;

import com.ukf.arn.Entities.Notifications;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface NotificationRepository extends JpaRepository<Notifications, Long> {

    List<Notifications> findByUserId(UUID id);
}

