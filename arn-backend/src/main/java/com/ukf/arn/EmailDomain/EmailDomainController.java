package com.ukf.arn.EmailDomain;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/email-domains")
public class EmailDomainController {

    private EmailDomainService emailDomainService;

    public EmailDomainController(EmailDomainService emailDomainService) {
        this.emailDomainService = emailDomainService;
    }

    @GetMapping
    public ResponseEntity<?> getEmailDomains() {
        return ResponseEntity.ok(emailDomainService.getEmailDomains());
    }
}