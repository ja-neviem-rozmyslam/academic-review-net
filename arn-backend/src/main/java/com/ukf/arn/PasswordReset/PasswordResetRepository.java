package com.ukf.arn.PasswordReset;

import com.ukf.arn.Users.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PasswordResetRepository extends JpaRepository<PasswordReset, Long> {
    Optional<PasswordReset> findByToken(String token);

    PasswordReset findTopByUserOrderByCreatedAtDesc(User user);

}
