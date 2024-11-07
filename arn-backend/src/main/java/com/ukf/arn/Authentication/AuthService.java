package com.ukf.arn.Authentication;

import com.ukf.arn.ConstantsKatalog;
import com.ukf.arn.LoginAttemptService.LoginAttemptService;
import com.ukf.arn.MailService.MailService;
import com.ukf.arn.Universities.University;
import com.ukf.arn.Universities.UniversityService;
import com.ukf.arn.Users.*;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class AuthService {

    public final String VERIFICATION_TOKEN = "VERIFICATION";
    private static final int TOKEN_EXPIRATION_MINUTES = 1440;


    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final LoginAttemptService loginAttemptService;
    private final UniversityService universityService;
    private final UserTokenRepository userTokenRepository;
    private final HttpServletRequest request;
    private final MailService mailService;

    @Autowired
    public AuthService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder,
                       LoginAttemptService loginAttemptService,
                       UniversityService universityService,
                          UserTokenRepository userTokenRepository,
                       HttpServletRequest request,
                       MailService mailService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.loginAttemptService = loginAttemptService;
        this.universityService = universityService;
        this.userTokenRepository = userTokenRepository;
        this.request = request;
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

    public ResponseEntity<?> verifyToken(String token) {
        UserToken userToken = userTokenRepository.findByToken(token).orElse(null);

        if (userToken == null) {
            return ResponseEntity.badRequest().body("Token overenia registrácie neexistuje");
        }

        if (userToken.getExpirationTime().isBefore(LocalDateTime.now())) {
            return ResponseEntity.badRequest().body("Platnosť tokenu na overenie vypršala");
        }

        User user = userToken.getUser();
        user.setVerified(true);
        userRepository.save(user);

        userTokenRepository.deleteByUserAndTokenType(user, VERIFICATION_TOKEN);


        return ResponseEntity.ok().body("Registrácia bola úspešne overená");
    }

    public ResponseEntity<?> login(LoginRequest loginRequest) {
        String ip = getClientIP();

        if (loginAttemptService.isBlocked(ip)) {
            return ResponseEntity.badRequest().body("Príliš veľa neúspešných pokusov o prihlásenie. Skúste to znova o chvíľu.");
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

    private String getClientIP() {
        String xfHeader = request.getHeader("X-Forwarded-For");
        if (xfHeader == null) {
            return request.getRemoteAddr();
        }
        return xfHeader.split(",")[0];
    }
}