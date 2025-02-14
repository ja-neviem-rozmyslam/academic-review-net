package com.ukf.arn.Notifications;

import com.ukf.arn.Entities.Notifications;
import com.ukf.arn.config.SecurityConfig;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class NotificationService {

    private NotificationRepository notificationRepository;

    public NotificationService(NotificationRepository notificationRepository) {
        this.notificationRepository = notificationRepository;
    }

    public List<NotificationDto> getNotifications() {
        UUID userId = SecurityConfig.getLoggedInUser().getId();
        return notificationRepository.findByUserId(userId).stream()
                .map(notification -> new NotificationDto(notification.getId(), notification.getMessage(), notification.getType(), notification.isRead(), notification.getCreatedAt()))
                .toList();
    }

    public void markNotificationsAsRead() {
        UUID userId = SecurityConfig.getLoggedInUser().getId();
        List<Notifications> notifications = notificationRepository.findByUserId(userId);
        notifications.forEach(notification -> notification.setRead(true));
        notificationRepository.saveAll(notifications);
    }

    public void deleteNotifications(List<Long> notificationIds) {
        notificationRepository.deleteAllById(notificationIds);
    }
}
