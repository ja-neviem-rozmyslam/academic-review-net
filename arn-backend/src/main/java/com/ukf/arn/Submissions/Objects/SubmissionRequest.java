package com.ukf.arn.Submissions.Objects;

public class SubmissionRequest {
    private Long id;
    private String title;
    private String abstractSk;
    private String abstractEn;
    private Long conferenceId;
    private Long category;
    private String coauthors;

    public SubmissionRequest() {
    }

    public SubmissionRequest(String thesisTitle, String abstractSk, String abstractEn, Long conferenceId, Long category, String coauthors) {
        this.title = thesisTitle;
        this.abstractSk = abstractSk;
        this.abstractEn = abstractEn;
        this.conferenceId = conferenceId;
        this.category = category;
        this.coauthors = coauthors;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCoauthors() {
        return coauthors;
    }

    public void setCoauthors(String coauthors) {
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
