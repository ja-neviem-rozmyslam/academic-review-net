package com.ukf.arn.Submissions;

public class SubmissionDto {
    private Long id;
    private String title;
    private Long category;
    private String coauthors;
    private String abstractEn;
    private String abstractSk;
    private Long conferenceId;

    public SubmissionDto() {
    }

    public SubmissionDto(Long id, String title, Long category, String abstractEn, String abstractSk) {
        this.id = id;
        this.title = title;
        this.category = category;
        this.abstractEn = abstractEn;
        this.abstractSk = abstractSk;
        this.coauthors = "";
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Long getCategory() {
        return category;
    }

    public void setCategory(Long category) {
        this.category = category;
    }

    public String getAbstractEn() {
        return abstractEn;
    }

    public void setAbstractEn(String abstractEn) {
        this.abstractEn = abstractEn;
    }

    public String getAbstractSk() {
        return abstractSk;
    }

    public void setAbstractSk(String abstractSk) {
        this.abstractSk = abstractSk;
    }

    public String getCoauthors() {
        return coauthors;
    }

    public void setCoauthors(String coauthors) {
        this.coauthors = coauthors;
    }

    public Long getConferenceId() {
        return conferenceId;
    }

    public void setConferenceId(Long conferenceId) {
        this.conferenceId = conferenceId;
    }
}