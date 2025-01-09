package com.ukf.arn.Universities;

import com.ukf.arn.EmailDomain.EmailDomainDto;

import java.util.List;

public class UniversityDto {
    private Long id;
    private String name;
    private List<EmailDomainDto> domain;

    public UniversityDto() {
    }

    public UniversityDto(Long id, String name, List<EmailDomainDto> domain) {
        this.id = id;
        this.name = name;
        this.domain = domain;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<EmailDomainDto> getDomain() {
        return domain;
    }

    public void setDomain(List<EmailDomainDto> domain) {
        this.domain = domain;
    }
}
