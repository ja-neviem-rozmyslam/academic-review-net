package com.ukf.arn.Submissions;

import java.io.File;
import java.util.List;
import java.util.UUID;

public class SubmissionDto {
    private Long id;
    private String title;
    private Long category;
    private String abstractEn;
    private String abstractSk;
    private List<UUID> coauthors;
    private List<File> uploadedFiles;

    public SubmissionDto() {
    }

    public SubmissionDto(Long id, String title, Long category, String abstractEn, String abstractSk, List<UUID> coauthors, List<File> uploadedFiles) {
        this.id = id;
        this.title = title;
        this.category = category;
        this.abstractEn = abstractEn;
        this.abstractSk = abstractSk;
        this.coauthors = coauthors;
        this.uploadedFiles = uploadedFiles;
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

    public List<UUID> getCoauthors() {
        return coauthors;
    }

    public void setCoauthors(List<UUID> coauthors) {
        this.coauthors = coauthors;
    }

    public List<File> getUploadedFiles() {
        return uploadedFiles;
    }

    public void setUploadedFiles(List<File> uploadedFiles) {
        this.uploadedFiles = uploadedFiles;
    }
}