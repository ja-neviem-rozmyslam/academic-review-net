package com.ukf.arn.Administration.Objects;

import com.ukf.arn.Universities.UniversityDto;

import java.util.List;

public class SaveUniversityRequest {
    private UniversityDto university;
    private List<Long> removedDomains;

    public SaveUniversityRequest() {}

    public SaveUniversityRequest(UniversityDto university, List<Long> removedDomains) {
        this.university = university;
        this.removedDomains = removedDomains;
    }

    public UniversityDto getUniversity() {
        return university;
    }

    public void setUniversity(UniversityDto university) {
        this.university = university;
    }

    public List<Long> getRemovedDomains() {
        return removedDomains;
    }

    public void setRemovedDomains(List<Long> removedDomains) {
        this.removedDomains = removedDomains;
    }
}