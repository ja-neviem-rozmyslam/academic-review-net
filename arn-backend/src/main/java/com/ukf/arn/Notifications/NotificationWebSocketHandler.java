package com.ukf.arn.Notifications;

import com.fasterxml.jackson.databind.ObjectMapper;
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

    public NotificationWebSocketHandler(JwtUtil jwtUtil) {
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

    public void sendUserNotification(UUID userId, NotificationDto notification) throws IOException {
        WebSocketSession session = userSessions.get(userId);
        if (session != null && session.isOpen()) {
            ObjectMapper objectMapper = new ObjectMapper();
            String jsonNotification = objectMapper.writeValueAsString(notification);
            session.sendMessage(new TextMessage(jsonNotification));
        }
    }
}

