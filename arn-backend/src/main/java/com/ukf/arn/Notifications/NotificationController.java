package com.ukf.arn.Notifications;

import com.ukf.arn.Entities.Notifications;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    private NotificationService notificationService;

    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @GetMapping
    public List<NotificationDto> getNotifications() {
        return notificationService.getNotifications();
    }

    @PostMapping("/mark-as-read")
    public void markNotificationsAsRead() {
        notificationService.markNotificationsAsRead();
    }

    @PostMapping("/delete")
    public void deleteNotifications(@RequestBody List<Long> notificationIds) {
        notificationService.deleteNotifications(notificationIds);
    }
}

