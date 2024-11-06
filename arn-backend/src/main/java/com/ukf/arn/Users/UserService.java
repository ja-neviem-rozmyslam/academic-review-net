package com.ukf.arn.Users;

import com.ukf.arn.ConstantsKatalog;
import com.ukf.arn.LoginAttemptService.LoginAttemptService;
import com.ukf.arn.Universities.University;
import com.ukf.arn.Universities.UniversityService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

import static org.springframework.http.HttpStatus.TOO_MANY_REQUESTS;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final LoginAttemptService loginAttemptService;
    private final UniversityService universityService;
    private final HttpServletRequest request;

    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, LoginAttemptService loginAttemptService, UniversityService universityService, HttpServletRequest request) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.loginAttemptService = loginAttemptService;
        this.universityService = universityService;
        this.request = request;
    }

    public ResponseEntity<?> registration(RegistrationRequest registrationRequest) {
        if (userRepository.findByEmail(registrationRequest.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Používateľ s takýmto emailom už existuje");
        }

        University university = universityService.getUniversityById(registrationRequest.getUniversityId());

        if (university == null) {
            return ResponseEntity.badRequest().body("Takáto univerzita neexistuje");
        }

        User user = new User(
                registrationRequest.getName(),
                registrationRequest.getSurname(),
                registrationRequest.getEmail(),
                passwordEncoder.encode(registrationRequest.getPassword()),
                university,
                List.of(ConstantsKatalog.Role.STUDENT.getCode()));

        userRepository.save(user);

        return ResponseEntity.ok().build();
    }


    public ResponseEntity<?> login(LoginRequest loginRequest) {
        String ip = getClientIP();

        if (loginAttemptService.isBlocked(ip)) {
            return ResponseEntity.status(TOO_MANY_REQUESTS).body("Príliš veľa neúspešných pokusov o prihlásenie. Skúste to znova o chvíľu.");
        }

        User userObj = userRepository.findByEmail(loginRequest.getEmail()).orElse(null);

        if (userObj == null) {
            return ResponseEntity.badRequest().body("Používateľ s takýmto emailom neexistuje");
        }
        if (!passwordEncoder.matches(loginRequest.getPassword(), userObj.getPassword())) {
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

        return ResponseEntity.ok().body(loggedInUser);
    }

    private String getClientIP() {
        String xfHeader = request.getHeader("X-Forwarded-For");
        if (xfHeader == null) {
            return request.getRemoteAddr();
        }
        return xfHeader.split(",")[0];
    }
}