package com.ukf.arn.Submissions;

import java.util.List;
import java.util.UUID;

public class SubmissionRequest {
    private String title;
    private String abstractSk;
    private String abstractEn;
    private Long conferenceId;
    private Long category;
    private List<UUID> coauthors;

    public SubmissionRequest() {
    }

    public SubmissionRequest(String thesisTitle, String abstractSk, String abstractEn, Long conferencesId, Long thesesCategoriesId, List<UUID> coauthors) {
        this.title = thesisTitle;
        this.abstractSk = abstractSk;
        this.abstractEn = abstractEn;
        this.conferenceId = conferencesId;
        this.category = thesesCategoriesId;
        this.coauthors = coauthors;
    }

    public List<UUID> getCoauthors() {
        return coauthors;
    }

    public void setCoauthors(List<UUID> coauthors) {
        this.coauthors = coauthors;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAbstractSk() {
        return abstractSk;
    }

    public void setAbstractSk(String abstractSk) {
        this.abstractSk = abstractSk;
    }

    public String getAbstractEn() {
        return abstractEn;
    }

    public void setAbstractEn(String abstractEn) {
        this.abstractEn = abstractEn;
    }

    public Long getConferenceId() {
        return conferenceId;
    }

    public void setConferenceId(Long conferenceId) {
        this.conferenceId = conferenceId;
    }

    public Long getCategory() {
        return category;
    }

    public void setCategory(Long category) {
        this.category = category;
    }

}
