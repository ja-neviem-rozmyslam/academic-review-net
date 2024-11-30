package com.ukf.arn.EmailDomain;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class EmailDomainService {

    private EmailDomainRepository emailDomainRepository;

    public EmailDomainService(EmailDomainRepository emailDomainRepository) {
        this.emailDomainRepository = emailDomainRepository;
    }

    public List<EmailDomainDTO> getEmailDomains() {
        return emailDomainRepository.findAll().stream()
                .map(emailDomain -> {
                    EmailDomainDTO emailDomainDTO = new EmailDomainDTO(
                            emailDomain.getUniversity().getId(),
                            emailDomain.getUniversity().getName(),
                            emailDomain.getDomain()
                    );
                    return emailDomainDTO;
                }).collect(Collectors.toList());
    }
}