package com.ukf.arn.Users.Repository;

import com.ukf.arn.Entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface UserRepository extends JpaRepository<User, UUID>, UserRepositoryCustom {
    Optional<User> findByEmail(String email);

    User findUserById(UUID id);
}