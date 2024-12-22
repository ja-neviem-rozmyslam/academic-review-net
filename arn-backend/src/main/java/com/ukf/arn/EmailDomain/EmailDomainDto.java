package com.ukf.arn.EmailDomain;

public class EmailDomainDto {
    private Long universityId;
    private String universityName;
    private String domain;

    public EmailDomainDto() {
    }

    public EmailDomainDto(Long universityId, String universityName, String domain) {
        this.universityId = universityId;
        this.universityName = universityName;
        this.domain = domain;
    }

    public Long getUniversityId() {
        return universityId;
    }

    public void setUniversityId(Long universityId) {
        this.universityId = universityId;
    }

    public String getUniversityName() {
        return universityName;
    }

    public void setUniversityName(String universityName) {
        this.universityName = universityName;
    }

    public String getDomain() {
        return domain;
    }

    public void setDomain(String domain) {
        this.domain = domain;
    }
}
