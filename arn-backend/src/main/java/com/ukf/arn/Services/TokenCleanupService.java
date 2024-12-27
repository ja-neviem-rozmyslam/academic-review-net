package com.ukf.arn.Services;

import com.ukf.arn.Authentication.Repository.UserTokenRepository;
import com.ukf.arn.Entities.User;
import com.ukf.arn.Entities.UserToken;
import com.ukf.arn.Users.UserRepository;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class TokenCleanupService {

    private final UserTokenRepository userTokenRepository;
    private final UserRepository userRepository;

    public TokenCleanupService(UserTokenRepository userTokenRepository, UserRepository userRepository) {
        this.userTokenRepository = userTokenRepository;
        this.userRepository = userRepository;
    }

    @Scheduled(cron = "0 0 1 * * *")
    @Transactional
    public void cleanUpExpiredTokens() {
        List<UserToken> expiredTokens = userTokenRepository.findByExpirationTimeBefore(LocalDateTime.now());
        userTokenRepository.deleteAllByExpirationTimeBefore(LocalDateTime.now());

        expiredTokens.stream()
                .filter(token -> token.getTokenType().equals("VERIFICATION"))
                .forEach(token -> userRepository.findById(token.getUser().getId()).ifPresent(user -> {
                    if (!user.isVerified()) {
                        userRepository.deleteById(user.getId());
                    }
                }));
    }
}
