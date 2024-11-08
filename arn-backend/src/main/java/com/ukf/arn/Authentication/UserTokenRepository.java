package com.ukf.arn.Authentication;

import com.ukf.arn.Users.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserTokenRepository extends JpaRepository<UserToken, Long> {
    Optional<UserToken> findByTokenAndTokenType(String token, String tokenType);

    UserToken findTopByUserAndTokenTypeOrderByCreatedAtDesc(User user, String tokenType);

    void deleteByUserAndTokenType(User user, String tokenType);

}
