package com.ukf.arn.Users;

import com.ukf.arn.LoginAttemptService.LoginAttemptService;
import com.ukf.arn.config.JwtUtil;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import static org.springframework.http.HttpStatus.TOO_MANY_REQUESTS;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final LoginAttemptService loginAttemptService;
    private final HttpServletRequest request;
    private final JwtUtil jwtUtil;

    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, LoginAttemptService loginAttemptService, HttpServletRequest request, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.loginAttemptService = loginAttemptService;
        this.request = request;
        this.jwtUtil = jwtUtil;
    }

    public ResponseEntity<?> login(String email, String password) {
        String ip = getClientIP();

        if (loginAttemptService.isBlocked(ip)) {
            return ResponseEntity.status(TOO_MANY_REQUESTS).body("Príliš veľa neúspešných pokusov o prihlásenie. Skúste to znova o chvíľu.");
        }

        User userObj = userRepository.findByEmail(email).orElse(null);

        if (userObj == null) {
            return ResponseEntity.badRequest().body("Používateľ s takýmto emailom neexistuje");
        }
        if (!passwordEncoder.matches(password, userObj.getPassword())) {
            loginAttemptService.loginFailed(ip);
            return ResponseEntity.badRequest().body("Nesprávne prihlasovacie údaje");
        }

        loginAttemptService.loginSucceeded(ip);

        UserDTO loggedInUser = new UserDTO(
                userObj.getId(),
                userObj.getName(),
                userObj.getSurname(),
                userObj.getEmail(),
                userObj.getRegistrationDate(),
                userObj.getUniversity(),
                userObj.getRoles());

        String token = jwtUtil.generateToken(userObj);

        return ResponseEntity.ok()
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
                .body(loggedInUser);
    }

    public User findByUsername(String username) {
        return userRepository.findByEmail(username).orElse(null);
    }

    private String getClientIP() {
        String xfHeader = request.getHeader("X-Forwarded-For");
        if (xfHeader == null) {
            return request.getRemoteAddr();
        }
        return xfHeader.split(",")[0];
    }
}