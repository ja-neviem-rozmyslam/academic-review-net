package com.ukf.arn.PasswordReset;

import com.ukf.arn.Authentication.UserToken;
import com.ukf.arn.Authentication.UserTokenRepository;
import com.ukf.arn.Users.User;
import com.ukf.arn.Users.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.UUID;

import static com.ukf.arn.ConstantsKatalog.TOO_MANY_REQUESTS;
import static com.ukf.arn.ConstantsKatalog.TOKEN_NOT_FOUND;
import static com.ukf.arn.ConstantsKatalog.TOKEN_EXPIRED;


@Service
public class PasswordResetService {
    public final String PASSWORD_RESET_TOKEN = "PASS_RESET";

    private final UserTokenRepository userTokenRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    private static final int RESET_REQUEST_LIMIT_SECONDS = 60;
    private static final int TOKEN_EXPIRATION_MINUTES = 30;

    @Autowired
    public PasswordResetService(UserTokenRepository userTokenRepository, UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userTokenRepository = userTokenRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public ResponseEntity<?> requestPasswordReset(String email) {
        User userObj = userRepository.findByEmail(email).orElse(null);

        if (userObj == null) {
            return ResponseEntity.ok().build();
        }

        UserToken lastResetRequests = userTokenRepository.findTopByUserAndTokenTypeOrderByCreatedAtDesc(userObj, PASSWORD_RESET_TOKEN);

        if (lastResetRequests != null && lastResetRequests.getCreatedAt().plusSeconds(RESET_REQUEST_LIMIT_SECONDS).isAfter(LocalDateTime.now())) {
            return ResponseEntity.badRequest().body(TOO_MANY_REQUESTS);
        }

        String token = UUID.randomUUID().toString();
        LocalDateTime expirationTime = LocalDateTime.now().plusMinutes(TOKEN_EXPIRATION_MINUTES);

        userTokenRepository.save(new UserToken(token, userObj, expirationTime, PASSWORD_RESET_TOKEN));

        String link = "http://localhost:4200/password-change?&token=" + token;

        return ResponseEntity.ok().build();
    }

    public ResponseEntity<?> verifyPasswordReset(String token) {
        UserToken passwordResetObj = userTokenRepository.findByTokenAndTokenType(token, PASSWORD_RESET_TOKEN).orElse(null);

        if (passwordResetObj == null) {
            return ResponseEntity.badRequest().body(TOKEN_NOT_FOUND);
        }

        if (passwordResetObj.getExpirationTime().isBefore(LocalDateTime.now())) {
            return ResponseEntity.badRequest().body(TOKEN_EXPIRED);
        }

        return ResponseEntity.ok().build();
    }

    @Transactional
    public ResponseEntity<?> resetPassword(String token, String password) {
        UserToken passwordResetOpt = userTokenRepository.findByTokenAndTokenType(token, PASSWORD_RESET_TOKEN).orElse(null);

        ResponseEntity<?> verifyResponse = verifyPasswordReset(token);
        if (verifyResponse.getStatusCode().is4xxClientError()) {
            return verifyResponse;
        }

        User user = passwordResetOpt.getUser();
        user.setPassword(passwordEncoder.encode(password));

        userRepository.save(user);
        userTokenRepository.deleteByUserAndTokenType(user, PASSWORD_RESET_TOKEN);
        return ResponseEntity.ok().build();
    }
}
