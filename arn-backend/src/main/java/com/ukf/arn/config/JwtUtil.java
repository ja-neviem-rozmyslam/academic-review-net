package com.ukf.arn.config;

import com.ukf.arn.Entities.User;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.List;

@Component
public class JwtUtil {

    private final SecretKey secretKey = Keys.secretKeyFor(SignatureAlgorithm.HS256);

    public String generateToken(User user) {
        return generateJwt(user.getEmail(), user.getRoles(), 1000 * 60 * 60);
    }

    public String generateRefreshToken(User user) {
        return generateJwt(user.getEmail(), null, 1000 * 60 * 60 * 2);
    }

    public String generateAccessToken(String refreshToken) {
        Claims claims = Jwts.parser()
                .setSigningKey(secretKey)
                .parseClaimsJws(refreshToken)
                .getBody();

        return generateJwt(claims.getSubject(), (List<String>) claims.get("roles"), 1000 * 60 * 30);
    }


    public boolean validateToken(String token, String username) {
        String extractedUsername = extractUsername(token);
        return (extractedUsername.equals(username) && !isTokenExpired(token));
    }

    public String extractUsername(String token) {
        return Jwts.parser()
                .setSigningKey(secretKey)
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
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

    private String generateJwt(String subject, List<String> roles, long expirationTime) {
        JwtBuilder jwtBuilder = Jwts.builder()
                .setSubject(subject)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expirationTime))
                .signWith(secretKey);

        if (roles != null) {
            jwtBuilder.claim("roles", roles);
        }

        return jwtBuilder.compact();
    }
}