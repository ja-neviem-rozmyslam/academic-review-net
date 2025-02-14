package com.ukf.arn.config;

import com.ukf.arn.Entities.User;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Component
public class JwtUtil {

    private final SecretKey secretKey = Keys.secretKeyFor(SignatureAlgorithm.HS256);

    public String generateToken(User user) {
        return generateJwt(user.getId(), user.getRoles(), 1000 * 60 * 60);
    }

    public String generateRefreshToken(User user) {
        return generateJwt(user.getId(), null, 1000 * 60 * 60 * 2);
    }

    public String generateAccessToken(String refreshToken) {
        Claims claims = Jwts.parser()
                .setSigningKey(secretKey)
                .parseClaimsJws(refreshToken)
                .getBody();

        return generateJwt(UUID.fromString(claims.getSubject()), (List<String>) claims.get("roles"), 1000 * 60 * 30);
    }

    public UUID validateTokenAndGetUserId(String token) {
        if (token == null) {
            return null;
        }
        UUID userId = extractUserId(token);
        return (userId != null && validateToken(token, userId)) ? userId : null;
    }


    public boolean validateToken(String token, UUID userId) {
        UUID extractedUserId = extractUserId(token);
        return (extractedUserId.equals(userId) && !isTokenExpired(token));
    }

    public UUID extractUserId(String token) {
        return UUID.fromString(Jwts.parser()
                .setSigningKey(secretKey)
                .parseClaimsJws(token)
                .getBody()
                .getSubject());
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    public boolean isValidRefreshToken(String refreshToken) {
        try {
            Jwts.parser().setSigningKey(secretKey).parseClaimsJws(refreshToken);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            return false;
        }
    }

    private Date extractExpiration(String token) {
        return Jwts.parser()
                .setSigningKey(secretKey)
                .parseClaimsJws(token)
                .getBody()
                .getExpiration();
    }

    private String generateJwt(UUID subjectId, List<String> roles, long expirationTime) {
        JwtBuilder jwtBuilder = Jwts.builder()
                .setSubject(subjectId.toString())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expirationTime))
                .signWith(secretKey);

        if (roles != null) {
            jwtBuilder.claim("roles", roles);
        }

        return jwtBuilder.compact();
    }
}