package com.ukf.arn.PasswordReset;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/password-reset")
public class PasswordResetController {

    private final PasswordResetService passwordResetService;

    @Autowired
    public PasswordResetController(PasswordResetService passwordResetService) {
        this.passwordResetService = passwordResetService;
    }

    @PostMapping("/request")
    public ResponseEntity<?> requestPasswordReset(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        return passwordResetService.requestPasswordReset(email);
    }

    @PostMapping("/verify")
    public ResponseEntity<?> verifyPasswordReset(@RequestBody Map<String, String> body) {
        String token = body.get("token");
        return passwordResetService.verifyPasswordReset(token);
    }
}

