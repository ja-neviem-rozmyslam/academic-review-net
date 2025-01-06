package com.ukf.arn.Authentication.Repository;

import com.ukf.arn.Entities.User;
import com.ukf.arn.Entities.UserToken;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface UserTokenRepository extends JpaRepository<UserToken, Long> {
    Optional<UserToken> findByTokenAndTokenType(String token, String tokenType);

    UserToken findTopByUserAndTokenTypeOrderByCreatedAtDesc(User user, String tokenType);

    void deleteByUserAndTokenType(User user, String tokenType);

    List<UserToken> findByExpirationTimeBefore(LocalDateTime now);

    void deleteAllByExpirationTimeBefore(LocalDateTime now);
}
