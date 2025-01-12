package com.ukf.arn.Entities;

import jakarta.persistence.*;

@Entity
@Table(name = "email_domains")
public class EmailDomain {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String emailDomain;

    @ManyToOne
    @JoinColumn(name = "university_id")
    private University university;

    public EmailDomain(String emailDomain, University university) {
        this.emailDomain = emailDomain;
        this.university = university;
    }

    public EmailDomain() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public University getUniversity() {
        return university;
    }

    public void setUniversity(University university) {
        this.university = university;
    }

    public String getDomain() {
        return emailDomain;
    }

    public void setDomain(String domain) {
        this.emailDomain = domain;
    }
}