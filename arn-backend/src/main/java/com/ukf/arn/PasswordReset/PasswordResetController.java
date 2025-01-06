package com.ukf.arn.PasswordReset;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    public ResponseEntity<?> requestPasswordReset(@RequestParam String email) {
        return passwordResetService.requestPasswordReset(email);
    }

    @PostMapping("/verify")
    public ResponseEntity<?> verifyPasswordReset(@RequestParam String token) {
        return passwordResetService.verifyPasswordReset(token);
    }

    @PostMapping("/confirm")
    public ResponseEntity<?> resetPassword(@RequestParam String token, @RequestParam String password) {
        return passwordResetService.resetPassword(token, password);
    }
}

