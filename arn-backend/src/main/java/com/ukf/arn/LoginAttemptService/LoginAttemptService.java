package com.ukf.arn.LoginAttemptService;

import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class LoginAttemptService {
    private final int MAX_ATTEMPTS = 5;
    private final long BLOCK_DURATION_MINUTES = 15;

    private Map<String, Integer> attempts = new ConcurrentHashMap<>();
    private Map<String, LocalDateTime> blockedIPs = new ConcurrentHashMap<>();

    public void loginFailed(String ip) {
        attempts.put(ip, attempts.getOrDefault(ip, 0) + 1);
        if (attempts.get(ip) >= MAX_ATTEMPTS) {
            blockedIPs.put(ip, LocalDateTime.now().plusMinutes(BLOCK_DURATION_MINUTES));
        }
    }

    public void loginSucceeded(String ip) {
        attempts.remove(ip);
        blockedIPs.remove(ip);
    }

    public boolean isBlocked(String ip) {
        if (blockedIPs.containsKey(ip)) {
            if (LocalDateTime.now().isAfter(blockedIPs.get(ip))) {
                blockedIPs.remove(ip);
                attempts.remove(ip);
                return false;
            }
            return true;
        }
        return false;
    }
}
