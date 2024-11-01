package com.ukf.arn.PasswordReset;

import com.ukf.arn.Users.User;
import com.ukf.arn.Users.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class PasswordResetService {

    private final PasswordResetRepository passwordResetRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    private static final int RESET_REQUEST_LIMIT_SECONDS = 60;
    private static final int TOKEN_EXPIRATION_MINUTES = 30;
    private static final String TOO_MANY_REQUESTS = "TOO_MANY_REQUESTS";
    private static final String TOKEN_NOT_FOUND = "TOKEN_NOT_FOUND";
    private static final String TOKEN_EXPIRED = "TOKEN_EXPIRED";

    @Autowired
    public PasswordResetService(PasswordResetRepository passwordResetRepository, UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.passwordResetRepository = passwordResetRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public ResponseEntity<?> requestPasswordReset(String email) {
        User userObj = userRepository.findByEmail(email).orElse(null);

        if (userObj == null) {
            return ResponseEntity.ok().build();
        }

        PasswordReset lastResetRequests = passwordResetRepository.findTopByUserOrderByCreatedAtDesc(userObj);

        if (lastResetRequests != null && lastResetRequests.getCreatedAt().plusSeconds(RESET_REQUEST_LIMIT_SECONDS).isAfter(LocalDateTime.now())) {
            return ResponseEntity.badRequest().body(TOO_MANY_REQUESTS);
        }

        String token = UUID.randomUUID().toString();
        LocalDateTime expirationTime = LocalDateTime.now().plusMinutes(TOKEN_EXPIRATION_MINUTES);

        passwordResetRepository.save(new PasswordReset(token, userObj, expirationTime));

        String link = "http://localhost:4200/password-change?&token=" + token;

        return ResponseEntity.ok().build();
    }

    public ResponseEntity<?> verifyPasswordReset(String token) {
        PasswordReset passwordResetObj = passwordResetRepository.findByToken(token).orElse(null);

        if (passwordResetObj == null) {
            return ResponseEntity.badRequest().body(TOKEN_NOT_FOUND);
        }

        if (passwordResetObj.getExpirationTime().isBefore(LocalDateTime.now())) {
            return ResponseEntity.badRequest().body(TOKEN_EXPIRED);
        }

        return ResponseEntity.ok().build();
    }

    public ResponseEntity<?> resetPassword(String token, String password) {
        PasswordReset passwordResetOpt = passwordResetRepository.findByToken(token).orElse(null);

        ResponseEntity<?> verifyResponse = verifyPasswordReset(token);
        if (verifyResponse.getStatusCode().is4xxClientError()) {
            return verifyResponse;
        }

        User user = passwordResetOpt.getUser();
        user.setPassword(passwordEncoder.encode(password));

        userRepository.save(user);
        //passwordResetRepository.delete(passwordResetOpt);

        return ResponseEntity.ok().build();
    }
}
