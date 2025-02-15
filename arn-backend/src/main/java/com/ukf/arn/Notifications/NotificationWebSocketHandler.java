package com.ukf.arn.Notifications;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.ukf.arn.Entities.Notifications;
import com.ukf.arn.config.JwtUtil;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class NotificationWebSocketHandler extends TextWebSocketHandler {

    private final Map<UUID, WebSocketSession> userSessions = new ConcurrentHashMap<>();
    private final JwtUtil jwtUtil;
    private final NotificationRepository notificationRepository;

    public NotificationWebSocketHandler(JwtUtil jwtUtil,
                                        NotificationRepository notificationRepository) {
        this.notificationRepository = notificationRepository;
        this.jwtUtil = jwtUtil;
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) {
        String query = session.getUri().getQuery();
        UUID userId = null;

        if (query != null && query.contains("token=")) {
            String token = query.substring(query.indexOf("token=") + 6).split("&")[0];
            userId = jwtUtil.validateTokenAndGetUserId(token);
        }

        if (userId != null) {
            userSessions.put(userId, session);
        } else {
            try {
                session.close(CloseStatus.NOT_ACCEPTABLE);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) {
        userSessions.values().remove(session);
    }

    //TODO: Include notifications for students after the review deadline ends.
    //TODO: Include notifications for administrators after the upload deadline ends so that they can assign reviewers.
    //TODO: MAYBE include notifications for students and reviewers if the deadline is close and they haven't made any actions.
    public void sendUserNotification(UUID userId, String message, String type) {
        try {
            Notifications notification = new Notifications(userId, message, type);
            notificationRepository.save(notification);

            NotificationDto notificationDto = new NotificationDto(
                    notification.getId(),
                    notification.getMessage(),
                    notification.getType(),
                    notification.isRead(),
                    notification.getCreatedAt()
            );

            WebSocketSession session = userSessions.get(userId);
            if (session != null && session.isOpen()) {
                String jsonNotification = new ObjectMapper()
                        .registerModule(new JavaTimeModule())
                        .writeValueAsString(notificationDto);
                session.sendMessage(new TextMessage(jsonNotification));
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

