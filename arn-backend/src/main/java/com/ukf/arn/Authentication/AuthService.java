package com.ukf.arn.Authentication;

import com.ukf.arn.Authentication.Objects.LoginRequest;
import com.ukf.arn.Authentication.Objects.RegistrationRequest;
import com.ukf.arn.Authentication.Repository.UserTokenRepository;
import com.ukf.arn.ConstantsKatalog;
import com.ukf.arn.Entities.UserToken;
import com.ukf.arn.Services.LoginAttemptService;
import com.ukf.arn.MailService.MailService;
import com.ukf.arn.Entities.University;
import com.ukf.arn.Universities.UniversityService;
import com.ukf.arn.Entities.User;
import com.ukf.arn.Users.Objects.UserDto;
import com.ukf.arn.Users.Repository.UserRepository;
import com.ukf.arn.config.JwtUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class AuthService {

    @Value("${app.domain}")
    private String appDomain;

    public final String VERIFICATION_TOKEN = "VERIFICATION";
    private static final int TOKEN_EXPIRATION_MINUTES = 1440;

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final LoginAttemptService loginAttemptService;
    private final UniversityService universityService;
    private final UserTokenRepository userTokenRepository;
    private final HttpServletRequest request;
    private final MailService mailService;
    private final JwtUtil jwtUtil;

    @Autowired
    public AuthService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder,
                       LoginAttemptService loginAttemptService,
                       UniversityService universityService,
                       UserTokenRepository userTokenRepository,
                       HttpServletRequest request,
                       JwtUtil jwtUtil,
                       MailService mailService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.loginAttemptService = loginAttemptService;
        this.universityService = universityService;
        this.userTokenRepository = userTokenRepository;
        this.request = request;
        this.jwtUtil = jwtUtil;
        this.mailService = mailService;
    }

    public ResponseEntity<?> registration(RegistrationRequest registrationRequest) {
        if (userRepository.findByEmail(registrationRequest.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Používateľ s takýmto emailom už existuje");
        }

        University university = universityService.getUniversityById(registrationRequest.getUniversityId());
        if (university == null) {
            return ResponseEntity.badRequest().body("Takáto univerzita neexistuje");
        }

        User user = createUser(registrationRequest, university);
        userRepository.save(user);

        String verificationToken = generateAndSaveVerificationToken(user);
        sendVerificationEmail(user.getEmail(), verificationToken);

        return ResponseEntity.ok().build();
    }

    @Transactional
    public void verifyToken(String token, HttpServletResponse response) {
        UserToken userToken = userTokenRepository.findByTokenAndTokenType(token, VERIFICATION_TOKEN).orElse(null);

        try {
            if (userToken == null || userToken.getExpirationTime().isBefore(LocalDateTime.now())) {
                response.sendRedirect(appDomain + "/verification?status=failure");
                return;
            }

            User user = userToken.getUser();
            user.setVerified(true);
            userRepository.save(user);
            userTokenRepository.deleteByUserAndTokenType(user, VERIFICATION_TOKEN);

            response.sendRedirect(appDomain + "/verification?status=success");
        } catch (IOException e) {
            throw new RuntimeException("Failed to redirect for verification", e);
        }
    }


    public ResponseEntity<?> login(LoginRequest loginRequest, boolean isAdminLogin) {
        String ip = getClientIP();

        if (loginAttemptService.isBlocked(ip)) {
            return ResponseEntity.badRequest().body("Príliš veľa neúspešných pokusov o prihlásenie. Skúste to znova o chvíľu.");
        }

        User userObj = userRepository.findByEmail(loginRequest.getEmail()).orElse(null);

        if (userObj == null) {
            return ResponseEntity.badRequest().body(isAdminLogin ? "Administrátor s takýmto prihlasovacím menom neexistuje" : "Používateľ s takýmto emailom neexistuje");
        }
        if (!userObj.isVerified()) {
            return ResponseEntity.badRequest().body("Používateľ nie je overený");
        }
        if (isAdminLogin && !userObj.isAdmin()) {
            return ResponseEntity.badRequest().body("Používateľ nie je administrátor");
        }
        if (!passwordEncoder.matches(loginRequest.getPassword(), userObj.getPassword())) {
            loginAttemptService.loginFailed(ip);
            return ResponseEntity.badRequest().body("Nesprávne prihlasovacie údaje");
        }

        loginAttemptService.loginSucceeded(ip);

        UserDto loggedInUser = new UserDto(
                userObj.getId(),
                userObj.getName(),
                userObj.getSurname(),
                userObj.getEmail(),
                userObj.getRegistrationDate(),
                userObj.getUniversity(),
                userObj.getRoles());

        String token = jwtUtil.generateToken(userObj);
        String refreshToken = jwtUtil.generateRefreshToken(userObj);

        return ResponseEntity.ok()
                .header(HttpHeaders.AUTHORIZATION, token)
                .header("Refresh-Token", refreshToken)
                .body(loggedInUser);
    }

    private User createUser(RegistrationRequest registrationRequest, University university) {
        User user = new User(
                registrationRequest.getName(),
                registrationRequest.getSurname(),
                registrationRequest.getEmail(),
                passwordEncoder.encode(registrationRequest.getPassword()),
                university,
                List.of(ConstantsKatalog.Role.STUDENT.getCode()));
        user.setVerified(false);
        return user;
    }

    private String generateAndSaveVerificationToken(User user) {
        String verificationToken = UUID.randomUUID().toString();
        LocalDateTime expirationTime = LocalDateTime.now().plusMinutes(TOKEN_EXPIRATION_MINUTES);
        userTokenRepository.save(new UserToken(verificationToken, user, expirationTime, VERIFICATION_TOKEN));
        return verificationToken;
    }

    private void sendVerificationEmail(String email, String token) {
        String link = "http://localhost:8080/api/auth/verify?token=" + token;
        mailService.sendVerificationEmail(email, link);
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