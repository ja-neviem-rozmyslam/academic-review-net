package com.ukf.arn.PasswordReset;

import com.ukf.arn.Users.User;
import jakarta.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.time.LocalDateTime;

@Entity
@Table(name = "password_reset_tokens")
public class PasswordReset implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String token;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "expiration_time")
    private LocalDateTime expirationTime;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    public PasswordReset() {
    }

    public PasswordReset(String token, User user, LocalDateTime expirationTime) {
        this.token = token;
        this.user = user;
        this.expirationTime = expirationTime;
    }

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public LocalDateTime getExpirationTime() {
        return expirationTime;
    }

    public void setExpirationTime(LocalDateTime expirationTime) {
        this.expirationTime = expirationTime;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}