package com.ukf.arn.PasswordReset;

import com.ukf.arn.Users.User;
import com.ukf.arn.Users.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
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

    @Autowired
    public PasswordResetService(PasswordResetRepository passwordResetRepository, UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.passwordResetRepository = passwordResetRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public ResponseEntity<?> requestPasswordReset(String email) {
        User userOpt = userRepository.findByEmail(email).orElse(null);

        if (userOpt == null) {
            return ResponseEntity.badRequest().body("Používateľ s takýmto emailom neexistuje");
        }

        PasswordReset lastResetRequests = passwordResetRepository.findTopByUserOrderByCreatedAtDesc(userOpt);

        if (lastResetRequests.getCreatedAt().plusSeconds(20).isAfter(LocalDateTime.now())) {
            return ResponseEntity.badRequest().body("Požiadavka na reset hesla bola už odoslaná");
        }

        String token = UUID.randomUUID().toString();
        LocalDateTime expirationTime = LocalDateTime.now().plusMinutes(30);

        passwordResetRepository.save(new PasswordReset(token, userOpt, expirationTime));

        String link = "http://uerelka/reset-password?&token=" + token;

        return ResponseEntity.ok().body("Link na reset hesla: " + link);
    }

    public ResponseEntity<?> verifyPasswordReset(String token) {
        PasswordReset passwordResetOpt = passwordResetRepository.findByToken(token).orElse(null);

        if (passwordResetOpt == null) {
            return ResponseEntity.badRequest().body("Neplatný token");
        }

        if (passwordResetOpt.getExpirationTime().isBefore(LocalDateTime.now())) {
            return ResponseEntity.badRequest().body("Token vypršal");
        }

        return ResponseEntity.ok().body("Token je platný");
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

        return ResponseEntity.ok().body("Heslo bolo zmenené");
    }
}
